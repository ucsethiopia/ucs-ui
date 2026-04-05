/**
 * Centralized motion configuration for the UCS UI overhaul.
 *
 * Use these constants instead of defining inline animation props.
 * All reveal animations use y: 16, duration 0.5s, ease-out.
 * Stagger containers cap total delay at ~0.4s.
 */

import type { Transition, Variants } from "framer-motion";

/* ── Easing curves ─────────────────────────────────────────────── */

export const ease = {
  /** Custom ease-out — the existing easing used across the site */
  out: [0.22, 1, 0.36, 1] as const,
  /** Exponential ease-out (quart) — for emphasis */
  outQuart: [0.25, 1, 0.5, 1] as const,
  /** Spring config — for layout transitions */
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
};

/* ── Reveal (single element entering) ──────────────────────────── */

export const reveal = {
  initial: { opacity: 0, y: 16 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.5, ease: ease.out } satisfies Transition,
};

/** whileInView preset — spread onto a motion element */
export const revealInView = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.5, ease: ease.out } satisfies Transition,
};

/* ── Stagger (parent + children) ───────────────────────────────── */

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: ease.out },
  },
};

/* ── Fade only (no vertical movement) ──────────────────────────── */

export const fadeOnly = {
  initial: { opacity: 0 } as const,
  animate: { opacity: 1 } as const,
  transition: { duration: 0.4, ease: ease.out } satisfies Transition,
};

/* ── Tab / content swap ────────────────────────────────────────── */

export const contentSwap = {
  initial: { opacity: 0, y: 8 } as const,
  animate: { opacity: 1, y: 0 } as const,
  exit: { opacity: 0, y: -8 } as const,
  transition: { duration: 0.25, ease: "easeInOut" as const },
};
