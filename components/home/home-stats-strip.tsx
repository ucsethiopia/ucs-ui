"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const stats = [
  { value: 14, suffix: "+", label: "Years of Experience" },
  { value: 150, suffix: "+", label: "Projects Completed" },
  { value: 150, suffix: "+", label: "Clients Served" },
  { value: 5, suffix: "", label: "Countries Reached" },
];

/** Deceleration curve — fast start, slow finish */
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function AnimatedCounter({
  target,
  suffix = "",
  isVisible,
}: {
  target: number;
  suffix?: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  const prefersReducedMotion = useCallback(() => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    if (prefersReducedMotion()) {
      setCount(target);
      return;
    }

    const duration = 1800;
    let start: number | null = null;

    function tick(timestamp: number) {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);

      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible, target, prefersReducedMotion]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const DELAY_CLASSES = [
  "delay-0",
  "delay-100",
  "delay-200",
  "delay-300",
] as const;

export function HomeStatsStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-14 md:py-20 bg-secondary/40">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 sm:gap-x-8"
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
