"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useEconomicDashboard } from "@/hooks/use-economic-dashboard";
import { Skeleton } from "@/components/ui/charts";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  badge: string;
  badgeVariant?: "neutral" | "up" | "down";
  loading: boolean;
}

function StatCard({ label, value, badge, badgeVariant = "neutral", loading }: StatCardProps) {
  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-5">
        <Skeleton className="h-3 w-28 mb-3" />
        <Skeleton className="h-9 w-36 mb-3" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
      <p className="text-3xl font-bold text-foreground tabular-nums mt-1">{value}</p>
      <span
        className={cn(
          "inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full",
          badgeVariant === "neutral" && "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
          badgeVariant === "up" && "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
          badgeVariant === "down" && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        )}
      >
        {badge}
      </span>
    </div>
  );
}

export function EconomicDashboard() {
  const { data, loading } = useEconomicDashboard();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-10 bg-muted/20 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between mb-6"
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
                : `Updated: ${new Date(data?.lastUpdated || "").toLocaleTimeString()}`}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-muted-foreground font-medium text-[10px] hidden sm:inline">LIVE</span>
          </div>
        </motion.div>

        {/* NBE Rates */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            NBE Rates
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatCard
              label="Policy Rate"
              value={loading ? "—" : `${data?.interestRate.policyRate.toFixed(2)}%`}
              badge="Unchanged"
              badgeVariant="neutral"
              loading={loading}
            />
            <StatCard
              label="T-Bill Yield"
              value={loading ? "—" : `${data?.interestRate.tbillYield.toFixed(3)}%`}
              badge="▲ 0.1%"
              badgeVariant="up"
              loading={loading}
            />
            <StatCard
              label="ESX Aggregate"
              value={loading ? "—" : `${data?.esx.aggregate.toFixed(1)}`}
              badge={loading ? "—" : `▲ ${data?.esx.changePercent.toFixed(1)}%`}
              badgeVariant="up"
              loading={loading}
            />
          </div>
        </motion.div>

        {/* Economic Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Economic Indicators
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              label="Ethiopia GDP"
              value={loading ? "—" : `$${data?.gdp.value}B`}
              badge={loading ? "—" : data?.gdp.year ?? ""}
              badgeVariant="neutral"
              loading={loading}
            />
            <StatCard
              label="ESX Companies"
              value="2"
              badge="Active"
              badgeVariant="neutral"
              loading={loading}
            />
          </div>
        </motion.div>

        {/* Commodities */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Commodities
          </p>
          {loading ? (
            <div className="flex flex-col sm:flex-row gap-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-14 flex-1 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              {Object.values(data?.commodities ?? {}).map((c) => {
                const TrendIcon =
                  c.trend === "up"
                    ? TrendingUp
                    : c.trend === "down"
                      ? TrendingDown
                      : Minus;
                const trendColor =
                  c.trend === "up"
                    ? "text-emerald-500"
                    : c.trend === "down"
                      ? "text-red-400"
                      : "text-muted-foreground";
                return (
                  <div
                    key={c.symbol}
                    className="flex-1 flex items-center justify-between gap-3 bg-card border border-border rounded-lg px-4 py-3"
                  >
                    <div>
                      <p className="text-xs text-muted-foreground font-mono mb-0.5">
                        {c.symbol}
                      </p>
                      <p className="text-sm font-semibold text-foreground tabular-nums">
                        ${c.price.toLocaleString()}
                      </p>
                    </div>
                    <div className={cn("flex items-center gap-1", trendColor)}>
                      <TrendIcon className="h-4 w-4" />
                      <span className="text-xs font-medium tabular-nums">
                        {c.change > 0 ? "+" : ""}
                        {c.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
