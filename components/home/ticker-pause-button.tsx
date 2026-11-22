"use client";

import { Pause, Play } from "lucide-react";
import { useMarqueeFocus } from "@/components/home/marquee-focus-provider";
import { cn } from "@/lib/utils";

/**
 * Pause/play control for both scrolling strips on the home page.
 *
 * Visible on phones, tablets and any touch screen. On a desktop with a mouse
 * (lg+ and a fine pointer) it stays visually hidden until reached with Tab,
 * like a skip link: mouse users pause by hovering, keyboard users still get a
 * way to stop the motion. Hidden entirely under reduced motion, where the
 * strips don't animate at all.
 */
export function TickerPauseButton() {
  const { motionPaused, toggleMotionPaused } = useMarqueeFocus();
  const label = motionPaused ? "Resume scrolling" : "Pause scrolling";
  const Icon = motionPaused ? Play : Pause;

  return (
    <button
      type="button"
      onClick={toggleMotionPaused}
      aria-label={label}
      title={label}
      className={cn(
        // Solid behind the icon, fading out leftward so ticker items slide
        // under it instead of butting against it.
        "absolute right-0 top-0 z-10 flex h-full w-16 items-center justify-end pr-4",
        "bg-gradient-to-l from-navy-950 from-55% to-transparent",
        "text-white/60 transition-colors hover:text-gold-400 focus-visible:text-gold-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-500",
        "lg:pointer-fine:not-focus-visible:sr-only",
        "motion-reduce:hidden",
      )}
    >
      <Icon className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} aria-hidden="true" />
    </button>
  );
}
