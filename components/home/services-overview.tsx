"use client";

import React from "react"

import Link from "next/link";
import {
  Crown,
  Users,
  GraduationCap,
  Monitor,
  Calculator,
  Heart,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import { trainingPrograms } from "@/lib/mock-data";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Crown,
  Users,
  GraduationCap,
  Monitor,
  Calculator,
  Heart,
  Megaphone,
};

export function ServicesOverview() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
            Build Capabilities
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Training Programs
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Comprehensive learning programs designed to develop skills and enhance 
            performance across all levels of your organization.
          </p>
        </div>

        {/* Programs Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {trainingPrograms.map((program, index) => {
            const Icon = iconMap[program.icon] || GraduationCap;
            return (
              <Link
                key={program.id}
                href="/services#training"
                className={cn(
                  "group relative flex flex-col items-center text-center p-6 bg-card border border-border rounded-lg transition-all duration-500 hover:border-gold-500 hover:shadow-lg",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: isVisible ? `${index * 75}ms` : "0ms",
                }}
              >
                {/* Icon */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-white transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-gold-600 transition-colors">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {program.description}
                </p>

                {/* Learn More */}
                <span className="inline-flex items-center gap-1 text-sm font-medium text-navy-900 transition-all group-hover:text-gold-600 group-hover:gap-2 mt-auto">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
