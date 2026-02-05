import { useState, useEffect } from "react";
import {
  teamMembers,
  simulateApiDelay,
  type TeamMember,
} from "@/lib/mock-data";

export function useTeamApi() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeam() {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate API call with 800ms delay
        const data = await simulateApiDelay(teamMembers, 800);
        setTeam(data);
      } catch (err) {
        setError("Failed to load team members");
        console.error("Error fetching team:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTeam();
  }, []);

  return { team, isLoading, error };
}

export function useTeamMember(memberSlug: string) {
  const [member, setMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMember() {
      try {
        setIsLoading(true);
        setError(null);
        // Decode the URL slug and find the member
        const decodedSlug = decodeURIComponent(memberSlug)
          .toLowerCase()
          .replace(/-/g, " ");
        const data = await simulateApiDelay(teamMembers, 600);

        // Try to find member by matching slug pattern
        const foundMember = data.find((m) => {
          const memberNameSlug = m.name.toLowerCase().replace(/\s+/g, " ");
          // Match exact name or name without title prefixes (Dr., Mr., Mrs., etc.)
          return (
            memberNameSlug === decodedSlug ||
            memberNameSlug.replace(/^(dr\.|mr\.|mrs\.|ms\.)\s*/i, "") ===
              decodedSlug ||
            m.name.toLowerCase().replace(/\s+/g, "-") === memberSlug
          );
        });

        if (!foundMember) {
          setError("Team member not found");
        } else {
          setMember(foundMember);
        }
      } catch (err) {
        setError("Failed to load team member");
        console.error("Error fetching team member:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMember();
  }, [memberSlug]);

  return { member, isLoading, error };
}
