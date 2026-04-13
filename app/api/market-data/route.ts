// Copyright (c) 2025 Ultimate Consultancy Service PLC. All rights reserved.

import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import type {
  EconomicDashboardData,
  TimeSeriesData,
} from "@/lib/market-data-types";

const BASE_URL = process.env.MARKET_DATA_API_URL ?? "";
const RATES_TTL_SECONDS = process.env.RATES_TTL
  ? parseInt(process.env.RATES_TTL)
  : 300;
const HISTORY_TTL_SECONDS = 43200;

// ─── Static GDP data ──────────────────────────────────────────────────────────

const GDP_HISTORY: { value: number; year: string }[] = [
  { year: "2019", value: 96.1 },
  { year: "2020", value: 107.6 },
  { year: "2021", value: 111.3 },
  { year: "2022", value: 120.4 },
  { year: "2023", value: 137.8 },
  { year: "2024", value: 149.74 },
];

// GDP_HISTORY is a lookup table of prior-year baselines.
// Growth is computed against the live API value, not hardcoded current values.
function computeGdpGrowth(liveValue: number, liveYear: string): number {
  const prevEntry = GDP_HISTORY.find(
    (h) => h.year === String(parseInt(liveYear) - 1),
  );
  if (!prevEntry || prevEntry.value === 0) return 0;
  return parseFloat(
    (((liveValue - prevEntry.value) / prevEntry.value) * 100).toFixed(1),
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function directionToTrend(d: string): "up" | "down" | "unchanged" {
  if (d === "increased" || d === "up") return "up";
  if (d === "decreased" || d === "down") return "down";
  return "unchanged";
}

function pctToTrend(pct: number): "up" | "down" | "unchanged" {
  if (pct > 0) return "up";
  if (pct < 0) return "down";
  return "unchanged";
}

function buildDateRange(months: number): { from: string; to: string } {
  const to = new Date();
  const from = new Date();
  from.setMonth(from.getMonth() - months);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return { from: fmt(from), to: fmt(to) };
}

function parseDateForChart(dateStr: string): string {
  return new Date(dateStr).toLocaleString("default", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function downsampleKeepingSpikes(
  raw: { date: string; value: number }[],
  targetPoints = 1000,
): TimeSeriesData[] {
  if (!raw || raw.length <= targetPoints) {
    return (raw ?? []).map((r) => ({
      date: parseDateForChart(r.date),
      value: r.value,
    }));
  }

  const result: TimeSeriesData[] = [];
  const chunkSize = raw.length / targetPoints;

  for (let i = 0; i < targetPoints; i++) {
    const start = Math.floor(i * chunkSize);
    const end = Math.floor((i + 1) * chunkSize);
    const chunk = raw.slice(start, end);
    if (chunk.length === 0) continue;

    const avg = chunk.reduce((sum, item) => sum + item.value, 0) / chunk.length;
    let furthest = chunk[0];
    let maxDist = -1;

    for (const item of chunk) {
      const dist = Math.abs(item.value - avg);
      if (dist > maxDist) {
        maxDist = dist;
        furthest = item;
      }
    }

    result.push({
      date: parseDateForChart(furthest.date),
      value: furthest.value,
    });
  }

  return result;
}

function processCommodityHistory(
  data: { date: string; close: number }[],
): TimeSeriesData[] {
  return downsampleKeepingSpikes(
    (data ?? []).map((d) => ({ date: d.date, value: d.close })),
  );
}

function requireBaseUrl(): string {
  if (!BASE_URL) throw new Error("MARKET_DATA_API_URL not configured");
  return BASE_URL;
}

function getAgeSeconds(fetchedAt: string): number {
  const fetchedMs = Date.parse(fetchedAt);
  if (Number.isNaN(fetchedMs)) return Number.POSITIVE_INFINITY;
  return (Date.now() - fetchedMs) / 1000;
}

function isCacheStale(fetchedAt: string, ttlSeconds: number): boolean {
  return getAgeSeconds(fetchedAt) >= ttlSeconds;
}

type FxLatestResponse = {
  rates: Partial<
    Record<
      "USD" | "EUR" | "AUD" | "GBP" | "JPY" | "CNY",
      {
        rate: number;
        direction: "increased" | "decreased" | "unchanged";
        percentage_change?: number;
        updated_at: string;
      }
    >
  >;
  base: string;
  message?: string;
};

type CommoditiesLatestResponse = {
  commodities: Partial<
    Record<
      "XAU/USD" | "XAG/USD" | "KC1",
      {
        price: number;
        direction: "increased" | "decreased" | "unchanged";
        percentage_change?: number;
        symbol: string;
        updated_at: string;
      }
    >
  >;
  message?: string;
};

type InterestResponse = {
  policy_rate: number;
  tbill_yield: number;
  updated_at?: string;
  message?: string;
};

type GdpResponse = {
  value: number;
  year: string;
  updated_at?: string;
  message?: string;
};

type CommodityHistoryResponse = {
  data: { date: string; close: number }[];
  count: number;
};

type CachedRates = {
  fx: FxLatestResponse;
  commod: CommoditiesLatestResponse;
  interest: InterestResponse;
  gdp: GdpResponse;
  fetchedAt: string;
};

type CachedHistory = {
  rawGold: CommodityHistoryResponse | null;
  rawSilver: CommodityHistoryResponse | null;
  rawCoffee: CommodityHistoryResponse | null;
  fetchedAt: string;
};

// ─── Cached Fetchers ──────────────────────────────────────────────────────────
// unstable_cache stores results in Vercel Data Cache (external, survives cold
// starts). Individual fetch() calls here are plain — caching is at this layer,
// not on the fetch options. On revalidation failure Vercel keeps serving the
// last good cached value, providing the stale fallback.
//
// DEBUG: Set RATES_TTL=60 in Vercel env (Preview only) to observe the full
// SWR cycle in ~1 min instead of waiting 1 hour.

// Must be shorter than the BetterStack ping interval (600s) so each ping
// triggers a background revalidation and keeps the cache fresh.

const getCachedRates = unstable_cache(
  async () => {
    const apiBaseUrl = requireBaseUrl();
    const [fx, commod, interest, gdp] = await Promise.all([
      fetch(`${apiBaseUrl}/fx/latest`).then((r) => {
        if (!r.ok) throw new Error(`fx/latest: ${r.status}`);
        return r.json();
      }),
      fetch(`${apiBaseUrl}/commodities/latest`).then((r) => {
        if (!r.ok) throw new Error(`commodities/latest: ${r.status}`);
        return r.json();
      }),
      fetch(`${apiBaseUrl}/interest`).then((r) => {
        if (!r.ok) throw new Error(`interest: ${r.status}`);
        return r.json();
      }),
      fetch(`${apiBaseUrl}/gdp`).then((r) => {
        if (!r.ok) throw new Error(`gdp: ${r.status}`);
        return r.json();
      }),
    ]);
    return { fx, commod, interest, gdp, fetchedAt: new Date().toISOString() };
  },
  ["market-rates"],
  { revalidate: RATES_TTL_SECONDS },
);

const getCachedHistory = unstable_cache(
  async () => {
    const apiBaseUrl = requireBaseUrl();
    // Dates are computed inside the cache so they're fixed for the 12h TTL
    // window — being off by up to 12h on a 60-month range is negligible.
    const { to } = buildDateRange(12);
    const { from: commodFrom } = buildDateRange(60);
    const [rawGold, rawSilver, rawCoffee] = await Promise.all([
      fetch(
        `${apiBaseUrl}/commodities/historical?from_date=${commodFrom}&to_date=${to}&symbol=XAU%2FUSD`,
      )
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch(
        `${apiBaseUrl}/commodities/historical?from_date=${commodFrom}&to_date=${to}&symbol=XAG%2FUSD`,
      )
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch(
        `${apiBaseUrl}/commodities/historical?from_date=${commodFrom}&to_date=${to}&symbol=KC1`,
      )
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ]);
    return {
      rawGold,
      rawSilver,
      rawCoffee,
      fetchedAt: new Date().toISOString(),
    };
  },
  ["market-history"],
  { revalidate: HISTORY_TTL_SECONDS },
);

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function GET() {
  const fetchStart = performance.now();

  try {
    const [cachedRates, cachedHistory] = await Promise.all([
      getCachedRates(),
      getCachedHistory(),
    ]);

    const {
      fx,
      commod,
      interest,
      gdp,
      fetchedAt: ratesFetchedAt,
    } = cachedRates as CachedRates;
    const {
      rawGold,
      rawSilver,
      rawCoffee,
      fetchedAt: historyFetchedAt,
    } = cachedHistory as CachedHistory;

    const fxRates = fx.rates ?? {};
    const commodities = commod.commodities ?? {};

    const usdPct = fxRates.USD?.percentage_change ?? 0;
    const eurPct = fxRates.EUR?.percentage_change ?? 0;
    const gbpPct = fxRates.GBP?.percentage_change ?? 0;
    const audPct = fxRates.AUD?.percentage_change ?? 0;
    const jpyPct = fxRates.JPY?.percentage_change ?? 0;
    const cnyPct = fxRates.CNY?.percentage_change ?? 0;

    const goldPct = commodities["XAU/USD"]?.percentage_change ?? 0;
    const silverPct = commodities["XAG/USD"]?.percentage_change ?? 0;
    const coffeePct = commodities["KC1"]?.percentage_change ?? 0;

    const lastGdp = GDP_HISTORY[GDP_HISTORY.length - 1];
    const gdpValue = gdp.value ?? lastGdp.value;
    const gdpYear = String(gdp.year ?? lastGdp.year);
    const responseLastUpdated = new Date(
      Math.min(Date.parse(ratesFetchedAt), Date.parse(historyFetchedAt)),
    ).toISOString();
    const stale =
      isCacheStale(ratesFetchedAt, RATES_TTL_SECONDS) ||
      isCacheStale(historyFetchedAt, HISTORY_TTL_SECONDS);

    const data: EconomicDashboardData = {
      fxRates: {
        usd: {
          rate: fxRates.USD?.rate ?? 0,
          trend: directionToTrend(fxRates.USD?.direction ?? "unchanged"),
          percentageChange: usdPct,
        },
        eur: {
          rate: fxRates.EUR?.rate ?? 0,
          trend: directionToTrend(fxRates.EUR?.direction ?? "unchanged"),
          percentageChange: eurPct,
        },
        gbp: {
          rate: fxRates.GBP?.rate ?? 0,
          trend: directionToTrend(fxRates.GBP?.direction ?? "unchanged"),
          percentageChange: gbpPct,
        },
        aud: {
          rate: fxRates.AUD?.rate ?? 0,
          trend: directionToTrend(fxRates.AUD?.direction ?? "unchanged"),
          percentageChange: audPct,
        },
        jpy: {
          rate: fxRates.JPY?.rate ?? 0,
          trend: directionToTrend(fxRates.JPY?.direction ?? "unchanged"),
          percentageChange: jpyPct,
        },
        cny: {
          rate: fxRates.CNY?.rate ?? 0,
          trend: directionToTrend(fxRates.CNY?.direction ?? "unchanged"),
          percentageChange: cnyPct,
        },
      },
      commodities: {
        gold: {
          symbol: "XAU/USD",
          name: "Gold",
          price: commodities["XAU/USD"]?.price ?? 0,
          trend: pctToTrend(goldPct),
          percentageChange: goldPct,
        },
        silver: {
          symbol: "XAG/USD",
          name: "Silver",
          price: commodities["XAG/USD"]?.price ?? 0,
          trend: pctToTrend(silverPct),
          percentageChange: silverPct,
        },
        coffee: {
          symbol: "KC1",
          name: "Coffee",
          price: commodities["KC1"]?.price ?? 0,
          trend: pctToTrend(coffeePct),
          percentageChange: coffeePct,
        },
      },
      commodityHistory: {
        gold: rawGold ? processCommodityHistory(rawGold.data) : [],
        silver: rawSilver ? processCommodityHistory(rawSilver.data) : [],
        coffee: rawCoffee ? processCommodityHistory(rawCoffee.data) : [],
      },
      interestRate: {
        policyRate: interest.policy_rate ?? 0,
        tbillYield: interest.tbill_yield ?? 0,
      },
      gdp: {
        value: gdpValue,
        year: gdpYear,
        growth: computeGdpGrowth(gdpValue, gdpYear),
      },
      lastUpdated: responseLastUpdated,
    };

    const fetchMs = Math.round(performance.now() - fetchStart);
    return NextResponse.json(
      { data, stale },
      {
        headers: {
          "x-market-fetch-ms": String(fetchMs),
          "x-ucs-cache-status": stale ? "STALE" : "HIT", // Add this for your own debugging
        },
      },
    );
  } catch (err) {
    console.error("[/api/market-data] API error, no cache available:", err);
    return NextResponse.json(
      { error: "Market data unavailable" },
      { status: 503 },
    );
  }
}
