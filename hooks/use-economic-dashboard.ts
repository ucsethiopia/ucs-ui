"use client";

import { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_MARKET_DATA_API_URL ?? "";

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
 * Downsample a daily historical FX array to one point per month
 * (last entry for each YYYY-MM group).
 */
function downsampleMonthly(
  raw: { date: string; rates: Record<string, number> }[],
  currency: string
): TimeSeriesData[] {
  const byMonth: Record<string, number> = {};
  for (const entry of raw) {
    const month = entry.date.slice(0, 7); // YYYY-MM
    if (entry.rates[currency] != null) {
      byMonth[month] = entry.rates[currency];
    }
  }
  return Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, value]) => ({
      date: new Date(month + "-01").toLocaleString("default", { month: "short" }),
      value,
    }));
}

/**
 * Downsample a daily commodity array to one point per month
 * (last entry for each YYYY-MM group).
 */
function downsampleCommodityMonthly(
  raw: { date: string; close: number }[]
): TimeSeriesData[] {
  const byMonth: Record<string, number> = {};
  for (const entry of raw) {
    const month = entry.date.slice(0, 7);
    byMonth[month] = entry.close; // last entry per month wins
  }
  return Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, value]) => ({
      date: new Date(month + "-01").toLocaleString("default", {
        month: "short",
        year: "2-digit",
      }),
      value,
    }));
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

        // Throw on critical HTTP errors
        for (const res of [fxRes, commodRes, interestRes, gdpRes]) {
          if (!res.ok) throw new Error(`API error: ${res.status} ${res.url}`);
        }

        const [fx, commod, interest, gdp, fxHistUsd, fxHistEur, fxHistCny, commodGold, commodSilver, commodCoffee] =
          await Promise.all([
            fxRes.json(),
            commodRes.json(),
            interestRes.json(),
            gdpRes.json(),
            fxHistUsdRes.ok ? fxHistUsdRes.json() : { data: [] },
            fxHistEurRes.ok ? fxHistEurRes.json() : { data: [] },
            fxHistCnyRes.ok ? fxHistCnyRes.json() : { data: [] },
            commodHistGoldRes.ok ? commodHistGoldRes.json() : { data: [] },
            commodHistSilverRes.ok ? commodHistSilverRes.json() : { data: [] },
            commodHistCoffeeRes.ok ? commodHistCoffeeRes.json() : { data: [] },
          ]);

        if (cancelled) return;

        const rates = fx.rates ?? {};
        const commodities = commod.commodities ?? {};

        const usdHistory = downsampleMonthly(fxHistUsd.data ?? [], "USD");
        const eurHistory = downsampleMonthly(fxHistEur.data ?? [], "EUR");
        const cnyHistory = downsampleMonthly(fxHistCny.data ?? [], "CNY");

        const goldHistory = downsampleCommodityMonthly(commodGold.data ?? []);
        const silverHistory = downsampleCommodityMonthly(commodSilver.data ?? []);
        const coffeeHistory = downsampleCommodityMonthly(commodCoffee.data ?? []);

        const gdpGrowth = computeGdpGrowth();
        const lastGdp = GDP_HISTORY_VALUES[GDP_HISTORY_VALUES.length - 1];

        setData({
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
              // Derive trend from historical data — API direction field is unreliable for commodities
              trend: trendFromHistory(goldHistory),
            },
            silver: {
              symbol: "XAG/USD",
              name: "Silver",
              price: commodities["XAG/USD"]?.price ?? 0,
              trend: trendFromHistory(silverHistory),
            },
            coffee: {
              symbol: "KC1",
              name: "Coffee",
              price: commodities["KC1"]?.price ?? 0,
              trend: trendFromHistory(coffeeHistory),
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
        });
      } catch (err) {
        if (!cancelled) {
          console.error("[useEconomicDashboard]", err);
          setError(err as Error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
};
