"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PublicationCover } from "@/lib/mock-data";

const positionStyles = {
  center: { rotate: 0,  y: 0,  scale: 1    },
  left:   { rotate: -7, y: 24, scale: 0.88 },
  right:  { rotate:  7, y: 24, scale: 0.88 },
} as const;

type Slot = "left" | "center" | "right";

// Offset from the active index for each slot — reused regardless of how many
// slots are actually visible (see `slotLayoutFor`).
const slotOffset: Record<Slot, number> = { left: -1, center: 0, right: 1 };

// With 3+ items: full left/center/right wheel. With exactly 2 items there's
// no distinct "left" (it would just repeat the "right" item), so drop it —
// the active item takes center, the other one sits to the right, and they
// swap which is which on each advance.
function slotLayoutFor(count: number): Slot[] {
  return count >= 3 ? ["left", "center", "right"] : ["center", "right"];
}

const slotOverlap: Record<Slot, string> = {
  left:   "-mr-6 sm:-mr-10 md:-mr-12",
  center: "",
  right:  "-ml-6 sm:-ml-10 md:-ml-12",
};

const slotOverlapCompact: Record<Slot, string> = {
  left:   "-mr-4 sm:-mr-6 md:-mr-8",
  center: "",
  right:  "-ml-4 sm:-ml-6 md:-ml-8",
};

interface PublicationCoversProps {
  items: PublicationCover[];
  compact?: boolean;
}

function Cover({
  pub,
  compact,
  className,
  shadow,
}: {
  pub: PublicationCover;
  compact: boolean;
  className?: string;
  shadow: "sm" | "lg";
}) {
  return (
    <div className={cn("group flex-shrink-0 cursor-pointer", className)}>
      <div
        className={cn(
          "relative aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-border/20 transition-shadow duration-300",
          shadow === "lg" ? "shadow-2xl" : "shadow-md",
        )}
      >
        <Image
          src={pub.src}
          alt={pub.title}
          fill
          className="object-cover"
          sizes={compact
            ? "(max-width: 640px) 130px, (max-width: 768px) 160px, 195px"
            : "(max-width: 640px) 150px, (max-width: 768px) 190px, 220px"
          }
        />
        <div className="absolute inset-0 bg-navy-950/65 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <p className="text-xs font-semibold text-white leading-snug">{pub.subtitle}</p>
        </div>
      </div>
      <p className="mt-3 text-xs font-medium text-muted-foreground text-center leading-snug px-1">
        {pub.title}
      </p>
    </div>
  );
}

// Fanned card wheel — cycles through `items` one "active" card at a time,
// auto-advancing every 5s. Uses a left/center/right layout for 3+ items, or
// just center/right for exactly 2 (see `slotLayoutFor`).
function Wheel({ items, compact }: { items: PublicationCover[]; compact: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredSrc, setHoveredSrc] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const count = items.length;

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setActiveIndex((p) => (p + 1) % count), 5000);
    return () => clearInterval(id);
  }, [isPaused, count]);

  // Render in slot order so the center card is always physically in the
  // middle of the flex row.
  const displayOrder: [number, Slot][] = slotLayoutFor(count).map((slot) => [
    (activeIndex + slotOffset[slot] + count) % count,
    slot,
  ]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-end justify-center">
        {displayOrder.map(([pubIdx, slot]) => {
          const pub = items[pubIdx];
          const style = positionStyles[slot];
          const isHovered = hoveredSrc === pub.src;

          return (
            <motion.div
              key={pub.src}
              layout="position"
              animate={{ rotate: style.rotate, y: style.y, scale: style.scale }}
              whileHover={{ y: style.y - 10, scale: Math.max(style.scale, 1.04) }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                compact
                  ? "w-[130px] sm:w-[160px] md:w-[195px]"
                  : "w-[150px] sm:w-[190px] md:w-[220px]",
                compact ? slotOverlapCompact[slot] : slotOverlap[slot],
              )}
              style={{ zIndex: isHovered ? 30 : slot === "center" ? 10 : 0 }}
              onHoverStart={() => { setHoveredSrc(pub.src); setIsPaused(true); }}
              onHoverEnd={() => { setHoveredSrc(null); setIsPaused(false); }}
              onClick={() => setActiveIndex(pubIdx)}
            >
              <Cover pub={pub} compact={compact} shadow={slot === "center" ? "lg" : "sm"} />
            </motion.div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {items.map((pub, i) => (
          <button
            key={pub.src}
            onClick={() => setActiveIndex(i)}
            aria-label={`Show ${pub.title}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === activeIndex
                ? "bg-gold-500 w-4"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/60 w-1.5",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function PublicationCovers({ items, compact = false }: PublicationCoversProps) {
  return <Wheel items={items} compact={compact} />;
}
