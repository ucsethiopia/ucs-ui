"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useEconomicDashboard } from "@/hooks/use-economic-dashboard";
import { SparklineChart, Skeleton } from "@/components/ui/charts";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  badge: string;
  badgeVariant?: "neutral" | "up" | "down";
  chartData?: { date: string; value: number }[];
  chartColor?: string;
  valueFormatter?: (v: number) => string;
  loading: boolean;
}

function StatCard({
  label,
  value,
  badge,
  badgeVariant = "neutral",
  chartData,
  chartColor = "var(--color-gold-500)",
  valueFormatter,
  loading,
}: StatCardProps) {
  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-5 flex items-center gap-4">
        <div className="flex-1">
          <Skeleton className="h-3 w-24 mb-3" />
          <Skeleton className="h-8 w-28 mb-3" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="w-36 h-20 flex-shrink-0 rounded" />
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-5 flex items-center gap-4 transition-all duration-200 hover:border-gold-500/20 hover:shadow-sm">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold text-foreground tabular-nums mt-1">{value}</p>
        <span
          className={cn(
            "inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full",
            badgeVariant === "neutral" &&
              "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
            badgeVariant === "up" &&
              "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
            badgeVariant === "down" &&
              "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
          )}
        >
          {badge}
        </span>
      </div>
      {chartData && chartData.length > 0 && (
        <div className="w-36 h-20 flex-shrink-0">
          <SparklineChart
            data={chartData}
            color={chartColor}
            valueFormatter={valueFormatter}
          />
        </div>
      )}
    </div>
  );
}

export function EconomicDashboard() {
  const { data, loading } = useEconomicDashboard();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-10 bg-muted/20 border-b border-border">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14">
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
            <span className="text-muted-foreground font-medium text-[10px] hidden sm:inline">
              LIVE
            </span>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <StatCard
            label="NBE Policy Rate"
            value={loading ? "—" : `${data?.interestRate.policyRate.toFixed(2)}%`}
            badge="Unchanged"
            badgeVariant="neutral"
            chartData={data?.interestRate.history}
            chartColor="var(--color-navy-600)"
            valueFormatter={(v) => `${v}%`}
            loading={loading}
          />
          <StatCard
            label="T-Bill Yield"
            value={loading ? "—" : `${data?.interestRate.tbillYield.toFixed(3)}%`}
            badge="▲ 0.1%"
            badgeVariant="up"
            chartData={data?.interestRate.history}
            chartColor="var(--color-gold-500)"
            valueFormatter={(v) => `${v}%`}
            loading={loading}
          />
          <StatCard
            label="ESX Aggregate"
            value={loading ? "—" : `${data?.esx.aggregate.toFixed(1)}`}
            badge={loading ? "—" : `▲ ${data?.esx.changePercent.toFixed(2)}%`}
            badgeVariant="up"
            chartData={data?.esx.history}
            chartColor="var(--color-navy-700)"
            valueFormatter={(v) => v.toFixed(1)}
            loading={loading}
          />
          <StatCard
            label="Ethiopia GDP"
            value={loading ? "—" : `$${data?.gdp.value}B`}
            badge={loading ? "—" : `+${data?.gdp.growth}% · ${data?.gdp.year}`}
            badgeVariant="up"
            chartData={data?.gdp.history}
            chartColor="var(--color-gold-500)"
            valueFormatter={(v) => `$${v.toFixed(0)}B`}
            loading={loading}
          />
          <StatCard
            label="ESX Listed Companies"
            value="2"
            badge="Active"
            badgeVariant="neutral"
            loading={loading}
          />
          <StatCard
            label="USD / ETB Rate"
            value={loading ? "—" : data?.fxRates.usd.rate.toFixed(2) ?? "—"}
            badge={loading ? "—" : `▲ ${data?.fxRates.usd.change.toFixed(2)}%`}
            badgeVariant="up"
            chartData={data?.fxRates.usd.history}
            chartColor="var(--color-navy-600)"
            valueFormatter={(v) => v.toFixed(2)}
            loading={loading}
          />
        </motion.div>
      </div>
    </section>
  );
}
