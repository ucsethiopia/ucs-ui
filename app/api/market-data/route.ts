// Copyright (c) 2025 Ultimate Consultancy Service PLC. All rights reserved.

import { NextResponse } from "next/server";
import { LRUCache } from "lru-cache";
import type { EconomicDashboardData, TimeSeriesData } from "@/lib/market-data-types";

const BASE_URL = process.env.MARKET_DATA_API_URL ?? "";

// ─── Server-side Cache ────────────────────────────────────────────────────────
// Module-level — persists between requests while the Vercel function is warm.
// BetterStack should ping /api/market-data every 30s to keep it warm.
// TTL is indefinite: updated on every successful fetch, served stale on failure.

interface ServerCache {
  data: EconomicDashboardData;
  commodityHistoryCachedAt: number; // epoch ms — controls 12-hour re-fetch window
}

// globalThis pattern: survives Next.js HMR module reloads in dev,
// and persists between warm invocations in production (Vercel serverless).
const g = globalThis as typeof globalThis & {
  _marketCache?: LRUCache<"market", ServerCache>;
};
if (!g._marketCache) {
  g._marketCache = new LRUCache<"market", ServerCache>({ max: 1, ttl: 0 });
}
const cache = g._marketCache;

// ─── Static GDP data ──────────────────────────────────────────────────────────

const GDP_HISTORY: { value: number; year: string }[] = [
  { year: "2019", value: 96.1 },
  { year: "2020", value: 107.6 },
  { year: "2021", value: 111.3 },
  { year: "2022", value: 120.4 },
  { year: "2023", value: 137.8 },
  { year: "2024", value: 149.74 },
];

function computeGdpGrowth(): number {
  const len = GDP_HISTORY.length;
  if (len < 2) return 0;
  const prev = GDP_HISTORY[len - 2].value;
  const curr = GDP_HISTORY[len - 1].value;
  return parseFloat((((curr - prev) / prev) * 100).toFixed(1));
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
  targetPoints = 1000
): TimeSeriesData[] {
  if (!raw || raw.length <= targetPoints) {
    return (raw ?? []).map((r) => ({ date: parseDateForChart(r.date), value: r.value }));
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

    result.push({ date: parseDateForChart(furthest.date), value: furthest.value });
  }

  return result;
}

function processCommodityHistory(data: { date: string; close: number }[]): TimeSeriesData[] {
  return downsampleKeepingSpikes((data ?? []).map((d) => ({ date: d.date, value: d.close })));
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function GET() {
  const cached = cache.get("market");
  const now = Date.now();
  const twelveHours = 12 * 60 * 60 * 1000;

  const needsHistoryRefetch =
    !cached || now - cached.commodityHistoryCachedAt >= twelveHours;

  try {
    if (!BASE_URL) throw new Error("MARKET_DATA_API_URL not configured");

    const { to } = buildDateRange(12);
    const { from: commodFrom } = buildDateRange(60);

    const basePromises: Promise<Response>[] = [
      fetch(`${BASE_URL}/fx/latest`),
      fetch(`${BASE_URL}/commodities/latest`),
      fetch(`${BASE_URL}/interest`),
      fetch(`${BASE_URL}/gdp`),
    ];

    if (needsHistoryRefetch) {
      basePromises.push(
        fetch(`${BASE_URL}/commodities/historical?from_date=${commodFrom}&to_date=${to}&symbol=XAU%2FUSD`).catch(() => new Response(null, { status: 500 })),
        fetch(`${BASE_URL}/commodities/historical?from_date=${commodFrom}&to_date=${to}&symbol=XAG%2FUSD`).catch(() => new Response(null, { status: 500 })),
        fetch(`${BASE_URL}/commodities/historical?from_date=${commodFrom}&to_date=${to}&symbol=KC1`).catch(() => new Response(null, { status: 500 }))
      );
    }

    const responses = await Promise.all(basePromises);

    // Critical endpoints must succeed
    for (let i = 0; i < 4; i++) {
      if (!responses[i].ok) {
        throw new Error(`API error: ${responses[i].status} on endpoint ${i}`);
      }
    }

    const [fx, commod, interest, gdp] = await Promise.all([
      responses[0].json(),
      responses[1].json(),
      responses[2].json(),
      responses[3].json(),
    ]);

    const rates = fx.rates ?? {};
    const commodities = commod.commodities ?? {};

    const usdPct = rates.USD?.percentage_change ?? 0;
    const eurPct = rates.EUR?.percentage_change ?? 0;
    const gbpPct = rates.GBP?.percentage_change ?? 0;
    const audPct = rates.AUD?.percentage_change ?? 0;
    const jpyPct = rates.JPY?.percentage_change ?? 0;
    const cnyPct = rates.CNY?.percentage_change ?? 0;

    const goldPct = commodities["XAU/USD"]?.percentage_change ?? 0;
    const silverPct = commodities["XAG/USD"]?.percentage_change ?? 0;
    const coffeePct = commodities["KC1"]?.percentage_change ?? 0;

    // Commodity history: use fresh fetch if due, else reuse cached
    let goldHistory: TimeSeriesData[] = cached?.data.commodityHistory.gold ?? [];
    let silverHistory: TimeSeriesData[] = cached?.data.commodityHistory.silver ?? [];
    let coffeeHistory: TimeSeriesData[] = cached?.data.commodityHistory.coffee ?? [];
    let commodityHistoryCachedAt = cached?.commodityHistoryCachedAt ?? 0;

    if (needsHistoryRefetch && responses.length >= 7) {
      const [rawGold, rawSilver, rawCoffee] = await Promise.all([
        responses[4]?.ok ? responses[4].json().catch(() => null) : Promise.resolve(null),
        responses[5]?.ok ? responses[5].json().catch(() => null) : Promise.resolve(null),
        responses[6]?.ok ? responses[6].json().catch(() => null) : Promise.resolve(null),
      ]);

      if (rawGold) goldHistory = processCommodityHistory(rawGold.data);
      if (rawSilver) silverHistory = processCommodityHistory(rawSilver.data);
      if (rawCoffee) coffeeHistory = processCommodityHistory(rawCoffee.data);

      // Only advance the timestamp if all three succeeded
      if (rawGold && rawSilver && rawCoffee) {
        commodityHistoryCachedAt = now;
      }
    }

    const gdpGrowth = computeGdpGrowth();
    const lastGdp = GDP_HISTORY[GDP_HISTORY.length - 1];

    const data: EconomicDashboardData = {
      fxRates: {
        usd: { rate: rates.USD?.rate ?? 0, trend: directionToTrend(rates.USD?.direction ?? "unchanged"), percentageChange: usdPct },
        eur: { rate: rates.EUR?.rate ?? 0, trend: directionToTrend(rates.EUR?.direction ?? "unchanged"), percentageChange: eurPct },
        gbp: { rate: rates.GBP?.rate ?? 0, trend: directionToTrend(rates.GBP?.direction ?? "unchanged"), percentageChange: gbpPct },
        aud: { rate: rates.AUD?.rate ?? 0, trend: directionToTrend(rates.AUD?.direction ?? "unchanged"), percentageChange: audPct },
        jpy: { rate: rates.JPY?.rate ?? 0, trend: directionToTrend(rates.JPY?.direction ?? "unchanged"), percentageChange: jpyPct },
        cny: { rate: rates.CNY?.rate ?? 0, trend: directionToTrend(rates.CNY?.direction ?? "unchanged"), percentageChange: cnyPct },
      },
      commodities: {
        gold:   { symbol: "XAU/USD", name: "Gold",   price: commodities["XAU/USD"]?.price ?? 0, trend: pctToTrend(goldPct),   percentageChange: goldPct },
        silver: { symbol: "XAG/USD", name: "Silver", price: commodities["XAG/USD"]?.price ?? 0, trend: pctToTrend(silverPct), percentageChange: silverPct },
        coffee: { symbol: "KC1",     name: "Coffee", price: commodities["KC1"]?.price ?? 0,     trend: pctToTrend(coffeePct), percentageChange: coffeePct },
      },
      commodityHistory: { gold: goldHistory, silver: silverHistory, coffee: coffeeHistory },
      interestRate: { policyRate: interest.policy_rate ?? 0, tbillYield: interest.tbill_yield ?? 0 },
      gdp: { value: gdp.value ?? lastGdp.value, year: String(gdp.year ?? lastGdp.year), growth: gdpGrowth },
      lastUpdated: new Date().toISOString(),
    };

    cache.set("market", { data, commodityHistoryCachedAt });

    return NextResponse.json({ data, stale: false });
  } catch (err) {
    // API failed — serve stale cache if available
    if (cached) {
      console.warn("[/api/market-data] API error, serving stale cache:", err);
      return NextResponse.json({ data: cached.data, stale: true });
    }

    // No cache at all — nothing to serve
    console.error("[/api/market-data] API error, no cache available:", err);
    return NextResponse.json(
      { error: "Market data unavailable" },
      { status: 503 }
    );
  }
}
