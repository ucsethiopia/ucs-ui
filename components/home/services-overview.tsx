"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Lightbulb,
  FileSearch,
  Megaphone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { servicePillars } from "@/lib/mock-data";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Training: GraduationCap,
  Advisory: Lightbulb,
  "Research & Publication": FileSearch,
  "Communication & Promotion": Megaphone,
};

export function ServicesOverview() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-secondary/30 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
            Our Expertise
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Comprehensive Business Solutions
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We provide integrated services across four key pillars to drive
            sustainable growth and organizational excellence for Ethiopian
            enterprises.
          </p>
        </div>

        {/* Service Pillars Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {servicePillars.map((pillar, index) => {
            const Icon = iconMap[pillar.title] || GraduationCap;
            return (
              <div
                key={pillar.id}
                className={cn(
                  "group relative bg-card border border-border rounded-xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:border-gold-500/50 hover:-translate-y-1",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8",
                )}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                {/* Header with Icon */}
                <div className="relative p-6 pb-4 border-b border-border/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-gold-500 group-hover:text-navy-950 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-gold-600 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 text-justify">
                    {pillar.description}
                  </p>
                </div>

                {/* Offerings List */}
                <div className="flex-grow p-6 pt-4">
                  <ul className="space-y-2.5">
                    {pillar.offerings.slice(0, 5).map((offering, i) => (
                      <li
                        key={i}
                        className="flex items-start text-xs text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{offering}</span>
                      </li>
                    ))}
                    {pillar.offerings.length > 5 && (
                      <li className="flex items-start text-xs text-muted-foreground/60 italic">
                        <span className="ml-5">
                          +{pillar.offerings.length - 5} more
                        </span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Action Link */}
                <div className="p-6 pt-4 border-t border-border/50">
                  <Link
                    href="/services"
                    className="inline-flex items-center text-sm font-semibold text-foreground group-hover:text-gold-600 transition-all"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Hover Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-gold-600 transition-colors"
          >
            View All Services & Offerings
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
