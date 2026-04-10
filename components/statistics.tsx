"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { AnimatedCounter } from "@/components/shared/animated-counter";
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

export function Statistics() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section className="py-10 md:py-16 bg-secondary/50">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
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
