"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useEconomicDashboard } from "@/hooks/use-economic-dashboard";
import { MiniLineChart, Skeleton } from "@/components/ui/charts";
import { cn } from "@/lib/utils";

// Country flags
const FLAGS = {
  usd: "🇺🇸",
  eur: "🇪🇺",
  jpy: "🇯🇵",
};

// Compact rate item (Bloomberg-style)
function RateItem({
  flag,
  label,
  value,
  change,
  trend,
}: {
  flag?: string;
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "unchanged";
}) {
  return (
    <div className="flex items-center justify-center gap-2 px-3 py-1.5 hover:bg-muted/50 transition-colors whitespace-nowrap flex-1">
      {flag && <span className="text-lg">{flag}</span>}
      <span className="text-xs text-muted-foreground font-medium min-w-[50px]">
        {label}
      </span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
      <span
        className={cn(
          "text-[10px] font-medium ml-2",
          trend === "up" && "text-emerald-500",
          trend === "down" && "text-red-500",
          trend === "unchanged" && "text-muted-foreground",
        )}
      >
        {change >= 0 ? "+" : ""}
        {change.toFixed(2)}%
      </span>
    </div>
  );
}

export function EconomicDashboard() {
  const { data, loading } = useEconomicDashboard();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-6 lg:py-10 border-b bg-muted/30">
      <div className="w-full px-4 md:px-6 max-w-[90vw] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-base lg:text-lg font-serif font-semibold text-foreground">
              Economic Dashboard
            </h2>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {loading
                ? "Loading..."
                : `Updated: ${new Date(
                    data?.lastUpdated || "",
                  ).toLocaleTimeString()}`}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-muted-foreground font-medium text-[10px] hidden sm:inline">
              LIVE
            </span>
          </div>
        </motion.div>

        <div className="space-y-5">
          {/* ROW 1: Compact Rates Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border rounded-lg overflow-hidden"
          >
            {loading ? (
              <div className="space-y-1 p-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-7 w-full" />
                ))}
              </div>
            ) : (
              <div className="flex items-center py-0.5 overflow-x-auto scrollbar-hide">
                {/* FX Rates */}
                {Object.entries(data?.fxRates || {}).map(
                  ([code, fx], index) => (
                    <>
                      <RateItem
                        key={code}
                        flag={FLAGS[code as keyof typeof FLAGS]}
                        label={code.toUpperCase()}
                        value={fx.rate.toFixed(2)}
                        change={fx.change}
                        trend={fx.trend}
                      />
                      {index < Object.keys(data?.fxRates || {}).length - 1 && (
                        <div className="w-px bg-border h-4" />
                      )}
                    </>
                  ),
                )}
                {/* Thicker & Taller Divider between FX and Commodities */}
                <div className="w-0.5 bg-border h-6 mx-1" />
                {/* Commodities */}
                {Object.values(data?.commodities || {}).map(
                  (commodity, index) => (
                    <>
                      <RateItem
                        key={commodity.symbol}
                        label={commodity.name}
                        value={commodity.price.toLocaleString("en-US", {
                          maximumFractionDigits: 0,
                        })}
                        change={commodity.change}
                        trend={commodity.trend}
                      />
                      {index <
                        Object.values(data?.commodities || {}).length - 1 && (
                        <div className="w-px bg-border h-4" />
                      )}
                    </>
                  ),
                )}
              </div>
            )}
          </motion.div>

          {/* ROW 2: Full-Width Charts */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4 overflow-x-auto scrollbar-hide"
          >
            {/* Interest Rate Chart */}
            <div className="bg-card border rounded-lg p-5 min-w-[280px] flex-1">
              {loading ? (
                <>
                  <Skeleton className="h-4 w-28 mb-3" />
                  <Skeleton className="h-40 w-full" />
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <h3 className="text-xs font-medium text-muted-foreground mb-1">
                      NBE Interest Rate
                    </h3>
                    <div className="text-3xl font-bold text-foreground">
                      {data?.interestRate.current}%
                    </div>
                  </div>
                  <MiniLineChart
                    data={data?.interestRate.history || []}
                    height={140}
                    color="var(--color-navy-600)"
                  />
                </>
              )}
            </div>

            {/* GDP Chart */}
            <div className="bg-card border rounded-lg p-5 min-w-[280px] flex-1">
              {loading ? (
                <>
                  <Skeleton className="h-4 w-28 mb-3" />
                  <Skeleton className="h-40 w-full" />
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <h3 className="text-xs font-medium text-muted-foreground mb-1">
                      Ethiopia GDP
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">
                        ${data?.gdp.current}B
                      </span>
                      <span className="text-sm font-medium text-emerald-500">
                        +{data?.gdp.growth}%
                      </span>
                    </div>
                  </div>
                  <MiniLineChart
                    data={data?.gdp.history || []}
                    height={140}
                    color="var(--color-gold-500)"
                  />
                </>
              )}
            </div>

            {/* ESX Chart */}
            <div className="bg-card border rounded-lg p-5 min-w-[280px] flex-1">
              {loading ? (
                <>
                  <Skeleton className="h-4 w-28 mb-3" />
                  <Skeleton className="h-40 w-full" />
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <h3 className="text-xs font-medium text-muted-foreground mb-1">
                      ESX Aggregate
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">
                        {data?.esx.current.toFixed(2)}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          data?.esx.changePercent && data.esx.changePercent > 0
                            ? "text-emerald-500"
                            : "text-red-500",
                        )}
                      >
                        {data?.esx.changePercent && data.esx.changePercent > 0
                          ? "+"
                          : ""}
                        {data?.esx.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <MiniLineChart
                    data={data?.esx.history || []}
                    height={140}
                    color="var(--color-navy-700)"
                  />
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
