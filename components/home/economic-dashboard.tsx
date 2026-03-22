"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useEconomicDashboard } from "@/hooks/use-economic-dashboard";
import { SparklineChart, Skeleton } from "@/components/ui/charts";
import { cn } from "@/lib/utils";

// Chart colors — chosen for visibility on dark navy cards
const COLORS = {
  gold:   "var(--color-gold-500)",   // oklch(0.75 0.14 85)  — warm yellow-gold
  silver: "oklch(0.78 0.09 210)",    // bright steel-blue — visible on dark bg
  coffee: "oklch(0.68 0.12 50)",     // warm amber-brown — coffee-toned
  usd:    "oklch(0.65 0.10 225)",    // medium bright blue
  eur:    "var(--color-gold-400)",   // oklch(0.82 0.12 85)   — light gold
  cny:    "var(--color-gold-600)",   // oklch(0.65 0.15 85)   — deep amber
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
      <div className="bg-card border border-border rounded-lg px-4 py-2.5 flex items-center gap-3">
        <Skeleton className="h-3 w-20 flex-shrink-0" />
        <div className="w-px h-4 bg-border flex-shrink-0" />
        <Skeleton className="h-5 w-16 flex-shrink-0" />
        <Skeleton className="h-3 w-28" />
      </div>
    );
  }
  return (
    <div className="bg-card border border-border rounded-lg px-4 py-2.5 flex items-center gap-3 transition-all duration-200 hover:border-gold-500/20 hover:shadow-sm">
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest whitespace-nowrap flex-shrink-0">
        {label}
      </span>
      <div className="w-px h-4 bg-border flex-shrink-0" />
      <span className="text-lg font-bold text-foreground tabular-nums whitespace-nowrap flex-shrink-0">
        {value}
      </span>
      <span className="text-xs text-muted-foreground truncate">{subLabel}</span>
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
      <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
        <div className="flex-shrink-0 w-28">
          <Skeleton className="h-3 w-20 mb-2" />
          <Skeleton className="h-7 w-24 mb-2" />
          <Skeleton className="h-4 w-14 rounded-full" />
        </div>
        <Skeleton className="flex-1 h-24 rounded" />
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3 transition-all duration-200 hover:border-gold-500/20 hover:shadow-sm">
      {/* Narrow text column — shrinks to content width */}
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
        <div className="flex-1 min-w-0 h-24">
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

function trendBadge(trend: "up" | "down" | "unchanged"): string {
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
  const { data, loading } = useEconomicDashboard();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-8 bg-muted/20 border-b border-border">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14">
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

        {/* Compact inline stat row — GDP + interest rates */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <TextStatCard
            label="Ethiopian GDP"
            value={loading ? "—" : `$${data?.gdp.value}B`}
            subLabel={loading ? "—" : `FY ${data?.gdp.year} · +${data?.gdp.growth.toFixed(1)}% YoY`}
            loading={loading}
          />
          <TextStatCard
            label="T-Bill Yield"
            value={loading ? "—" : `${data?.interestRate.tbillYield.toFixed(2)}%`}
            subLabel="91-day NBE T-Bill"
            loading={loading}
          />
          <TextStatCard
            label="Policy Rate"
            value={loading ? "—" : `${data?.interestRate.policyRate.toFixed(2)}%`}
            subLabel="National Bank of Ethiopia"
            loading={loading}
          />
        </motion.div>

        {/* Sparkline grid — commodities (row 1) + FX (row 2) */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <StatCard
            label="Gold (XAU/USD)"
            value={loading ? "—" : `$${data?.commodities.gold.price.toLocaleString()}`}
            badge={loading ? "—" : trendBadge(data?.commodities.gold.trend ?? "unchanged")}
            badgeVariant={trendVariant(data?.commodities.gold.trend ?? "unchanged")}
            chartData={data?.commodityHistory.gold}
            chartColor={COLORS.gold}
            valueFormatter={(v) => `$${v.toLocaleString()}`}
            loading={loading}
          />
          <StatCard
            label="Silver (XAG/USD)"
            value={loading ? "—" : `$${data?.commodities.silver.price.toFixed(2)}`}
            badge={loading ? "—" : trendBadge(data?.commodities.silver.trend ?? "unchanged")}
            badgeVariant={trendVariant(data?.commodities.silver.trend ?? "unchanged")}
            chartData={data?.commodityHistory.silver}
            chartColor={COLORS.silver}
            valueFormatter={(v) => `$${v.toFixed(2)}`}
            loading={loading}
          />
          <StatCard
            label="Coffee (KC1)"
            value={loading ? "—" : `$${data?.commodities.coffee.price.toFixed(2)}`}
            badge={loading ? "—" : trendBadge(data?.commodities.coffee.trend ?? "unchanged")}
            badgeVariant={trendVariant(data?.commodities.coffee.trend ?? "unchanged")}
            chartData={data?.commodityHistory.coffee}
            chartColor={COLORS.coffee}
            valueFormatter={(v) => `$${v.toFixed(2)}`}
            loading={loading}
          />
          <StatCard
            label="USD / ETB"
            value={loading ? "—" : (data?.fxRates.usd.rate.toFixed(2) ?? "—")}
            badge={loading ? "—" : trendBadge(data?.fxRates.usd.trend ?? "unchanged")}
            badgeVariant={trendVariant(data?.fxRates.usd.trend ?? "unchanged")}
            chartData={data?.fxRates.usd.history}
            chartColor={COLORS.usd}
            valueFormatter={(v) => v.toFixed(2)}
            loading={loading}
          />
          <StatCard
            label="EUR / ETB"
            value={loading ? "—" : (data?.fxRates.eur.rate.toFixed(2) ?? "—")}
            badge={loading ? "—" : trendBadge(data?.fxRates.eur.trend ?? "unchanged")}
            badgeVariant={trendVariant(data?.fxRates.eur.trend ?? "unchanged")}
            chartData={data?.fxRates.eur.history}
            chartColor={COLORS.eur}
            valueFormatter={(v) => v.toFixed(2)}
            loading={loading}
          />
          <StatCard
            label="CNY / ETB"
            value={loading ? "—" : (data?.fxRates.cny.rate.toFixed(2) ?? "—")}
            badge={loading ? "—" : trendBadge(data?.fxRates.cny.trend ?? "unchanged")}
            badgeVariant={trendVariant(data?.fxRates.cny.trend ?? "unchanged")}
            chartData={data?.fxRates.cny.history}
            chartColor={COLORS.cny}
            valueFormatter={(v) => v.toFixed(2)}
            loading={loading}
          />
        </motion.div>
      </div>
    </section>
  );
}
