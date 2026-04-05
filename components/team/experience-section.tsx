import type { Experience } from "@/lib/types";
import { Building2, Presentation } from "lucide-react";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-gold-500 rounded-full" />
        <h3 className="font-serif text-2xl font-bold text-foreground">
          Work Experience
        </h3>
      </div>
      <div className="space-y-6">
        {experiences.map((exp, idx) => {
          if (exp.type === "job") {
            const { data } = exp;
            return (
              <div key={idx} className="flex gap-4 items-start pl-1">
                <Building2 className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">
                    {data.position_title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {data.company}
                    {data.location ? `, ${data.location}` : ""}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">
                    {data.start_date}
                    {data.end_date ? ` – ${data.end_date}` : " – Present"}
                  </p>
                  {data.summary_points && data.summary_points.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {data.summary_points.map((point, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                        >
                          <span className="text-gold-500/50 flex-shrink-0">
                            &bull;
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          }

          if (exp.type === "training_given") {
            const { data } = exp;
            return (
              <div key={idx} className="flex gap-4 items-start pl-1">
                <Presentation className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">
                    Training &amp; Facilitation
                  </p>
                  <ul className="mt-1 space-y-1">
                    {data.training_titles.map((title, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                      >
                        <span className="text-gold-500/50 flex-shrink-0">
                          &bull;
                        </span>
                        {title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
