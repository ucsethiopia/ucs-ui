"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { servicePillars } from "@/lib/mock-data";
import { Container } from "@/components/shared/container";
import { ease, staggerContainer, staggerItem } from "@/lib/motion";

export function ServicesOverview() {
  return (
    <section style={{ paddingBlock: "var(--space-section-normal)" }}>
      <Container>
        {/* Section Header — left-aligned */}
        <motion.div
          className="mb-10 max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: ease.out }}
        >
          <h2
            className="font-serif font-bold text-foreground mb-4"
            style={{ fontSize: "var(--font-size-heading-1)" }}
          >
            Comprehensive Business Solutions
          </h2>
          <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "var(--font-size-body-lg)" }}>
            Integrated services across four key pillars to drive sustainable growth
            and organizational excellence.
          </p>
        </motion.div>

        {/* Editorial numbered list — 2 columns on desktop */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {servicePillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              variants={staggerItem}
              className="group py-8 border-t border-border"
            >
              <div className="flex gap-6">
                {/* Number */}
                <span
                  className="font-serif font-bold text-muted-foreground/20 flex-shrink-0 leading-none select-none"
                  style={{ fontSize: "var(--font-size-heading-2)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="min-w-0">
                  <h3
                    className="font-serif font-bold text-foreground mb-2 transition-colors group-hover:text-foreground/80"
                    style={{ fontSize: "var(--font-size-heading-3)" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {pillar.description}
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center text-sm font-semibold text-foreground transition-all hover:opacity-70"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
