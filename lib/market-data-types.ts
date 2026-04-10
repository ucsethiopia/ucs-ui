// Copyright (c) 2025 Ultimate Consultancy Service PLC. All rights reserved.

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
