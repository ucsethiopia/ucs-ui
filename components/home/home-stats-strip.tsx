"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const stats = [
  { value: 14, suffix: "+", label: "Years of Experience" },
  { value: 150, suffix: "+", label: "Projects Completed" },
  { value: 500, suffix: "+", label: "Clients Served" },
  { value: 5, suffix: "", label: "Countries Reached" },
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
    const duration = 2000;
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

export function HomeStatsStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-10 md:py-16 bg-secondary/50">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14">
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "text-center transition-all duration-500",
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
              )}
              style={{
                transitionDelay: isInView ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className="mb-4">
                <div className="font-serif text-5xl sm:text-6xl font-bold text-gold-500">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    isVisible={isInView}
                  />
                </div>
              </div>
              <p className="text-lg text-muted-foreground font-medium">
                {stat.label}
              </p>
              <div className="h-1 w-12 bg-gold-500/30 mx-auto mt-4 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
