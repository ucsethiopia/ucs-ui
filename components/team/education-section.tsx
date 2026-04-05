import type { DegreeEntry } from "@/lib/types";
import { GraduationCap } from "lucide-react";

interface EducationSectionProps {
  education: {
    bachelors: DegreeEntry[];
    masters: DegreeEntry[];
    phd: DegreeEntry[];
    other: DegreeEntry[];
  };
}

const levelLabels: { key: keyof EducationSectionProps["education"]; label: string }[] = [
  { key: "phd", label: "Doctorate" },
  { key: "masters", label: "Master's" },
  { key: "bachelors", label: "Bachelor's" },
  { key: "other", label: "Other" },
];

export function EducationSection({ education }: EducationSectionProps) {
  const hasAny = Object.values(education).some((arr) => arr.length > 0);
  if (!hasAny) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-gold-500 rounded-full" />
        <h3 className="font-serif text-2xl font-bold text-foreground">
          Education
        </h3>
      </div>
      <div className="space-y-6">
        {levelLabels.map(({ key, label }) => {
          const entries = education[key];
          if (!entries || entries.length === 0) return null;
          return (
            <div key={key}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {label}
              </p>
              <div className="space-y-4">
                {entries.map((deg, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 items-start pl-1"
                  >
                    <GraduationCap className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">
                        {deg.degree_title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {deg.university}
                        {deg.location ? `, ${deg.location}` : ""}
                      </p>
                      {(deg.start_year || deg.end_year) && (
                        <p className="text-xs text-muted-foreground/70 mt-0.5">
                          {deg.start_year}
                          {deg.end_year ? ` – ${deg.end_year}` : " – Present"}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
