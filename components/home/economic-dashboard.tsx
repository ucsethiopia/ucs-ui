"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus, Radio } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import {
  exchangeRates,
  economicIndicators,
  simulateApiDelay,
  type ExchangeRate,
  type EconomicIndicator,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function TrendIcon({ change }: { change: number }) {
  if (change > 0) return <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />;
  if (change < 0) return <TrendingDown className="h-3.5 w-3.5 text-red-500" />;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
}

function Sparkline({ data }: { data: number[] }) {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <div className="h-8 w-20 hidden lg:block">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-gold-500)"
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ExchangeRateCard({ rate, isLoading }: { rate: ExchangeRate; isLoading: boolean }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 lg:px-6">
      {isLoading ? (
        <div className="h-10 w-32 animate-pulse rounded bg-muted" />
      ) : (
        <>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-medium">{rate.pair}</span>
            <span className="text-lg font-semibold text-foreground">{rate.rate.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendIcon change={rate.change} />
            <span
              className={cn(
                "text-xs font-medium",
                rate.change > 0 && "text-emerald-500",
                rate.change < 0 && "text-red-500",
                rate.change === 0 && "text-muted-foreground"
              )}
            >
              {rate.change >= 0 ? "+" : ""}
              {rate.changePercent.toFixed(2)}%
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function IndicatorCard({
  indicator,
  isLoading,
}: {
  indicator: EconomicIndicator;
  isLoading: boolean;
}) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 lg:px-6">
      {isLoading ? (
        <div className="h-10 w-40 animate-pulse rounded bg-muted" />
      ) : (
        <>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-medium">{indicator.name}</span>
            <span className="text-lg font-semibold text-foreground">{indicator.value}</span>
          </div>
          <div className="flex items-center gap-2">
            {indicator.change !== 0 && (
              <div className="flex items-center gap-1">
                <TrendIcon change={indicator.change} />
                <span
                  className={cn(
                    "text-xs font-medium",
                    indicator.change > 0 && "text-emerald-500",
                    indicator.change < 0 && "text-red-500"
                  )}
                >
                  {indicator.change > 0 ? "+" : ""}
                  {indicator.change}%
                </span>
              </div>
            )}
            <Sparkline data={indicator.history} />
          </div>
        </>
      )}
    </div>
  );
}

export function EconomicDashboard() {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [indicators, setIndicators] = useState<EconomicIndicator[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [ratesData, indicatorsData] = await Promise.all([
        simulateApiDelay(exchangeRates, 600),
        simulateApiDelay(economicIndicators, 800),
      ]);
      setRates(ratesData);
      setIndicators(indicatorsData);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <section className="bg-card border-y border-border">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Live Indicator */}
          <div className="flex items-center gap-2 px-4 py-3 lg:px-6 lg:border-r border-border">
            <div className="flex items-center gap-2">
              <Radio className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                Live
              </span>
            </div>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Market Data
            </span>
          </div>

          {/* Exchange Rates */}
          <div className="flex flex-wrap lg:flex-nowrap divide-x divide-border border-t lg:border-t-0 border-border">
            {(isLoading ? [{}, {}, {}] : rates).map((rate, index) => (
              <ExchangeRateCard
                key={isLoading ? index : (rate as ExchangeRate).pair}
                rate={rate as ExchangeRate}
                isLoading={isLoading}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="hidden lg:block h-12 w-px bg-border" />

          {/* Economic Indicators */}
          <div className="flex flex-wrap lg:flex-nowrap divide-x divide-border border-t lg:border-t-0 border-border">
            {(isLoading ? [{}, {}] : indicators).map((indicator, index) => (
              <IndicatorCard
                key={isLoading ? index : (indicator as EconomicIndicator).name}
                indicator={indicator as EconomicIndicator}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
