"use client";

import { useState, useEffect } from "react";
import type { TeamMember, TeamMemberDetail } from "@/lib/types";

export type { TeamMember, TeamMemberDetail };

const BASE_URL = process.env.NEXT_PUBLIC_UCS_SERVICE_API_URL ?? "";

// ─── useTeamApi ───────────────────────────────────────────────────────────────
// Fetches the full team list from GET /team.

export function useTeamApi() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetch(`${BASE_URL}/team`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json() as Promise<TeamMember[]>;
      })
      .then((data) => {
        if (!cancelled) setTeam(data);
      })
      .catch((err) => {
        console.error("[useTeamApi]", err);
        if (!cancelled) setError("Failed to load team members");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { team, isLoading, error };
}

// ─── useTeamMember ────────────────────────────────────────────────────────────
// Fetches a single team member detail from GET /team/{name}.
// Returns { member, isLoading, notFound, error }.

export function useTeamMember(memberSlug: string) {
  const [member, setMember] = useState<TeamMemberDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!memberSlug) return;
    let cancelled = false;
    setIsLoading(true);
    setNotFound(false);
    setError(null);

    fetch(`${BASE_URL}/team/${encodeURIComponent(memberSlug)}`)
      .then((res) => {
        if (res.status === 404) {
          if (!cancelled) setNotFound(true);
          return null;
        }
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json() as Promise<TeamMemberDetail>;
      })
      .then((data) => {
        if (!cancelled && data) setMember(data);
      })
      .catch((err) => {
        console.error("[useTeamMember]", err);
        if (!cancelled) setError("Failed to load team member");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [memberSlug]);

  return { member, isLoading, notFound, error };
}
