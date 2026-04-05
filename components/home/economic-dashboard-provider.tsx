"use client";

import { createContext, useContext } from "react";
import { useEconomicDashboard, type EconomicDashboardData } from "@/hooks/use-economic-dashboard";

interface EconomicDashboardContextValue {
  data: EconomicDashboardData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

const EconomicDashboardContext = createContext<EconomicDashboardContextValue | null>(null);

export function EconomicDashboardProvider({ children }: { children: React.ReactNode }) {
  const value = useEconomicDashboard();
  return (
    <EconomicDashboardContext.Provider value={value}>
      {children}
    </EconomicDashboardContext.Provider>
  );
}

export function useEconomicDashboardContext(): EconomicDashboardContextValue {
  const ctx = useContext(EconomicDashboardContext);
  if (!ctx) throw new Error("useEconomicDashboardContext must be used within EconomicDashboardProvider");
  return ctx;
}
