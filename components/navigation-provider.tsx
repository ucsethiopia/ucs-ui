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
  /** Path of the page actually on screen (ignores an open article modal's URL). */
  pagePath: string;
  triggerNavigation: () => void;
}

const ARTICLE_PATH = /^\/news\/[^/]+$/;

const NavigationContext = createContext<NavigationContextValue>({
  navKey: "0",
  pagePath: "/",
  triggerNavigation: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [counter, setCounter] = useState(0);
  const triggerNavigation = useCallback(() => setCounter((c) => c + 1), []);
  // Opening an article from a card shows it as a modal over the current page
  // (app/@modal) while the URL becomes /news/<slug>. Keep the underlying
  // page's key for article URLs so the page beneath isn't remounted.
  const [pagePath, setPagePath] = useState(pathname);
  const isArticlePath = ARTICLE_PATH.test(pathname);
  if (!isArticlePath && pagePath !== pathname) setPagePath(pathname);
  const displayedPath = isArticlePath ? pagePath : pathname;
  const navKey = `${displayedPath}-${counter}`;

  return (
    <NavigationContext.Provider value={{ navKey, pagePath: displayedPath, triggerNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
