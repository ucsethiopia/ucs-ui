"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useEconomicDashboard } from "@/hooks/use-economic-dashboard";
import { MiniLineChart, Skeleton } from "@/components/ui/charts";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  label: string;
  value: string;
  badge?: string;
  badgeUp?: boolean;
  chartData: { date: string; value: number }[];
  chartColor: string;
  loading: boolean;
  yTickFormatter?: (v: number) => string;
}

function ChartCard({ label, value, badge, badgeUp, chartData, chartColor, loading, yTickFormatter }: ChartCardProps) {
  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-5 min-w-[280px] flex-1">
        <Skeleton className="h-3 w-28 mb-3" />
        <Skeleton className="h-9 w-36 mb-4" />
        <Skeleton className="h-36 w-full" />
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-5 min-w-[280px] flex-1">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </h3>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-bold text-foreground tabular-nums">{value}</span>
        {badge && (
          <span className={cn("text-sm font-medium", badgeUp ? "text-emerald-500" : "text-red-400")}>
            {badge}
          </span>
        )}
      </div>
      <MiniLineChart
        data={chartData}
        height={140}
        color={chartColor}
        showAxes
        yTickFormatter={yTickFormatter}
      />
    </div>
  );
}

export function MarketAnalytics() {
  const { data, loading } = useEconomicDashboard();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 bg-muted/40 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-base lg:text-lg font-serif font-semibold text-foreground">
            Market Analytics
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Historical trends</p>
        </motion.div>

        <motion.div
          className="flex gap-4 overflow-x-auto scrollbar-hide"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <ChartCard
            label="NBE Policy Rate"
            value={loading ? "—" : `${data?.interestRate.policyRate.toFixed(2)}%`}
            chartData={data?.interestRate.history ?? []}
            chartColor="var(--color-navy-600)"
            loading={loading}
            yTickFormatter={(v) => `${v}%`}
          />
          <ChartCard
            label="Ethiopia GDP"
            value={loading ? "—" : `$${data?.gdp.value}B`}
            badge={loading ? undefined : `+${data?.gdp.growth}%`}
            badgeUp
            chartData={data?.gdp.history ?? []}
            chartColor="var(--color-gold-500)"
            loading={loading}
            yTickFormatter={(v) => `$${v.toFixed(0)}B`}
          />
          <ChartCard
            label="ESX Aggregate"
            value={loading ? "—" : `${data?.esx.aggregate.toFixed(1)}`}
            badge={
              loading
                ? undefined
                : `${(data?.esx.changePercent ?? 0) > 0 ? "+" : ""}${data?.esx.changePercent.toFixed(2)}%`
            }
            badgeUp={(data?.esx.changePercent ?? 0) > 0}
            chartData={data?.esx.history ?? []}
            chartColor="var(--color-navy-700)"
            loading={loading}
            yTickFormatter={(v) => v.toFixed(0)}
          />
        </motion.div>
      </div>
    </section>
  );
}
