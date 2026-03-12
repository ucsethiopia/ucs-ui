"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Compass,
  BookOpen,
  Megaphone,
  Users,
  TrendingUp,
  Target,
  Lightbulb,
  BarChart3,
  FileText,
  Briefcase,
  Zap,
} from "lucide-react";

interface PillarVisualProps {
  pillar: string;
  className?: string;
}

const pillarConfig: Record<
  string,
  {
    gradient: string;
    icons: React.ComponentType<{ className?: string }>[];
    pattern: "orbit" | "grid" | "flow" | "scatter";
  }
> = {
  Training: {
    gradient: "from-gold-500/20 via-gold-500/5 to-transparent",
    icons: [GraduationCap, Users, Lightbulb, Target],
    pattern: "orbit",
  },
  Advisory: {
    gradient: "from-navy-500/20 via-navy-500/5 to-transparent",
    icons: [Compass, TrendingUp, Target, Briefcase],
    pattern: "grid",
  },
  "Research & Publication": {
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    icons: [BookOpen, BarChart3, FileText, Lightbulb],
    pattern: "flow",
  },
  "Communication & Promotion": {
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
    icons: [Megaphone, Zap, Users, Target],
    pattern: "scatter",
  },
};

// Orbit pattern - icons travelling in a true circular path around center
function OrbitPattern({
  icons,
}: {
  icons: React.ComponentType<{ className?: string }>[];
}) {
  const RADIUS = 85;

  const orbitConfigs = [
    { startDeg: 0, duration: 18 },
    { startDeg: 120, duration: 24 },
    { startDeg: 240, duration: 30 },
  ];

  function circleKeyframes(startDeg: number) {
    const rad = (d: number) => (d * Math.PI) / 180;
    const angles = [
      startDeg,
      startDeg + 90,
      startDeg + 180,
      startDeg + 270,
      startDeg + 360,
    ];
    return {
      x: angles.map((d) => RADIUS * Math.cos(rad(d))),
      y: angles.map((d) => RADIUS * Math.sin(rad(d))),
      times: [0, 0.25, 0.5, 0.75, 1] as number[],
    };
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Decorative rings */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute w-[180px] h-[180px] rounded-full border border-gold-500/25"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute w-[120px] h-[120px] rounded-full border border-gold-500/15"
      />

      {/* Center icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 180 }}
        className="absolute z-10 w-16 h-16 rounded-2xl bg-gold-500 flex items-center justify-center shadow-lg"
      >
        {React.createElement(icons[0], {
          className: "w-8 h-8 text-navy-950",
        })}
      </motion.div>

      {/* Orbiting icons — true circular path via x/y keyframes */}
      {icons.slice(1).map((Icon, index) => {
        const cfg = orbitConfigs[index];
        const { x, y, times } = circleKeyframes(cfg.startDeg);

        return (
          <motion.div
            key={index}
            className="absolute w-10 h-10 rounded-xl bg-background border border-border shadow-sm flex items-center justify-center"
            initial={{ x: x[0], y: y[0] }}
            animate={{ x, y }}
            transition={{
              x: { duration: cfg.duration, repeat: Infinity, ease: "linear", times },
              y: { duration: cfg.duration, repeat: Infinity, ease: "linear", times },
            }}
          >
            <Icon className="w-5 h-5 text-gold-600" />
          </motion.div>
        );
      })}
    </div>
  );
}

// Grid pattern - structured layout
function GridPattern({
  icons,
}: {
  icons: React.ComponentType<{ className?: string }>[];
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
      <div className="grid grid-cols-2 gap-4 w-full max-w-[200px]">
        {icons.map((Icon, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            className={`
              aspect-square rounded-xl flex items-center justify-center shadow-sm
              ${index === 0 ? "bg-gold-500 text-navy-950" : "bg-background border border-border text-foreground"}
            `}
          >
            <Icon className={`w-6 h-6 ${index === 0 ? "" : "text-gold-600"}`} />
          </motion.div>
        ))}
      </div>

      {/* Connecting lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -1 }}
      >
        <motion.line
          x1="35%"
          y1="35%"
          x2="65%"
          y2="35%"
          stroke="currentColor"
          strokeWidth="1"
          className="text-border"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.line
          x1="35%"
          y1="35%"
          x2="35%"
          y2="65%"
          stroke="currentColor"
          strokeWidth="1"
          className="text-border"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
      </svg>
    </div>
  );
}

// Flow pattern - cascading elements
function FlowPattern({
  icons,
}: {
  icons: React.ComponentType<{ className?: string }>[];
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="flex flex-col gap-3 items-center">
        {icons.map((Icon, index) => (
          <motion.div
            key={index}
            initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
              type: "spring",
              stiffness: 100,
            }}
            className={`
              flex items-center gap-3 px-4 py-2 rounded-lg
              ${index === 0 ? "bg-gold-500 text-navy-950" : "bg-background border border-border"}
            `}
          >
            <Icon className={`w-5 h-5 ${index === 0 ? "" : "text-gold-600"}`} />
            <motion.div
              className={`h-1 rounded-full ${index === 0 ? "bg-navy-950/30" : "bg-gold-500/30"}`}
              initial={{ width: 0 }}
              animate={{ width: 40 + index * 10 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Flow lines */}
      <motion.div
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/20 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
}

// Scatter pattern - dynamic floating elements
function ScatterPattern({
  icons,
}: {
  icons: React.ComponentType<{ className?: string }>[];
}) {
  const positions = [
    { x: "20%", y: "25%", delay: 0 },
    { x: "70%", y: "20%", delay: 0.1 },
    { x: "30%", y: "65%", delay: 0.2 },
    { x: "65%", y: "70%", delay: 0.3 },
  ];

  return (
    <div className="relative w-full h-full">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: [0, -8, 0],
          }}
          transition={{
            scale: { duration: 0.4, delay: positions[index].delay },
            opacity: { duration: 0.4, delay: positions[index].delay },
            y: {
              duration: 3 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: positions[index].delay,
            },
          }}
          className={`
            absolute w-12 h-12 rounded-xl flex items-center justify-center shadow-sm
            ${index === 0 ? "bg-gold-500 text-navy-950 w-14 h-14" : "bg-background border border-border"}
          `}
          style={{
            left: positions[index].x,
            top: positions[index].y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Icon
            className={`${index === 0 ? "w-7 h-7" : "w-5 h-5 text-gold-600"}`}
          />
        </motion.div>
      ))}

      {/* Connection dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-gold-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
        />
      ))}
    </div>
  );
}

export function PillarVisual({ pillar, className }: PillarVisualProps) {
  const config = pillarConfig[pillar] || pillarConfig["Training"];

  const PatternComponent = {
    orbit: OrbitPattern,
    grid: GridPattern,
    flow: FlowPattern,
    scatter: ScatterPattern,
  }[config.pattern];

  return (
    <div
      className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-muted/50 ${className}`}
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-radial ${config.gradient}`}
      />

      {/* Pattern */}
      <PatternComponent icons={config.icons} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  );
}
