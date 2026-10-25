"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

interface NavigationContextValue {
  navKey: string;
  triggerNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextValue>({
  navKey: "0",
  triggerNavigation: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [counter, setCounter] = useState(0);
  const triggerNavigation = useCallback(() => setCounter((c) => c + 1), []);
  const navKey = `${pathname}-${counter}`;

  return (
    <NavigationContext.Provider value={{ navKey, triggerNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
