"use client";

import { useState, useEffect } from "react";
import { LRUCache } from "lru-cache";

const BASE_URL = process.env.NEXT_PUBLIC_MARKET_DATA_API_URL ?? "";

// ─── Cache ────────────────────────────────────────────────────────────────────
// HF-5.2: 1-hour TTL LRU cache for market data (ensures we don't spam the API)
const dataCache = new LRUCache<string, EconomicDashboardData>({
  max: 1, // Only need to cache the dashboard data object
  ttl: 1000 * 60 * 60, // 1 hour
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FXRate {
  rate: number;
  trend: "up" | "down" | "unchanged";
  history?: TimeSeriesData[];
}

export interface Commodity {
  symbol: string;
  name: string;
  price: number;
  trend: "up" | "down" | "unchanged";
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

/** Derive trend from the last two points in a time series */
function trendFromHistory(history: TimeSeriesData[]): "up" | "down" | "unchanged" {
  if (history.length < 2) return "unchanged";
  const prev = history[history.length - 2].value;
  const curr = history[history.length - 1].value;
  if (curr > prev) return "up";
  if (curr < prev) return "down";
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

/** Generic downsampler for FX endpoint */
function processFXHistory(data: any[], currency: string) {
  const mapping = (data || []).filter(d => d.rates && d.rates[currency] != null).map(d => ({
    date: d.date,
    value: d.rates[currency]
  }));
  return downsampleKeepingSpikes(mapping);
}

/** Generic downsampler for Commodity endpoint */
function processCommodityHistory(data: any[]) {
  const mapping = (data || []).map(d => ({
    date: d.date,
    value: d.close
  }));
  return downsampleKeepingSpikes(mapping);
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

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      setLoading(true);
      setError(null);

      try {
        const { from, to } = buildDateRange(12);
        const commodFrom = "2015-01-01";

        const [
          fxRes,
          commodRes,
          interestRes,
          gdpRes,
          fxHistUsdRes,
          fxHistEurRes,
          fxHistCnyRes,
          commodHistGoldRes,
          commodHistSilverRes,
          commodHistCoffeeRes,
        ] = await Promise.all([
          fetch(`${BASE_URL}/fx/latest`),
          fetch(`${BASE_URL}/commodities/latest`),
          fetch(`${BASE_URL}/interest`),
          fetch(`${BASE_URL}/gdp`),
          fetch(`${BASE_URL}/fx/historical?from_date=${from}&to_date=${to}&currency=USD`),
          fetch(`${BASE_URL}/fx/historical?from_date=${from}&to_date=${to}&currency=EUR`),
          fetch(`${BASE_URL}/fx/historical?from_date=${from}&to_date=${to}&currency=CNY`),
          fetch(`${BASE_URL}/commodities/historical?from_date=${commodFrom}&to_date=${to}&symbol=XAU%2FUSD`),
          fetch(`${BASE_URL}/commodities/historical?from_date=${commodFrom}&to_date=${to}&symbol=XAG%2FUSD`),
          fetch(`${BASE_URL}/commodities/historical?from_date=${commodFrom}&to_date=${to}&symbol=KC1`),
        ]);

        // Throw on critical HTTP errors (Live endpoints ONLY)
        for (const res of [fxRes, commodRes, interestRes, gdpRes]) {
          if (!res.ok) throw new Error(`API error: ${res.status} ${res.url}`);
        }

        const [fx, commod, interest, gdp] = await Promise.all([
          fxRes.json(),
          commodRes.json(),
          interestRes.json(),
          gdpRes.json(),
        ]);

        // Parse historical safely (fallback to null if !ok)
        const [fxHistUsd, fxHistEur, fxHistCny, commodGold, commodSilver, commodCoffee] =
          await Promise.all([
            fxHistUsdRes.ok ? fxHistUsdRes.json() : null,
            fxHistEurRes.ok ? fxHistEurRes.json() : null,
            fxHistCnyRes.ok ? fxHistCnyRes.json() : null,
            commodHistGoldRes.ok ? commodHistGoldRes.json() : null,
            commodHistSilverRes.ok ? commodHistSilverRes.json() : null,
            commodHistCoffeeRes.ok ? commodHistCoffeeRes.json() : null,
          ]);

        if (cancelled) return;

        const cached = dataCache.get("dashboard_data");
        const rates = fx.rates ?? {};
        const commodities = commod.commodities ?? {};

        // HF-5.2: Fallback to cache for historical endpoint failures
        const usdHistory = fxHistUsd ? processFXHistory(fxHistUsd.data, "USD") : (cached?.fxRates.usd.history ?? []);
        const eurHistory = fxHistEur ? processFXHistory(fxHistEur.data, "EUR") : (cached?.fxRates.eur.history ?? []);
        const cnyHistory = fxHistCny ? processFXHistory(fxHistCny.data, "CNY") : (cached?.fxRates.cny.history ?? []);

        const goldHistory = commodGold ? processCommodityHistory(commodGold.data) : (cached?.commodityHistory.gold ?? []);
        const silverHistory = commodSilver ? processCommodityHistory(commodSilver.data) : (cached?.commodityHistory.silver ?? []);
        const coffeeHistory = commodCoffee ? processCommodityHistory(commodCoffee.data) : (cached?.commodityHistory.coffee ?? []);

        const gdpGrowth = computeGdpGrowth();
        const lastGdp = GDP_HISTORY_VALUES[GDP_HISTORY_VALUES.length - 1];

        const newData: EconomicDashboardData = {
          fxRates: {
            usd: {
              rate: rates.USD?.rate ?? 0,
              trend: directionToTrend(rates.USD?.direction ?? "unchanged"),
              history: usdHistory,
            },
            eur: {
              rate: rates.EUR?.rate ?? 0,
              trend: directionToTrend(rates.EUR?.direction ?? "unchanged"),
              history: eurHistory,
            },
            gbp: {
              rate: rates.GBP?.rate ?? 0,
              trend: directionToTrend(rates.GBP?.direction ?? "unchanged"),
            },
            aud: {
              rate: rates.AUD?.rate ?? 0,
              trend: directionToTrend(rates.AUD?.direction ?? "unchanged"),
            },
            jpy: {
              rate: rates.JPY?.rate ?? 0,
              trend: directionToTrend(rates.JPY?.direction ?? "unchanged"),
            },
            cny: {
              rate: rates.CNY?.rate ?? 0,
              trend: directionToTrend(rates.CNY?.direction ?? "unchanged"),
              history: cnyHistory,
            },
          },
          commodities: {
            gold: {
              symbol: "XAU/USD",
              name: "Gold",
              price: commodities["XAU/USD"]?.price ?? 0,
              trend: directionToTrend(commodities["XAU/USD"]?.direction ?? "unchanged"),
            },
            silver: {
              symbol: "XAG/USD",
              name: "Silver",
              price: commodities["XAG/USD"]?.price ?? 0,
              trend: directionToTrend(commodities["XAG/USD"]?.direction ?? "unchanged"),
            },
            coffee: {
              symbol: "KC1",
              name: "Coffee",
              price: commodities["KC1"]?.price ?? 0,
              trend: directionToTrend(commodities["KC1"]?.direction ?? "unchanged"),
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

        // Cache the newly fetched history along with current data so we can reuse it
        dataCache.set("dashboard_data", newData);
        
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

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
};
