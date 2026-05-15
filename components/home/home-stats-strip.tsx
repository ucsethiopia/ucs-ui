"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { cn } from "@/lib/utils";

const stats = [
  { value: 14, suffix: "+", label: "Years of Experience" },
  { value: 250, suffix: "+", label: "BODs & Executives Trained" },
  { value: 4000, suffix: "+", label: "Managers Trained", format: true },
  { value: 5, suffix: "+", label: "Countries Reached" },
  { value: 25, suffix: "+", label: "Projects Completed" },
];

const DELAY_CLASSES = [
  "delay-0",
  "delay-100",
  "delay-200",
  "delay-300",
  "delay-400",
] as const;

export function HomeStatsStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-14 md:py-20 bg-secondary/40">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14">
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6 sm:gap-x-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "text-center transition-[opacity,transform] duration-600 ease-out",
                DELAY_CLASSES[index],
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6",
              )}
            >
              <p className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-gold-500">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isVisible={isInView}
                  format={stat.format}
                />
              </p>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground font-medium uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
