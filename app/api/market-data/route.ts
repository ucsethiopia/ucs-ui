// Copyright (c) 2025 Ultimate Consultancy Service PLC. All rights reserved.

import { NextResponse } from "next/server";
import type { EconomicDashboardData, TimeSeriesData } from "@/lib/market-data-types";

const BASE_URL = process.env.MARKET_DATA_API_URL ?? "";

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
  const prevEntry = GDP_HISTORY.find((h) => h.year === String(parseInt(liveYear) - 1));
  if (!prevEntry || prevEntry.value === 0) return 0;
  return parseFloat((((liveValue - prevEntry.value) / prevEntry.value) * 100).toFixed(1));
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function directionToTrend(d: string): "up" | "down" | "unchanged" {
  if (d === "increased" || d === "up") return "up";
  if (d === "decreased" || d === "down") return "down";
  return "unchanged";
}

const MEANINGFUL_CHANGE_THRESHOLD = 0.01;

function pctToTrend(pct: number): "up" | "down" | "unchanged" {
  if (Math.abs(pct) < MEANINGFUL_CHANGE_THRESHOLD) return "unchanged";
  if (pct > 0) return "up";
  return "down";
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
// Fetch caching is delegated to Vercel Data Cache via next: { revalidate }.
// Current rates (FX, commodities, interest, GDP) revalidate every hour.
// Commodity history revalidates every 12 hours.
// Stale-while-revalidate is handled by the Data Cache across cold starts.

export async function GET() {
  try {
    if (!BASE_URL) throw new Error("MARKET_DATA_API_URL not configured");

    const { to } = buildDateRange(12);
    const { from: commodFrom } = buildDateRange(60);

    const [fx, commod, interest, gdp, rawGold, rawSilver, rawCoffee] =
      await Promise.all([
        fetch(`${BASE_URL}/fx/latest`,          { next: { revalidate: 3600 } }).then((r) => { if (!r.ok) throw new Error(`fx/latest: ${r.status}`); return r.json(); }),
        fetch(`${BASE_URL}/commodities/latest`, { next: { revalidate: 3600 } }).then((r) => { if (!r.ok) throw new Error(`commodities/latest: ${r.status}`); return r.json(); }),
        fetch(`${BASE_URL}/interest`,           { next: { revalidate: 3600 } }).then((r) => { if (!r.ok) throw new Error(`interest: ${r.status}`); return r.json(); }),
        fetch(`${BASE_URL}/gdp`,                { next: { revalidate: 3600 } }).then((r) => { if (!r.ok) throw new Error(`gdp: ${r.status}`); return r.json(); }),
        fetch(`${BASE_URL}/commodities/historical?from_date=${commodFrom}&to_date=${to}&symbol=XAU%2FUSD`, { next: { revalidate: 43200 } }).then((r) => r.ok ? r.json() : null).catch(() => null),
        fetch(`${BASE_URL}/commodities/historical?from_date=${commodFrom}&to_date=${to}&symbol=XAG%2FUSD`, { next: { revalidate: 43200 } }).then((r) => r.ok ? r.json() : null).catch(() => null),
        fetch(`${BASE_URL}/commodities/historical?from_date=${commodFrom}&to_date=${to}&symbol=KC1`,        { next: { revalidate: 43200 } }).then((r) => r.ok ? r.json() : null).catch(() => null),
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
      commodityHistory: {
        gold:   rawGold   ? processCommodityHistory(rawGold.data)   : [],
        silver: rawSilver ? processCommodityHistory(rawSilver.data) : [],
        coffee: rawCoffee ? processCommodityHistory(rawCoffee.data) : [],
      },
      interestRate: { policyRate: interest.policy_rate ?? 0, tbillYield: interest.tbill_yield ?? 0 },
      gdp: {
        value: gdp.value ?? lastGdp.value,
        year: String(gdp.year ?? lastGdp.year),
        growth: computeGdpGrowth(gdp.value ?? lastGdp.value, String(gdp.year ?? lastGdp.year)),
      },
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({ data, stale: false });
  } catch (err) {
    console.error("[/api/market-data] API error, no cache available:", err);
    return NextResponse.json(
      { error: "Market data unavailable" },
      { status: 503 }
    );
  }
}
