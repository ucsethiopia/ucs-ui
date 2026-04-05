"use client";

import type { DegreeEntry } from "@/lib/types";
import { GraduationCap } from "lucide-react";
import { Timeline, type TimelineEntry } from "./timeline";

interface EducationSectionProps {
  education: {
    bachelors: DegreeEntry[];
    masters: DegreeEntry[];
    phd: DegreeEntry[];
    other: DegreeEntry[];
  };
}

const levelLabels: {
  key: keyof EducationSectionProps["education"];
  label: string;
}[] = [
  { key: "phd", label: "Doctorate" },
  { key: "masters", label: "Master's" },
  { key: "bachelors", label: "Bachelor's" },
  { key: "other", label: "Other" },
];

export function EducationSection({ education }: EducationSectionProps) {
  const hasAny = Object.values(education).some((arr) => arr.length > 0);
  if (!hasAny) return null;

  // Flatten all degrees into timeline entries, sorted by end_year desc
  const allDegrees: (DegreeEntry & { level: string })[] = [];
  for (const { key, label } of levelLabels) {
    for (const deg of education[key]) {
      allDegrees.push({ ...deg, level: label });
    }
  }
  allDegrees.sort(
    (a, b) => (b.end_year ?? 9999) - (a.end_year ?? 9999),
  );

  const timelineData: TimelineEntry[] = allDegrees.map((deg) => {
    const yearLabel = deg.end_year
      ? `${deg.start_year || ""} – ${deg.end_year}`
      : deg.start_year
        ? `${deg.start_year} – Present`
        : "";

    return {
      title: yearLabel || deg.level,
      content: (
        <div className="mb-6">
          <p className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-1.5">
            {deg.level}
          </p>
          <h4 className="text-lg font-bold text-foreground font-serif mb-1">
            {deg.degree_title}
          </h4>
          <p className="text-base text-muted-foreground">
            {deg.university}
            {deg.location ? `, ${deg.location}` : ""}
          </p>
        </div>
      ),
    };
  });

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="h-6 w-6 text-gold-500" />
        <h3 className="font-serif text-2xl font-bold text-foreground">
          Education
        </h3>
      </div>
      <Timeline data={timelineData} />
    </div>
  );
}
