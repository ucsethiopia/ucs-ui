"use client";

import { useState, useEffect } from "react";
import { LRUCache } from "lru-cache";

const BASE_URL = process.env.NEXT_PUBLIC_MARKET_DATA_API_URL ?? "";

// ─── Cache ────────────────────────────────────────────────────────────────────
// HF-5.2: Indefinite TTL LRU cache for historical market data (12-hour refresh)
interface CachedHistoricalData {
  timestamp: number;
  data: {
    gold: TimeSeriesData[];
    silver: TimeSeriesData[];
    coffee: TimeSeriesData[];
  };
}

const historicalCache = new LRUCache<string, CachedHistoricalData>({
  max: 1, // Only need to cache the commodities history
  ttl: 0, // indefinite, we use manual timestamp checks
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FXRate {
  rate: number;
  trend: "up" | "down" | "unchanged";
  percentageChange?: number;
}

export interface Commodity {
  symbol: string;
  name: string;
  price: number;
  trend: "up" | "down" | "unchanged";
  percentageChange?: number;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface EconomicDashboardData {
  fxRates: {
    usd: FXRate;
    eur: FXRate;
    gbp: FXRate;
    aud: FXRate;
    jpy: FXRate;
    cny: FXRate;
  };
  commodities: {
    gold: Commodity;
    silver: Commodity;
    coffee: Commodity;
  };
  commodityHistory: {
    gold: TimeSeriesData[];
    silver: TimeSeriesData[];
    coffee: TimeSeriesData[];
  };
  interestRate: {
    policyRate: number;
    tbillYield: number;
  };
  gdp: {
    value: number;
    year: string;
    growth: number;
  };
  lastUpdated: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function directionToTrend(d: string): "up" | "down" | "unchanged" {
  if (d === "increased" || d === "up") return "up";
  if (d === "decreased" || d === "down") return "down";
  return "unchanged";
}

/** Returns YYYY-MM-DD strings for [today - months, today] */
function buildDateRange(months: number): { from: string; to: string } {
  const to = new Date();
  const from = new Date();
  from.setMonth(from.getMonth() - months);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return { from: fmt(from), to: fmt(to) };
}

/**
 * Format date for the chart (e.g. "Jan 2015", "Jan")
 */
function parseDateForChart(dateStr: string) {
  // Use UTC to prevent rolling back due to timezone
  return new Date(dateStr).toLocaleString("default", { month: "short", year: "numeric", timeZone: "UTC" });
}

/**
 * HF-5.2: Data thinning for historical points.
 * Optimizes render performance by keeping ~1000 points evenly spaced, while preserving spikes.
 */
function downsampleKeepingSpikes(
  raw: { date: string; value: number }[],
  targetPoints: number = 1000
): TimeSeriesData[] {
  if (!raw || raw.length <= targetPoints) {
    return (raw || []).map((r) => ({ date: parseDateForChart(r.date), value: r.value }));
  }

  const result: TimeSeriesData[] = [];
  const chunkSize = raw.length / targetPoints;

  for (let i = 0; i < targetPoints; i++) {
    const start = Math.floor(i * chunkSize);
    const end = Math.floor((i + 1) * chunkSize);
    const chunk = raw.slice(start, end);
    if (chunk.length === 0) continue;

    // Pick the point furthest from the chunk's average to retain visual "spikes"
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

/** Generic downsampler for Commodity endpoint */
function processCommodityHistory(data: { date: string; close: number }[]) {
  const mapping = (data || []).map(d => ({
    date: d.date,
    value: d.close
  }));
  return downsampleKeepingSpikes(mapping);
}

/** Derive trend from the sign of a percentage change value */
function pctToTrend(pct: number): "up" | "down" | "unchanged" {
  if (pct > 0) return "up";
  if (pct < 0) return "down";
  return "unchanged";
}

/** Static GDP annual history — World Bank data, update manually each year */
const GDP_HISTORY_VALUES: { value: number; year: string }[] = [
  { year: "2019", value: 96.1 },
  { year: "2020", value: 107.6 },
  { year: "2021", value: 111.3 },
  { year: "2022", value: 120.4 },
  { year: "2023", value: 137.8 },
  { year: "2024", value: 149.74 },
];

function computeGdpGrowth(): number {
  const len = GDP_HISTORY_VALUES.length;
  if (len < 2) return 0;
  const prev = GDP_HISTORY_VALUES[len - 2].value;
  const curr = GDP_HISTORY_VALUES[len - 1].value;
  return parseFloat((((curr - prev) / prev) * 100).toFixed(1));
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useEconomicDashboard = () => {
  const [data, setData] = useState<EconomicDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      setLoading(true);
      setError(null);

      try {
        // HF-5.2: Fetch 5 years of historical data for commodities
        const { to } = buildDateRange(12);
        const { from: commodFrom } = buildDateRange(60);

        const cachedObj = historicalCache.get("commoditiesHist");
        const now = Date.now();
        const twelveHours = 12 * 60 * 60 * 1000;
        
        const fetchCommodities = !cachedObj || (now - cachedObj.timestamp >= twelveHours);

        const basePromises = [
          fetch(`${BASE_URL}/fx/latest`),
          fetch(`${BASE_URL}/commodities/latest`),
          fetch(`${BASE_URL}/interest`),
          fetch(`${BASE_URL}/gdp`),
        ];

        if (fetchCommodities) {
          basePromises.push(
            fetch(`${BASE_URL}/commodities/historical?from_date=${commodFrom}&to_date=${to}&symbol=XAU%2FUSD`).catch(() => new Response(null, { status: 500 })),
            fetch(`${BASE_URL}/commodities/historical?from_date=${commodFrom}&to_date=${to}&symbol=XAG%2FUSD`).catch(() => new Response(null, { status: 500 })),
            fetch(`${BASE_URL}/commodities/historical?from_date=${commodFrom}&to_date=${to}&symbol=KC1`).catch(() => new Response(null, { status: 500 }))
          );
        }

        const responses = await Promise.all(basePromises);

        // Throw on critical HTTP errors (Live endpoints ONLY -> indices 0 to 3)
        for (let i = 0; i < 4; i++) {
          if (!responses[i].ok) throw new Error(`API error: ${responses[i].status} ${responses[i].url}`);
        }

        const [fx, commod, interest, gdp] = await Promise.all([
          responses[0].json(),
          responses[1].json(),
          responses[2].json(),
          responses[3].json(),
        ]);

        let commodGold = null;
        let commodSilver = null;
        let commodCoffee = null;

        if (fetchCommodities) {
          const commodResData = await Promise.all([
            responses[4]?.ok ? responses[4].json().catch(() => null) : null,
            responses[5]?.ok ? responses[5].json().catch(() => null) : null,
            responses[6]?.ok ? responses[6].json().catch(() => null) : null,
          ]);
          commodGold = commodResData[0];
          commodSilver = commodResData[1];
          commodCoffee = commodResData[2];
        }

        if (cancelled) return;

        const rates = fx.rates ?? {};
        const commodities = commod.commodities ?? {};

        // FX percentage change: API-provided from /fx/latest
        const usdPct = rates.USD?.percentage_change ?? 0;
        const eurPct = rates.EUR?.percentage_change ?? 0;
        const gbpPct = rates.GBP?.percentage_change ?? 0;
        const audPct = rates.AUD?.percentage_change ?? 0;
        const jpyPct = rates.JPY?.percentage_change ?? 0;
        const cnyPct = rates.CNY?.percentage_change ?? 0;

        // Commodity percentage change: use API-provided value from /commodities/latest; default 0 if null
        const goldPct = commodities["XAU/USD"]?.percentage_change ?? 0;
        const silverPct = commodities["XAG/USD"]?.percentage_change ?? 0;
        const coffeePct = commodities["KC1"]?.percentage_change ?? 0;

        let goldHistory: TimeSeriesData[] = [];
        let silverHistory: TimeSeriesData[] = [];
        let coffeeHistory: TimeSeriesData[] = [];

        if (fetchCommodities) {
          goldHistory = commodGold ? processCommodityHistory(commodGold.data) : (cachedObj?.data.gold ?? []);
          silverHistory = commodSilver ? processCommodityHistory(commodSilver.data) : (cachedObj?.data.silver ?? []);
          coffeeHistory = commodCoffee ? processCommodityHistory(commodCoffee.data) : (cachedObj?.data.coffee ?? []);

          // HF-5.2: Store the condensed (downsampled) data in the cache to minimize memory overhead
          if (commodGold && commodSilver && commodCoffee) {
             historicalCache.set("commoditiesHist", {
               timestamp: Date.now(),
               data: { gold: goldHistory, silver: silverHistory, coffee: coffeeHistory },
             });
          }
        } else if (cachedObj) {
          goldHistory = cachedObj.data.gold;
          silverHistory = cachedObj.data.silver;
          coffeeHistory = cachedObj.data.coffee;
        }

        const gdpGrowth = computeGdpGrowth();
        const lastGdp = GDP_HISTORY_VALUES[GDP_HISTORY_VALUES.length - 1];

        const newData: EconomicDashboardData = {
          fxRates: {
            usd: {
              rate: rates.USD?.rate ?? 0,
              trend: directionToTrend(rates.USD?.direction ?? "unchanged"),
              percentageChange: usdPct,
            },
            eur: {
              rate: rates.EUR?.rate ?? 0,
              trend: directionToTrend(rates.EUR?.direction ?? "unchanged"),
              percentageChange: eurPct,
            },
            gbp: {
              rate: rates.GBP?.rate ?? 0,
              trend: directionToTrend(rates.GBP?.direction ?? "unchanged"),
              percentageChange: gbpPct,
            },
            aud: {
              rate: rates.AUD?.rate ?? 0,
              trend: directionToTrend(rates.AUD?.direction ?? "unchanged"),
              percentageChange: audPct,
            },
            jpy: {
              rate: rates.JPY?.rate ?? 0,
              trend: directionToTrend(rates.JPY?.direction ?? "unchanged"),
              percentageChange: jpyPct,
            },
            cny: {
              rate: rates.CNY?.rate ?? 0,
              trend: directionToTrend(rates.CNY?.direction ?? "unchanged"),
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
            gold: goldHistory,
            silver: silverHistory,
            coffee: coffeeHistory,
          },
          interestRate: {
            policyRate: interest.policy_rate ?? 0,
            tbillYield: interest.tbill_yield ?? 0,
          },
          gdp: {
            value: gdp.value ?? lastGdp.value,
            year: String(gdp.year ?? lastGdp.year),
            growth: gdpGrowth,
          },
          lastUpdated: new Date().toISOString(),
        };
        
        setData(newData);
      } catch (err) {
        if (!cancelled) {
          console.error("[useEconomicDashboard]", err);
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          // HF-5.3 Bug Fix: explicitly reset loading state even if there's an error.
          setLoading(false);
        }
      }
    }

    fetchAll().catch((err) => console.error("[useEconomicDashboard] uncaught:", err));
    return () => {
      cancelled = true;
    };
  }, [trigger]);

  const refetch = () => setTrigger((t) => t + 1);

  return { data, loading, error, refetch };
};
