"use client";

import { type ReactNode } from "react";
import { useNavigation } from "@/components/navigation-provider";

export function PageRemountWrapper({ children }: { children: ReactNode }) {
  const { navKey } = useNavigation();
  return <div key={navKey}>{children}</div>;
}
