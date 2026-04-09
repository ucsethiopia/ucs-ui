"use client";

import { useState, useEffect, useRef, useCallback } from "react";

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  isVisible: boolean;
  duration?: number;
}

export function AnimatedCounter({
  target,
  suffix = "",
  isVisible,
  duration = 1800,
}: AnimatedCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const rafRef = useRef<number>(0);

  const prefersReducedMotion = useCallback(() => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    if (prefersReducedMotion()) {
      setCount(target);
      return;
    }

    let start: number | null = null;

    function tick(timestamp: number) {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);

      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible, target, duration, prefersReducedMotion]);

  if (count === null) {
    return (
      <span className="invisible">
        {target}
        {suffix}
      </span>
    );
  }

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
