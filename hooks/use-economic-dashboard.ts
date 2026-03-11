"use client";

import { useState, useEffect } from "react";

export interface FXRate {
  rate: number;
  change: number;
  trend: "up" | "down" | "unchanged";
}

export interface Commodity {
  symbol: string;
  name: string;
  price: number;
  change: number;
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
  };
  commodities: {
    gold: Commodity;
    silver: Commodity;
    coffee: Commodity;
  };
  interestRate: {
    policyRate: number;
    tbillYield: number;
    history: TimeSeriesData[];
  };
  gdp: {
    value: number;
    year: string;
    growth: number;
    history: TimeSeriesData[];
  };
  esx: {
    aggregate: number;
    change: number;
    changePercent: number;
    history: TimeSeriesData[];
  };
  lastUpdated: string;
}

export const useEconomicDashboard = () => {
  const [data, setData] = useState<EconomicDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setData({
          fxRates: {
            usd: { rate: 56.78, change: 0.23, trend: "up" },
            eur: { rate: 61.45, change: -0.12, trend: "down" },
            gbp: { rate: 70.92, change: 0.08, trend: "up" },
            aud: { rate: 36.70, change: 0.00, trend: "unchanged" },
            jpy: { rate: 0.38, change: 0.01, trend: "up" },
          },
          commodities: {
            gold: {
              symbol: "XAU/USD",
              name: "Gold",
              price: 2650.0,
              change: 0.4,
              trend: "up",
            },
            silver: {
              symbol: "XAG/USD",
              name: "Silver",
              price: 31.25,
              change: -0.5,
              trend: "down",
            },
            coffee: {
              symbol: "Coffee/USD",
              name: "Coffee",
              price: 2.18,
              change: 0.0,
              trend: "unchanged",
            },
          },
          interestRate: {
            policyRate: 15.0,
            tbillYield: 14.628,
            history: [
              { date: "2023-Q1", value: 7.0 },
              { date: "2023-Q2", value: 7.0 },
              { date: "2023-Q3", value: 15.0 },
              { date: "2023-Q4", value: 15.0 },
              { date: "2024-Q1", value: 15.0 },
              { date: "2024-Q2", value: 15.0 },
            ],
          },
          gdp: {
            value: 160.5,
            year: "2024",
            growth: 6.1,
            history: [
              { date: "2019", value: 96.1 },
              { date: "2020", value: 107.6 },
              { date: "2021", value: 111.3 },
              { date: "2022", value: 120.4 },
              { date: "2023", value: 137.8 },
              { date: "2024", value: 160.5 },
            ],
          },
          esx: {
            aggregate: 125.5,
            change: 1.75,
            changePercent: 1.41,
            history: [
              { date: "Jan", value: 110.2 },
              { date: "Feb", value: 108.5 },
              { date: "Mar", value: 112.3 },
              { date: "Apr", value: 118.0 },
              { date: "May", value: 122.1 },
              { date: "Jun", value: 125.5 },
            ],
          },
          lastUpdated: new Date().toISOString(),
        });
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading, error };
};
