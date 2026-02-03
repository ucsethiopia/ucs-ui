"use client";

import React from "react";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  GraduationCap,
  Compass,
  BookOpen,
  Megaphone,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/shared/page-hero";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { servicePillars } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Training: GraduationCap,
  Advisory: Compass,
  "Research & Publication": BookOpen,
  "Communication & Promotion": Megaphone,
};

function ServiceSection({
  pillar,
  index,
  isReversed,
}: {
  pillar: (typeof servicePillars)[0];
  index: number;
  isReversed: boolean;
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  });

  const Icon = iconMap[pillar.title] || GraduationCap;
  const sectionId = pillar.title.toLowerCase().replace(/[^a-z]/g, "");

  return (
    <section
      id={sectionId}
      className={cn(
        "py-24 lg:py-32",
        index % 2 === 0 ? "bg-background" : "bg-secondary/50",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700",
            isReversed && "lg:flex-row-reverse",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {/* Image */}
          <div
            className={cn(
              "relative aspect-4/3 rounded-lg overflow-hidden bg-muted",
              isReversed && "lg:order-2",
            )}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop')`,
              }}
            />
            {/* Icon Badge */}
            <div className="absolute top-6 left-6 flex h-14 w-14 items-center justify-center rounded-lg bg-gold-500 text-navy-950 shadow-lg">
              <Icon className="h-7 w-7" />
            </div>
          </div>

          {/* Content */}
          <div className={cn(isReversed && "lg:order-1")}>
            <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
              Service Pillar
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              {pillar.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {pillar.description}
            </p>

            {/* Offerings List */}
            <ul className="space-y-3 mb-8">
              {pillar.offerings.map((offering) => (
                <li key={offering} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500/10">
                      <Check className="h-3 w-3 text-gold-600" />
                    </div>
                  </div>
                  <span className="text-foreground">{offering}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-all hover:text-gold-600 hover:gap-3"
            >
              Inquire About This Service
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="What We Do"
          title="Our Services"
          description="Comprehensive solutions to help your organization achieve its strategic objectives and build lasting capabilities."
        />

        {/* Services Overview */}
        <section className="py-16 bg-background border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {servicePillars.map((pillar) => {
                const Icon = iconMap[pillar.title] || GraduationCap;
                const sectionId = pillar.title
                  .toLowerCase()
                  .replace(/[^a-z]/g, "");
                return (
                  <a
                    key={pillar.id}
                    href={`#${sectionId}`}
                    className="group flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card transition-all hover:border-gold-500 hover:shadow-lg"
                  >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-semibold text-foreground group-hover:text-gold-600 transition-colors">
                      {pillar.title}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service Sections */}
        {servicePillars.map((pillar, index) => (
          <ServiceSection
            key={pillar.id}
            pillar={pillar}
            index={index}
            isReversed={index % 2 === 1}
          />
        ))}

        {/* CTA Section */}
        <section className="py-24 lg:py-32 bg-navy-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
              Ready to Transform Your Organization?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Let{"'"}s discuss how UCS Ethiopia can help you achieve your
              strategic objectives and build lasting capabilities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold-500 px-8 py-4 text-base font-semibold text-navy-950 transition-all hover:bg-gold-400 hover:gap-3"
            >
              Get in Touch
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
