"use client";

import { useRef, useState } from "react";
import { useEconomicDashboardContext } from "@/components/home/economic-dashboard-provider";
import { useMarqueeFocus } from "@/components/home/marquee-focus-provider";
import { useAnimationPlaybackRate } from "@/hooks/use-animation-playback-rate";
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

// While the client logo marquee is also on screen, two strips scrolling at
// different speeds compete for attention; the ticker eases down to this rate.
const FULL_SPEED = 1;
const CALM_SPEED = 0.4;

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
  percentageChange?: number;
}

function TickerItem({ icon, label, value, trend, percentageChange }: TickerItemProps) {
  const change = percentageChange ?? 0;
  const isMeaningful = Math.abs(change) >= 0.01;
  const colorClass = !isMeaningful
    ? "text-white/50"
    : change > 0
      ? "text-emerald-400"
      : "text-red-400";

  return (
    <div className="flex items-center gap-2 px-4 border-r border-white/15 whitespace-nowrap">
      {icon && <span className="text-base">{icon}</span>}
      <span className="text-xs font-medium text-white/60 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm font-bold text-white tabular-nums">
        {value}
      </span>
      <span className={cn("text-xs font-medium tabular-nums", colorClass)}>
        {percentageChange != null ? (
          <>
            {isMeaningful && change > 0 ? "+" : ""}
            {isMeaningful ? `${change.toFixed(2)}%` : "0.00%"}
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
  const trackRef = useRef<HTMLDivElement>(null);
  const { clientMarqueeInView } = useMarqueeFocus();

  useAnimationPlaybackRate(
    trackRef,
    clientMarqueeInView ? CALM_SPEED : FULL_SPEED,
    !loading && !!data,
  );

  const isError = !loading && (error || !data);

  if (isError) {
    return null;
  }

  return (
    <div
      className="fixed top-19 left-0 right-0 z-40 h-10 bg-navy-950/80 backdrop-blur-sm border-b border-white/10 overflow-hidden"
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
          <div ref={trackRef} className="animate-marquee flex items-center h-full" style={{ animationPlayState: paused ? "paused" : "running" }}>
            {Object.entries(data?.fxRates || {}).map(([code, fx]) => (
              <TickerItem
                key={code}
                icon={FLAGS[code]}
                label={FX_LABELS[code] ?? `${code.toUpperCase()}/ETB`}
                value={fx.rate.toFixed(2)}
                trend={fx.trend}
                percentageChange={fx.percentageChange}
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
                percentageChange={commodity.percentageChange}
              />
            ))}
            {/* Duplicate for seamless loop — hidden from screen readers */}
            <div aria-hidden="true" className="flex items-center h-full">
              {Object.entries(data?.fxRates || {}).map(([code, fx]) => (
                <TickerItem
                  key={`${code}-dup`}
                  icon={FLAGS[code]}
                  label={FX_LABELS[code] ?? `${code.toUpperCase()}/ETB`}
                  value={fx.rate.toFixed(2)}
                  trend={fx.trend}
                  percentageChange={fx.percentageChange}
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
