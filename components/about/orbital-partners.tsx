"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Globe } from "lucide-react";
import Image from "next/image";
import { strategicPartners } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function PartnerNode({
  name,
  logo,
  country,
  isHovered,
  isGlobal,
  onHover,
  onLeave,
}: {
  name: string;
  logo: string;
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
        "relative -ml-9 -mt-9 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border bg-card/95 p-3 shadow-lg backdrop-blur-sm transition-colors duration-300",
        isHovered
          ? "border-gold-500"
          : isGlobal
            ? "border-gold-500/50"
            : "border-border"
      )}
      whileHover={{ scale: 1.15, zIndex: 10 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
    >
      {logo && !imgError ? (
        <div className="relative h-full w-full">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain"
            onError={() => setImgError(true)}
            sizes="80px"
          />
        </div>
      ) : (
        <span className="text-[10px] font-semibold text-muted-foreground tracking-wide">
          {initials}
        </span>
      )}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-14 left-1/2 z-50 w-28 -translate-x-1/2 rounded-md border border-gold-500/30 bg-card px-2.5 py-1.5 text-center shadow-xl"
        >
          <p className="text-[11px] font-semibold text-foreground leading-tight">
            {name}
          </p>
          {country && (
            <p className="text-[10px] text-gold-600">{country}</p>
          )}
        </motion.div>
      )}
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

  const innerRadius = 150;
  const outerRadius = 240;

  const getOrbitPosition = (
    index: number,
    total: number,
    radius: number
  ) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

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

      {/* Orbital visualization */}
      <div className="relative mx-auto flex h-[520px] w-full max-w-[520px] items-center justify-center">
        {/* Orbit rings — SVG */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="-260 -260 520 520"
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
            r={innerRadius}
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
            r={outerRadius}
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
          const pos = getOrbitPosition(
            index,
            localPartners.length,
            innerRadius
          );
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
          const pos = getOrbitPosition(
            index,
            overseasPartners.length,
            outerRadius
          );
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
