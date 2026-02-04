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
    jpy: FXRate;
  };
  commodities: {
    gold: Commodity;
    silver: Commodity;
    coffee: Commodity;
  };
  interestRate: {
    current: number;
    previous: number;
    history: TimeSeriesData[];
  };
  gdp: {
    current: number;
    growth: number;
    unit: string;
    history: TimeSeriesData[];
  };
  esx: {
    current: number;
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
            jpy: { rate: 0.38, change: 0.01, trend: "up" },
          },
          commodities: {
            gold: {
              symbol: "XAU/ETB",
              name: "Gold",
              price: 115432.5,
              change: 12.3,
              trend: "up",
            },
            silver: {
              symbol: "XAG/ETB",
              name: "Silver",
              price: 1331.45,
              change: -0.15,
              trend: "down",
            },
            coffee: {
              symbol: "Coffee/ETB",
              name: "Coffee",
              price: 10632.75,
              change: 2.5,
              trend: "up",
            },
          },
          interestRate: {
            current: 7.0,
            previous: 7.0,
            history: [
              { date: "2023-Q1", value: 7.0 },
              { date: "2023-Q2", value: 7.0 },
              { date: "2023-Q3", value: 7.0 },
              { date: "2023-Q4", value: 7.0 },
              { date: "2024-Q1", value: 7.0 },
              { date: "2024-Q2", value: 7.0 },
            ],
          },
          gdp: {
            current: 126.8,
            growth: 6.1,
            unit: "Billion USD",
            history: [
              { date: "2019", value: 96.1 },
              { date: "2020", value: 107.6 },
              { date: "2021", value: 111.3 },
              { date: "2022", value: 120.4 },
              { date: "2023", value: 126.8 },
            ],
          },
          esx: {
            current: 3245.67,
            change: 45.23,
            changePercent: 1.41,
            history: [
              { date: "Jan", value: 3100 },
              { date: "Feb", value: 3050 },
              { date: "Mar", value: 3150 },
              { date: "Apr", value: 3200 },
              { date: "May", value: 3180 },
              { date: "Jun", value: 3245.67 },
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
