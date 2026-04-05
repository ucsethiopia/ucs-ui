"use client";

import type { Experience } from "@/lib/types";
import { Briefcase } from "lucide-react";
import { Timeline, type TimelineEntry } from "./timeline";

/** Formats "2012-01" → "Jan 2012", returns raw string if unparseable */
function formatDate(raw: string): string {
  const [year, month] = raw.split("-");
  if (!year || !month) return raw;
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const idx = parseInt(month, 10) - 1;
  if (idx < 0 || idx > 11) return raw;
  return `${monthNames[idx]} ${year}`;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (!experiences || experiences.length === 0) return null;

  const timelineData: TimelineEntry[] = experiences
    .filter((exp): exp is Experience => exp.type === "job" || exp.type === "training_given")
    .map((exp) => {
      if (exp.type === "job") {
        const { data } = exp;
        const yearLabel = data.start_date
          ? `${formatDate(data.start_date)}${data.end_date ? ` – ${formatDate(data.end_date)}` : " – Present"}`
          : "";

        return {
          title: yearLabel,
          content: (
            <div className="mb-6">
              <h4 className="text-lg font-bold text-foreground font-serif mb-1">
                {data.position_title}
              </h4>
              <p className="text-base text-muted-foreground font-semibold mb-2">
                {data.company}
                {data.location ? `, ${data.location}` : ""}
              </p>
              {data.summary_points && data.summary_points.length > 0 && (
                <ul className="space-y-1.5">
                  {data.summary_points.map((point, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                    >
                      <span className="text-muted-foreground/40 flex-shrink-0">
                        &bull;
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ),
        };
      }

      // training_given
      const { data } = exp;
      return {
        title: "Training",
        content: (
          <div className="mb-6">
            <h4 className="text-lg font-bold text-foreground font-serif mb-2">
              Training &amp; Facilitation
            </h4>
            <ul className="space-y-1.5">
              {data.training_titles.map((title, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                >
                  <span className="text-muted-foreground/40 flex-shrink-0">
                    &bull;
                  </span>
                  {title}
                </li>
              ))}
            </ul>
          </div>
        ),
      };
    });

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="h-6 w-6 text-foreground" />
        <h3 className="font-serif text-2xl font-bold text-foreground">
          Work Experience
        </h3>
      </div>
      <Timeline data={timelineData} />
    </div>
  );
}
