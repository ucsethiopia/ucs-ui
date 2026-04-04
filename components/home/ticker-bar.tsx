"use client";

import { useEconomicDashboard } from "@/hooks/use-economic-dashboard";
import { Skeleton } from "@/components/ui/charts";
import { cn } from "@/lib/utils";

const FLAGS: Record<string, string> = {
  usd: "🇺🇸",
  eur: "🇪🇺",
  gbp: "🇬🇧",
  aud: "🇦🇺",
  jpy: "🇯🇵",
  cny: "🇨🇳",
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
  icon?: string;
  label: string;
  value: string;
  trend: "up" | "down" | "unchanged";
}

function TickerItem({ icon, label, value, trend }: TickerItemProps) {
  return (
    <div className="flex items-center gap-2 px-4 border-r border-white/15 whitespace-nowrap">
      {icon && <span className="text-base">{icon}</span>}
      <span className="text-xs font-medium text-white/60 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm font-bold text-white tabular-nums">
        {value}
      </span>
      <span
        className={cn(
          "text-xs font-medium",
          trend === "up" && "text-emerald-400",
          trend === "down" && "text-red-400",
          trend === "unchanged" && "text-white/50",
        )}
      >
        {trend === "up" ? "▲" : trend === "down" ? "▼" : "—"}
      </span>
    </div>
  );
}

export function TickerBar() {
  const { data, loading } = useEconomicDashboard();

  return (
    <div
      className="fixed top-14 left-0 right-0 z-40 h-10 bg-navy-950/80 backdrop-blur-sm border-b border-white/10 overflow-hidden hidden sm:block"
      aria-label="Live financial data ticker"
      aria-live="polite"
    >
      {loading ? (
        <div className="flex items-center h-full px-4">
          <Skeleton className="h-4 w-full bg-white/20" />
        </div>
      ) : (
        <div className="flex items-center h-full overflow-hidden">
          <div className="animate-marquee flex items-center h-full">
            {Object.entries(data?.fxRates || {}).map(([code, fx]) => (
              <TickerItem
                key={code}
                icon={FLAGS[code]}
                label={FX_LABELS[code] ?? `${code.toUpperCase()}/ETB`}
                value={fx.rate.toFixed(2)}
                trend={fx.trend}
              />
            ))}
            {Object.values(data?.commodities || {}).map((commodity) => (
              <TickerItem
                key={commodity.symbol}
                icon="✦"
                label={commodity.name}
                value={commodity.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                trend={commodity.trend}
              />
            ))}
            {/* Duplicate for seamless loop */}
            {Object.entries(data?.fxRates || {}).map(([code, fx]) => (
              <TickerItem
                key={`${code}-dup`}
                icon={FLAGS[code]}
                label={FX_LABELS[code] ?? `${code.toUpperCase()}/ETB`}
                value={fx.rate.toFixed(2)}
                trend={fx.trend}
              />
            ))}
            {Object.values(data?.commodities || {}).map((commodity) => (
              <TickerItem
                key={`${commodity.symbol}-dup`}
                icon="✦"
                label={commodity.name}
                value={commodity.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                trend={commodity.trend}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
