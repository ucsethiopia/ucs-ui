"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Honour the OS "reduce motion" setting for every Framer Motion animation:
// transform and layout animations (slides, spins, fly-ins) jump straight to
// their end state, while opacity fades still play.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
