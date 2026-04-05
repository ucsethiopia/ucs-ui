import { BookOpen } from "lucide-react";

interface TrainingsSectionProps {
  trainings: {
    local: string[];
    international: string[];
  };
}

export function TrainingsSection({ trainings }: TrainingsSectionProps) {
  const hasLocal = trainings.local && trainings.local.length > 0;
  const hasInternational =
    trainings.international && trainings.international.length > 0;
  if (!hasLocal && !hasInternational) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-foreground/20 rounded-full" />
        <h3 className="font-serif text-2xl font-bold text-foreground">
          Professional Training
        </h3>
      </div>
      <div className="space-y-6">
        {hasInternational && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              International
            </p>
            <ul className="space-y-2">
              {trainings.international.map((t, idx) => (
                <li key={idx} className="flex gap-3 items-start pl-1">
                  <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {hasLocal && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Local
            </p>
            <ul className="space-y-2">
              {trainings.local.map((t, idx) => (
                <li key={idx} className="flex gap-3 items-start pl-1">
                  <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
