"use client";

import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

const stats: StatItem[] = [
  { value: 15, label: "Years of Experience", suffix: "+" },
  { value: 150, label: "Projects Completed", suffix: "+" },
  { value: 500, label: "Clients Served", suffix: "+" },
  { value: 5, label: "Countries Reached", suffix: "" },
];

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

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function Statistics() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section className="py-24 lg:py-32 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        {/* Statistics Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "text-center transition-all duration-500",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
              )}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              {/* Counter Value */}
              <div className="mb-4">
                <div className="font-serif text-5xl sm:text-6xl font-bold text-gold-500">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    isVisible={isVisible}
                  />
                </div>
              </div>

              {/* Label */}
              <p className="text-lg text-muted-foreground font-medium">
                {stat.label}
              </p>

              {/* Decorative line */}
              <div className="h-1 w-12 bg-gold-500/30 mx-auto mt-4 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
