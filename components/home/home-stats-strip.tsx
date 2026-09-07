"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { cn } from "@/lib/utils";

const stats = [
  { value: 5, suffix: "+", label: "Countries Reached" },
  { value: 25, suffix: "+", label: "Consultancy Projects Completed" },
  { value: 300, suffix: "+", label: "BoDs & Executives Trained" },
  { value: 1500, suffix: "+", label: "IT Experts Trained", format: true },
  { value: 5000, suffix: "+", label: "Managers Trained", format: true },
  { value: 6000, suffix: "+", label: "Professionals Trained", format: true },
];

const DELAY_CLASSES = [
  "delay-0",
  "delay-100",
  "delay-200",
  "delay-300",
  "delay-400",
  "delay-500",
] as const;

// Even index = large (big numbers), odd index = small (small numbers)
const FONT_SIZES = [
  "text-5xl sm:text-6xl",
  "text-4xl sm:text-5xl",
  "text-5xl sm:text-6xl",
  "text-4xl sm:text-5xl",
  "text-5xl sm:text-6xl",
  "text-4xl sm:text-5xl",
] as const;

interface HomeStatsStripProps {
  showHeader?: boolean;
}

export function HomeStatsStrip({ showHeader = false }: HomeStatsStripProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-14 md:py-20 bg-secondary/40">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14">
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
              Our Impact
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Measurable Results, Real Impact
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our track record speaks to our commitment to excellence and client
              success across Ethiopia and the region.
            </p>
          </div>
        )}
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4 sm:gap-x-6"
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
              <p className={cn("font-serif font-bold tracking-tight text-gold-500", FONT_SIZES[index])}>
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isVisible={isInView}
                  format={stat.format}
                />
              </p>
              <p className="mt-3 text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
