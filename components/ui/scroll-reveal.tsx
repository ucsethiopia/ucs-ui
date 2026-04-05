"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Unified scroll-reveal wrapper using Framer Motion whileInView.
 * Replaces the previous IntersectionObserver + style-prop approach.
 */
export function ScrollReveal({ children, delay = 0, className = '' }: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}
