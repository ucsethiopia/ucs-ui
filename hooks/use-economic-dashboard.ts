// Copyright (c) 2025 Ultimate Consultancy Service PLC. All rights reserved.
"use client";

import { useState, useEffect } from "react";
import type { EconomicDashboardData } from "@/lib/market-data-types";

// Re-export types for consumers that previously imported from this file
export type { FXRate, Commodity, TimeSeriesData, EconomicDashboardData } from "@/lib/market-data-types";

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useEconomicDashboard = () => {
  const [data, setData] = useState<EconomicDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [stale, setStale] = useState(false);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/market-data");

        if (!res.ok) {
          throw new Error(`Market data unavailable (${res.status})`);
        }

        const json = (await res.json()) as { data: EconomicDashboardData; stale: boolean };

        if (!cancelled) {
          setData(json.data);
          setStale(json.stale ?? false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("[useEconomicDashboard]", err);
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
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

  return { data, loading, error, stale, refetch };
};
