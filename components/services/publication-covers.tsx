"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const publications = [
  {
    src: "/publications/awash-25th-anniversary.png",
    title: "25th Anniversary Book",
    subtitle: "Awash Bank & Insurance — 1994–2019",
  },
  {
    src: "/publications/awash-30th-anniversary.png",
    title: "30th Anniversary Book",
    subtitle: "Awash Bank & Insurance — 1994–2024",
  },
  {
    src: "/publications/oda.png",
    title: "Oda Company Profile",
    subtitle: "Oda Animal Feed Processing Factory",
  },
];

const positionStyles = {
  center: { rotate: 0,  y: 0,  scale: 1    },
  left:   { rotate: -7, y: 24, scale: 0.88 },
  right:  { rotate:  7, y: 24, scale: 0.88 },
} as const;

type Slot = "left" | "center" | "right";

const slotOverlap: Record<Slot, string> = {
  left:   "-mr-6 sm:-mr-10 md:-mr-12",
  center: "",
  right:  "-ml-6 sm:-ml-10 md:-ml-12",
};

export function PublicationCovers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredPub, setHoveredPub] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setActiveIndex((p) => (p + 1) % 3), 5000);
    return () => clearInterval(id);
  }, [isPaused]);

  // Render in [left, center, right] slot order so the center card is always
  // physically in the middle of the flex row.
  const displayOrder: [number, Slot][] = [
    [(activeIndex + 2) % 3, "left"],
    [activeIndex,            "center"],
    [(activeIndex + 1) % 3, "right"],
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-end justify-center">
        {displayOrder.map(([pubIdx, slot]) => {
          const pub = publications[pubIdx];
          const style = positionStyles[slot];
          const isHovered = hoveredPub === pub.src;

          return (
            <motion.div
              key={pub.src}
              layout="position"
              animate={{ rotate: style.rotate, y: style.y, scale: style.scale }}
              whileHover={{ y: style.y - 10, scale: Math.max(style.scale, 1.04) }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "group flex-shrink-0 w-[150px] sm:w-[190px] md:w-[220px] cursor-pointer",
                slotOverlap[slot],
              )}
              style={{ zIndex: isHovered ? 30 : slot === "center" ? 10 : 0 }}
              onHoverStart={() => { setHoveredPub(pub.src); setIsPaused(true); }}
              onHoverEnd={() => { setHoveredPub(null); setIsPaused(false); }}
              onClick={() => setActiveIndex(pubIdx)}
            >
              <div
                className={cn(
                  "relative aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-border/20 transition-shadow duration-300",
                  slot === "center" ? "shadow-2xl" : "shadow-md",
                )}
              >
                <Image
                  src={pub.src}
                  alt={pub.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 150px, (max-width: 768px) 190px, 220px"
                />
                <div className="absolute inset-0 bg-navy-950/65 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-xs font-semibold text-white leading-snug">{pub.subtitle}</p>
                </div>
              </div>
              <p className="mt-3 text-xs font-medium text-muted-foreground text-center leading-snug px-1">
                {pub.title}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {publications.map((pub, i) => (
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
