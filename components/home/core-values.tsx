"use client";

import React from "react";

import { Users2, BadgeCheck, Zap, Target, Scale } from "lucide-react";
import { coreValues } from "@/lib/mock-data";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Synergy:    Users2,
  Provision:  BadgeCheck,
  Enthusiasm: Zap,
  Endurance:  Target,
  Dedication: Scale,
};

export function CoreValues() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-background">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
            Our Foundation
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            The Values That Guide Us
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our core values shape every engagement, every recommendation, and
            every relationship we build with our clients.
          </p>
        </div>

        {/* Values Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {coreValues.map((value, index) => {
            const Icon = iconMap[value.title] || Users2;
            return (
              <div
                key={value.id}
                className={cn(
                  "group relative p-6 bg-card border border-border rounded-lg transition-all duration-300 hover:border-gold-500/30 hover:shadow-xl hover:-translate-y-1",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8",
                )}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-500 ring-1 ring-gold-500/20 transition-colors group-hover:bg-gold-500/20">
                  <Icon className="h-8 w-8" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                  {value.description}
                </p>

                {/* Decorative Element */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gold-500 transition-all duration-300 group-hover:w-full rounded-b-lg" />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
