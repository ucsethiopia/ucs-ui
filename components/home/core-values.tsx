"use client";

import React from "react";
import { motion } from "framer-motion";
import { coreValues } from "@/lib/mock-data";
import { Container } from "@/components/shared/container";
import { ease, staggerContainer, staggerItem } from "@/lib/motion";

export function CoreValues() {
  return (
    <section style={{ paddingBlock: "var(--space-section-normal)" }}>
      <Container>
        {/* Section Header */}
        <motion.div
          className="max-w-xl mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: ease.out }}
        >
          <h2
            className="font-serif font-bold text-foreground mb-4"
            style={{ fontSize: "var(--font-size-heading-1)" }}
          >
            The Values That Guide Us
          </h2>
          <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "var(--font-size-body-lg)" }}>
            Our core values shape every engagement, every recommendation, and
            every relationship we build.
          </p>
        </motion.div>

        {/* Values as glossary-style definition list — title left, description right */}
        <motion.div
          className="divide-y divide-border"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {coreValues.map((value) => (
            <motion.div
              key={value.id}
              variants={staggerItem}
              className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2 sm:gap-8 py-6"
            >
              <h3 className="font-serif font-bold text-foreground" style={{ fontSize: "var(--font-size-heading-3)" }}>
                {value.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
