"use client";

import { motion } from "framer-motion";
import { vision, mission } from "@/lib/mock-data";
import { ease } from "@/lib/motion";

export function VisionMissionTabs() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 py-8"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: ease.out }}
    >
      {/* Mission */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Driving Change
        </p>
        <h3
          className="font-serif font-bold text-foreground mb-4"
          style={{ fontSize: "var(--font-size-heading-2)" }}
        >
          Our Mission
        </h3>
        <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "var(--font-size-body-lg)" }}>
          {mission}
        </p>
      </div>

      {/* Divider — vertical on md+, horizontal on mobile */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />

      {/* Vision */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Shaping the Future
        </p>
        <h3
          className="font-serif font-bold text-foreground mb-4"
          style={{ fontSize: "var(--font-size-heading-2)" }}
        >
          Our Vision
        </h3>
        <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "var(--font-size-body-lg)" }}>
          {vision}
        </p>
      </div>
    </motion.div>
  );
}
