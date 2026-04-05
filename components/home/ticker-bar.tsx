"use client";

import { useState } from "react";
import { useEconomicDashboardContext } from "@/components/home/economic-dashboard-provider";
import { Skeleton } from "@/components/ui/charts";
import { cn } from "@/lib/utils";

const COUNTRY_CODES: Record<string, string> = {
  usd: "US",
  eur: "EU",
  gbp: "GB",
  aud: "AU",
  jpy: "JP",
  cny: "CN",
};

const FX_LABELS: Record<string, string> = {
  usd: "USD/ETB",
  eur: "EUR/ETB",
  gbp: "GBP/ETB",
  aud: "AUD/ETB",
  jpy: "JPY/ETB",
  cny: "CNY/ETB",
};

interface TickerItemProps {
  code?: string;
  label: string;
  value: string;
  trend: "up" | "down" | "unchanged";
  percentageChange?: number;
}

function TickerItem({ code, label, value, trend, percentageChange }: TickerItemProps) {
  const change = percentageChange ?? 0;
  const colorClass =
    change > 0
      ? "text-emerald-400"
      : change < 0
        ? "text-red-400"
        : "text-white/50";

  return (
    <div className="flex items-center gap-2 px-4 border-r border-white/15 whitespace-nowrap">
      {code && (
        <span className="font-mono text-[10px] font-bold text-white/40 tracking-wider">
          {code}
        </span>
      )}
      <span className="text-xs font-medium text-white/60 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm font-bold text-white tabular-nums">
        {value}
      </span>
      <span className={cn("text-xs font-medium tabular-nums", colorClass)}>
        {percentageChange != null ? (
          <>
            {change > 0 ? "+" : ""}
            {change === 0 ? "0.00%" : `${change.toFixed(2)}%`}
          </>
        ) : (
          trend === "up" ? "▲" : trend === "down" ? "▼" : "—"
        )}
      </span>
    </div>
  );
}

export function TickerBar() {
  const { data, loading, error } = useEconomicDashboardContext();
  const [paused, setPaused] = useState(false);

  const isError = !loading && (error || !data);

  if (isError) {
    return null;
  }

  return (
    <div
      className="h-10 bg-navy-900/80 backdrop-blur-sm border-b border-white/10 overflow-hidden hidden sm:block"
      aria-label="Live financial data ticker"
      aria-live="polite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {loading ? (
        <div className="flex items-center h-full px-4">
          <Skeleton className="h-4 w-full bg-white/20" />
        </div>
      ) : (
        <div className="flex items-center h-full overflow-hidden">
          <div
            className="animate-marquee flex items-center h-full"
            style={{
              animationPlayState: paused ? "paused" : "running",
              animationDuration: "60s",
            }}
          >
            {Object.entries(data?.fxRates || {}).map(([code, fx]) => (
              <TickerItem
                key={code}
                code={COUNTRY_CODES[code]}
                label={FX_LABELS[code] ?? `${code.toUpperCase()}/ETB`}
                value={fx.rate.toFixed(2)}
                trend={fx.trend}
                percentageChange={fx.percentageChange}
              />
            ))}
            {Object.values(data?.commodities || {}).map((commodity) => (
              <TickerItem
                key={commodity.symbol}
                label={commodity.name}
                value={commodity.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                trend={commodity.trend}
                percentageChange={commodity.percentageChange}
              />
            ))}
            {/* Duplicate for seamless loop */}
            <div aria-hidden="true" className="flex items-center h-full">
              {Object.entries(data?.fxRates || {}).map(([code, fx]) => (
                <TickerItem
                  key={`${code}-dup`}
                  code={COUNTRY_CODES[code]}
                  label={FX_LABELS[code] ?? `${code.toUpperCase()}/ETB`}
                  value={fx.rate.toFixed(2)}
                  trend={fx.trend}
                  percentageChange={fx.percentageChange}
                />
              ))}
              {Object.values(data?.commodities || {}).map((commodity) => (
                <TickerItem
                  key={`${commodity.symbol}-dup`}
                  label={commodity.name}
                  value={commodity.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  trend={commodity.trend}
                  percentageChange={commodity.percentageChange}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
