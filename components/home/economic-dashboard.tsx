"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useEconomicDashboardContext } from "@/components/home/economic-dashboard-provider";
import { SparklineChart, Skeleton } from "@/components/ui/charts";
import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";

// Chart colors — chosen for visibility on dark navy cards
const COLORS = {
  gold:   "oklch(0.72 0.17 142)",
  silver: "oklch(0.78 0.09 210)",
  coffee: "oklch(0.68 0.12 50)",
  usd:    "oklch(0.65 0.10 225)",
  eur:    "var(--color-gold-400)",
  cny:    "var(--color-gold-600)",
} as const;

// ─── TextStatCard ─────────────────────────────────────────────────────────────

interface TextStatCardProps {
  label: string;
  value: string;
  subLabel: string;
  loading: boolean;
}

function TextStatCard({ label, value, subLabel, loading }: TextStatCardProps) {
  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-3 py-2.5">
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-20 flex-shrink-0" />
          <div className="w-px h-4 bg-border flex-shrink-0" />
          <Skeleton className="h-5 w-16 flex-shrink-0" />
        </div>
        <Skeleton className="h-3 w-28" />
      </div>
    );
  }
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-3 py-2.5">
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest whitespace-nowrap flex-shrink-0">
          {label}
        </span>
        <div className="w-px h-4 bg-border flex-shrink-0" />
        <span className="text-lg font-bold text-foreground tabular-nums whitespace-nowrap flex-shrink-0">
          {value}
        </span>
      </div>
      <span className="text-xs text-muted-foreground">{subLabel}</span>
    </div>
  );
}

// ─── StatCard (sparkline) ─────────────────────────────────────────────────────

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
  chartColor = COLORS.gold,
  valueFormatter,
  loading,
}: StatCardProps) {
  if (loading) {
    return (
      <div className="flex items-center gap-3 py-4 border-b border-border last:border-b-0">
        <div className="flex-shrink-0 w-28">
          <Skeleton className="h-3 w-20 mb-2" />
          <Skeleton className="h-7 w-24 mb-2" />
          <Skeleton className="h-4 w-14 rounded-full" />
        </div>
        <Skeleton className="flex-1 h-32 rounded" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 py-4 border-b border-border last:border-b-0">
      {/* Narrow text column */}
      <div className="flex-shrink-0 min-w-0">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5 whitespace-nowrap">
          {label}
        </p>
        <p className="text-xl font-bold text-foreground tabular-nums">{value}</p>
        <span
          className={cn(
            "inline-block mt-1.5 px-2 py-0.5 text-[10px] font-medium rounded-full whitespace-nowrap",
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
      {/* Chart — fills remaining space */}
      {chartData && chartData.length > 0 && (
        <div className="flex-1 min-w-0 h-32">
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function trendBadge(trend: "up" | "down" | "unchanged", pct?: number): string {
  if (pct != null) {
    const sign = pct >= 0 ? "+" : "";
    const arrow = trend === "up" ? "▲" : trend === "down" ? "▼" : "";
    return `${arrow} ${sign}${pct}%`.trim();
  }
  if (trend === "up") return "▲ Rising";
  if (trend === "down") return "▼ Falling";
  return "Unchanged";
}

function trendVariant(trend: "up" | "down" | "unchanged"): "up" | "down" | "neutral" {
  if (trend === "up") return "up";
  if (trend === "down") return "down";
  return "neutral";
}

// ─── EconomicDashboard ────────────────────────────────────────────────────────

export function EconomicDashboard() {
  const { data, loading, error, refetch } = useEconomicDashboardContext();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isError = !loading && (error || !data);

  if (isError) {
    return (
      <section ref={ref} className="py-8 border-b border-border">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14 flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="w-10 h-10 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Market Data Temporarily Unavailable</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            We&apos;re having trouble connecting to the live financial feed. Please try again later.
          </p>
          <button
            onClick={refetch}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors bg-card hover:bg-muted border border-border rounded-md text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Connection
          </button>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="border-b border-border" style={{ paddingBlock: "var(--space-section-tight)" }}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14">
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: ease.out }}
        >
          <div>
            <h2 className="font-serif font-semibold text-foreground" style={{ fontSize: "var(--font-size-heading-3)" }}>
              Ethiopian Economic Dashboard
            </h2>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {loading
                ? "Loading..."
                : `Updated: ${new Date(data?.lastUpdated || "").toLocaleTimeString()}`}
            </p>
          </div>
        </motion.div>

        {/* Compact inline stat row — GDP + interest rates */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 border-b border-border mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05, ease: ease.out }}
        >
          <TextStatCard
            label="Ethiopian GDP"
            value={loading ? "—" : `$${data?.gdp?.value}B`}
            subLabel={loading ? "—" : `FY ${data?.gdp?.year} · +${data?.gdp?.growth?.toFixed(1)}% YoY`}
            loading={loading}
          />
          <TextStatCard
            label="T-Bill Yield"
            value={loading ? "—" : `${data?.interestRate?.tbillYield?.toFixed(2)}%`}
            subLabel="91-day NBE T-Bill"
            loading={loading}
          />
          <TextStatCard
            label="Policy Rate"
            value={loading ? "—" : `${data?.interestRate?.policyRate?.toFixed(2)}%`}
            subLabel="National Bank of Ethiopia"
            loading={loading}
          />
        </motion.div>

        {/* Sparkline grid — commodities */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: ease.out }}
        >
          <StatCard
            label="Gold (XAU/USD)"
            value={loading ? "—" : `$${data?.commodities?.gold?.price?.toLocaleString()}`}
            badge={loading ? "—" : trendBadge(data?.commodities?.gold?.trend ?? "unchanged", data?.commodities?.gold?.percentageChange)}
            badgeVariant={trendVariant(data?.commodities?.gold?.trend ?? "unchanged")}
            chartData={data?.commodityHistory?.gold}
            chartColor={COLORS.gold}
            valueFormatter={(v) => `$${v.toLocaleString()}`}
            loading={loading}
          />
          <StatCard
            label="Silver (XAG/USD)"
            value={loading ? "—" : `$${data?.commodities?.silver?.price?.toFixed(2)}`}
            badge={loading ? "—" : trendBadge(data?.commodities?.silver?.trend ?? "unchanged", data?.commodities?.silver?.percentageChange)}
            badgeVariant={trendVariant(data?.commodities?.silver?.trend ?? "unchanged")}
            chartData={data?.commodityHistory?.silver}
            chartColor={COLORS.silver}
            valueFormatter={(v) => `$${v.toFixed(2)}`}
            loading={loading}
          />
          <StatCard
            label="Coffee (KC1)"
            value={loading ? "—" : `$${data?.commodities?.coffee?.price?.toFixed(2)}`}
            badge={loading ? "—" : trendBadge(data?.commodities?.coffee?.trend ?? "unchanged", data?.commodities?.coffee?.percentageChange)}
            badgeVariant={trendVariant(data?.commodities?.coffee?.trend ?? "unchanged")}
            chartData={data?.commodityHistory?.coffee}
            chartColor={COLORS.coffee}
            valueFormatter={(v) => `$${v.toFixed(2)}`}
            loading={loading}
          />
        </motion.div>
      </div>
    </section>
  );
}
