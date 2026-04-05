"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Zap, Eye } from "lucide-react";
import { vision, mission } from "@/lib/mock-data";

const tabs = [
  {
    id: "mission",
    label: "Our Mission",
    icon: Zap,
    content: mission,
    accent: "Driving Change",
  },
  {
    id: "vision",
    label: "Our Vision",
    icon: Eye,
    content: vision,
    accent: "Shaping the Future",
  },
] as const;

export function VisionMissionTabs() {
  const [activeTab, setActiveTab] = useState<string>("mission");
  const active = tabs.find((t) => t.id === activeTab) ?? tabs[0];
  const ActiveIcon = active.icon;

  return (
    <div className="w-full">
      {/* Tab triggers */}
      <div className="flex gap-1 p-1 rounded-lg bg-muted/60 w-fit mx-auto mb-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "text-navy-950"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="vm-tab-indicator"
                  className="absolute inset-0 bg-card rounded-md shadow-sm border border-border"
                  transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div className="relative min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start"
          >
            {/* Icon block */}
            <div className="hidden md:flex flex-col items-center gap-3 pt-1">
              <div className="w-14 h-14 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                <ActiveIcon className="h-7 w-7 text-gold-500" />
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-gold-500/30 to-transparent" />
            </div>

            {/* Text content */}
            <div>
              <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-2">
                {active.accent}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {active.label}
              </h3>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                {active.content}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
