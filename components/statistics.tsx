"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

const stats: StatItem[] = [
  { value: 14, label: "Years of Experience", suffix: "+" },
  { value: 150, label: "Projects Completed", suffix: "+" },
  { value: 150, label: "Clients Served", suffix: "+" },
  { value: 5, label: "Countries Reached", suffix: "" },
];

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
  const [count, setCount] = useState<number | null>(null);
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

  if (count === null) {
    return <span className="invisible">{target}{suffix}</span>;
  }

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="border-t border-border" style={{ paddingBlock: "var(--space-section-normal)" }}>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14">
        {/* Section Header — left-aligned */}
        <div className="max-w-xl mb-10">
          <h2
            className="font-serif font-bold text-foreground mb-4"
            style={{ fontSize: "var(--font-size-heading-1)" }}
          >
            Measurable Results, Real Impact
          </h2>
          <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "var(--font-size-body-lg)" }}>
            Our track record speaks to our commitment to excellence and client
            success across Ethiopia and the region.
          </p>
        </div>

        {/* Statistics Grid — left-aligned with vertical dividers */}
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "text-left transition-[opacity,transform] duration-600 ease-out lg:border-r lg:last:border-r-0 border-border lg:pr-6",
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6",
              )}
              style={{
                transitionDelay: isInView ? `${index * 80}ms` : "0ms",
              }}
            >
              <p
                className="font-serif font-bold tracking-tight text-foreground tabular-nums"
                style={{ fontSize: "var(--font-size-heading-1)" }}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isVisible={isInView}
                />
              </p>
              <p className="mt-1 text-sm text-muted-foreground font-medium uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
