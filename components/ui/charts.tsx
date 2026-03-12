"use client";

import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis } from "recharts";
import { cn } from "@/lib/utils";

// Skeleton Loader
export const Skeleton = ({
  className = "",
  variant = "rect",
}: {
  className?: string;
  variant?: "rect" | "circle" | "text";
}) => {
  const baseClasses = "animate-pulse bg-muted";
  const variantClasses = {
    rect: "rounded",
    circle: "rounded-full",
    text: "rounded h-4",
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} />
  );
};

// Mini Line Chart Component (for sparklines)
export const MiniLineChart = ({
  data,
  height = 80,
  color = "var(--color-gold-500)",
  showAxes = false,
  yTickFormatter,
}: {
  data: { date: string; value: number }[];
  height?: number;
  color?: string;
  showAxes?: boolean;
  yTickFormatter?: (value: number) => string;
}) => {
  if (!data || data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={
          showAxes
            ? { left: 8, right: 4, top: 6, bottom: 2 }
            : { left: 0, right: 0, top: 4, bottom: 0 }
        }
      >
        {showAxes ? (
          <>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={["dataMin", "dataMax"]}
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
              width={36}
              tickCount={3}
              tickFormatter={yTickFormatter}
            />
          </>
        ) : (
          <YAxis domain={["dataMin", "dataMax"]} hide />
        )}
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          animationDuration={800}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Bar Chart Component
export const BarChart = ({
  data,
  height = 120,
}: {
  data: { date: string; value: number }[];
  height?: number;
}) => {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end justify-between gap-1" style={{ height }}>
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <motion.div
            className="w-full bg-accent rounded-t"
            initial={{ height: 0 }}
            animate={{ height: `${(item.value / max) * 100}%` }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          />
          <span className="text-xs text-muted-foreground mt-1 truncate w-full text-center">
            {item.date}
          </span>
        </div>
      ))}
    </div>
  );
};
