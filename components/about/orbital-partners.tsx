"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Globe } from "lucide-react";
import Image from "next/image";
import { strategicPartners } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  INNER_RADIUS,
  OUTER_RADIUS,
  innerRingOffset,
  outerRingOffset,
  orbitPosition,
} from "./orbit-layout";

function PartnerNode({
  name,
  logo,
  logoDark,
  country,
  isHovered,
  isGlobal,
  onHover,
  onLeave,
}: {
  name: string;
  logo: string;
  logoDark?: string;
  country?: string;
  isHovered: boolean;
  isGlobal?: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.div
      className={cn(
        "relative -ml-10 -mt-10 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border bg-card/95 p-3 shadow-lg backdrop-blur-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2",
        isHovered
          ? "border-gold-500"
          : isGlobal
            ? "border-gold-500/50"
            : "border-border"
      )}
      tabIndex={0}
      role="button"
      aria-label={`${name}${country ? `, ${country}` : ""}`}
      whileHover={{ scale: 1.15, zIndex: 10 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
    >
      {logo && !imgError ? (
        <div className="relative h-full w-full">
          <Image
            src={logo}
            alt={name}
            fill
            className={cn("object-contain", logoDark && "dark:hidden")}
            onError={() => setImgError(true)}
            sizes="80px"
          />
          {logoDark && (
            <Image
              src={logoDark}
              alt={name}
              fill
              className="object-contain hidden dark:block"
              sizes="80px"
            />
          )}
        </div>
      ) : (
        <span className="text-[10px] font-semibold text-muted-foreground tracking-wide">
          {initials}
        </span>
      )}
      {/* Name — always visible. Anchored by `top`, not `bottom`, so adding
          the hover-only location line below it grows the block downward
          instead of pushing the name upward into the icon. No box: a
          text-shadow halo (matched to the page background) keeps it legible
          over the orbit lines and any node it happens to sit close to. */}
      <div className="absolute left-1/2 top-full z-20 mt-2 w-28 -translate-x-1/2 text-center">
        <p
          className="text-[11px] font-semibold text-foreground leading-tight"
          style={{ textShadow: "0 0 5px var(--background), 0 0 5px var(--background), 0 0 5px var(--background)" }}
        >
          {name}
        </p>
        {/* Location — hover only */}
        {isHovered && country && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] text-gold-600"
            style={{ textShadow: "0 0 5px var(--background), 0 0 5px var(--background), 0 0 5px var(--background)" }}
          >
            {country}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export function OrbitalPartners() {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

  const localPartners = strategicPartners.filter(
    (p) => p.partnerType === "local"
  );
  const overseasPartners = strategicPartners.filter(
    (p) => p.partnerType === "overseas"
  );

  const innerOffset = innerRingOffset(localPartners.length);
  const outerOffset = outerRingOffset(localPartners.length, overseasPartners.length);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-secondary/30 overflow-hidden">
      <div className="text-center mb-6">
        <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">
          Strategic Partnerships
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
          Global Network
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          We partner with established consulting firms and multidisciplinary
          experts from around the world to deliver exceptional results
        </p>
      </div>

      {/* Orbital visualization — the diagram is 640×720 unscaled (see
          orbit-layout.ts: ±320 wide for the outer nodes,
          ±360 tall so the bottom node's label clears the legend). The layout
          box height is that 720 × each breakpoint's `scale`, so it shrinks
          with the visual instead of leaving dead space on mobile. */}
      <div className="relative mx-auto flex h-[396px] w-full max-w-[640px] items-center justify-center scale-[0.55] sm:h-[540px] sm:scale-75 md:h-[720px] md:scale-100 origin-center">
        {/* Orbit rings — fixed pixel size with a 1:1 viewBox, so the rings
            pass exactly through the nodes at every breakpoint (previously
            the SVG stretched to the box and drew the rings ~23% too large). */}
        <svg
          className="absolute left-1/2 top-1/2 h-[720px] w-[640px] -translate-x-1/2 -translate-y-1/2"
          viewBox="-320 -360 640 720"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient
              id="orbitStroke"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="var(--gold-500)"
                stopOpacity="0.08"
              />
              <stop
                offset="50%"
                stopColor="var(--gold-500)"
                stopOpacity="0.2"
              />
              <stop
                offset="100%"
                stopColor="var(--gold-500)"
                stopOpacity="0.08"
              />
            </linearGradient>
          </defs>

          {/* Inner orbit */}
          <motion.circle
            cx="0"
            cy="0"
            r={INNER_RADIUS}
            fill="none"
            stroke="url(#orbitStroke)"
            strokeWidth="1"
            strokeDasharray="4 6"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          />

          {/* Outer orbit */}
          <motion.circle
            cx="0"
            cy="0"
            r={OUTER_RADIUS}
            fill="none"
            stroke="url(#orbitStroke)"
            strokeWidth="1"
            strokeDasharray="4 6"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* Center hub */}
        <motion.div
          className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold-500/30 bg-card shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 rounded-full bg-gold-500/5 blur-xl" />
          <Globe
            className="relative z-10 h-9 w-9 text-gold-500"
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Inner ring — Local partners */}
        {localPartners.map((partner, index) => {
          const pos = orbitPosition(index, localPartners.length, INNER_RADIUS, innerOffset);
          return (
            <motion.div
              key={`local-${partner.id}`}
              className="absolute"
              style={{ left: "50%", top: "50%", zIndex: hoveredPartner === partner.name ? 20 : 1 }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={inView ? { x: pos.x, y: pos.y, opacity: 1 } : { x: 0, y: 0, opacity: 0 }}
              transition={{
                x: { duration: 1.2, delay: index * 0.1 },
                y: { duration: 1.2, delay: index * 0.1 },
                opacity: { duration: 0.5, delay: index * 0.1 },
              }}
            >
              <PartnerNode
                name={partner.name}
                logo={partner.logo}
                logoDark={partner.logoDark}
                country={partner.country}
                isHovered={hoveredPartner === partner.name}
                onHover={() => setHoveredPartner(partner.name)}
                onLeave={() => setHoveredPartner(null)}
              />
            </motion.div>
          );
        })}

        {/* Outer ring — Overseas/Global partners */}
        {overseasPartners.map((partner, index) => {
          const pos = orbitPosition(index, overseasPartners.length, OUTER_RADIUS, outerOffset);
          return (
            <motion.div
              key={`overseas-${partner.id}`}
              className="absolute"
              style={{ left: "50%", top: "50%", zIndex: hoveredPartner === partner.name ? 20 : 1 }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={inView ? { x: pos.x, y: pos.y, opacity: 1 } : { x: 0, y: 0, opacity: 0 }}
              transition={{
                x: { duration: 1.5, delay: 0.4 + index * 0.12 },
                y: { duration: 1.5, delay: 0.4 + index * 0.12 },
                opacity: { duration: 0.5, delay: 0.4 + index * 0.12 },
              }}
            >
              <PartnerNode
                name={partner.name}
                logo={partner.logo}
                logoDark={partner.logoDark}
                country={partner.country}
                isHovered={hoveredPartner === partner.name}
                isGlobal
                onHover={() => setHoveredPartner(partner.name)}
                onLeave={() => setHoveredPartner(null)}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 flex justify-center gap-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-primary/30 border border-primary/50" />
          <span>Local Partners</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-gold-500/40 border border-gold-500/60" />
          <span>Overseas Partners</span>
        </div>
      </div>
    </section>
  );
}
