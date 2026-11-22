"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// Shared state for the two scrolling strips on the home page:
// - whether the client logo marquee is on screen, so the fixed FX ticker can
//   ease off while both strips are visible at the same time;
// - whether the visitor has paused all scrolling with the ticker's pause
//   button (WCAG 2.2.2), which stops both strips until pressed again.
interface MarqueeFocusValue {
  clientMarqueeInView: boolean;
  setClientMarqueeInView: (inView: boolean) => void;
  motionPaused: boolean;
  toggleMotionPaused: () => void;
}

const MarqueeFocusContext = createContext<MarqueeFocusValue | null>(null);

export function MarqueeFocusProvider({ children }: { children: ReactNode }) {
  const [clientMarqueeInView, setClientMarqueeInView] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);

  const toggleMotionPaused = () => setMotionPaused((paused) => !paused);

  return (
    <MarqueeFocusContext.Provider
      value={{ clientMarqueeInView, setClientMarqueeInView, motionPaused, toggleMotionPaused }}
    >
      {children}
    </MarqueeFocusContext.Provider>
  );
}

// Outside the provider (any page other than home) this is a no-op: the
// marquee reports to nobody, the ticker always runs at full speed and
// nothing is paused.
export function useMarqueeFocus(): MarqueeFocusValue {
  return (
    useContext(MarqueeFocusContext) ?? {
      clientMarqueeInView: false,
      setClientMarqueeInView: () => {},
      motionPaused: false,
      toggleMotionPaused: () => {},
    }
  );
}
