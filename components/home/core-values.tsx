"use client";

import React from "react";

import { Shield, Star, Users, Lightbulb, Target } from "lucide-react";
import { coreValues } from "@/lib/mock-data";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Integrity: Shield,
  Excellence: Star,
  Collaboration: Users,
  Innovation: Lightbulb,
  "Client Focus": Target,
};

export function CoreValues() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-background">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
            const Icon = iconMap[value.title] || Shield;
            return (
              <div
                key={value.id}
                className={cn(
                  "group relative p-6 bg-card border border-border rounded-lg transition-all duration-500 hover:border-gold-500/50 hover:shadow-lg",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8",
                )}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-gold-500/10 group-hover:text-gold-600">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
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
