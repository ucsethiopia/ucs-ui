"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// Shares whether the client logo marquee is on screen, so the fixed FX ticker
// can ease off while both scrolling strips are visible at the same time.
interface MarqueeFocusValue {
  clientMarqueeInView: boolean;
  setClientMarqueeInView: (inView: boolean) => void;
}

const MarqueeFocusContext = createContext<MarqueeFocusValue | null>(null);

export function MarqueeFocusProvider({ children }: { children: ReactNode }) {
  const [clientMarqueeInView, setClientMarqueeInView] = useState(false);

  return (
    <MarqueeFocusContext.Provider value={{ clientMarqueeInView, setClientMarqueeInView }}>
      {children}
    </MarqueeFocusContext.Provider>
  );
}

// Outside the provider (any page other than home) this is a no-op: the
// marquee reports to nobody and the ticker always runs at full speed.
export function useMarqueeFocus(): MarqueeFocusValue {
  return (
    useContext(MarqueeFocusContext) ?? {
      clientMarqueeInView: false,
      setClientMarqueeInView: () => {},
    }
  );
}
