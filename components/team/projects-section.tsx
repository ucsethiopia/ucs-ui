import type { ResearchProject, SoftwareProject } from "@/lib/types";
import { FlaskConical, Code2, ExternalLink } from "lucide-react";

interface ProjectsSectionProps {
  projects: {
    research: ResearchProject[];
    software: SoftwareProject[];
  };
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const hasResearch = projects.research && projects.research.length > 0;
  const hasSoftware = projects.software && projects.software.length > 0;
  if (!hasResearch && !hasSoftware) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-gold-500 rounded-full" />
        <h3 className="font-serif text-2xl font-bold text-foreground">
          Projects
        </h3>
      </div>
      <div className="space-y-8">
        {hasResearch && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Research
            </p>
            <div className="space-y-5">
              {projects.research.map((proj, idx) => (
                <div key={idx} className="flex gap-4 items-start pl-1">
                  <FlaskConical className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {proj.title}
                    </p>
                    {proj.authors && proj.authors.length > 0 && (
                      <p className="text-xs text-muted-foreground/70 mt-0.5">
                        {proj.authors.join(", ")}
                      </p>
                    )}
                    {proj.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                        {proj.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {hasSoftware && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Software
            </p>
            <div className="space-y-5">
              {projects.software.map((proj, idx) => (
                <div key={idx} className="flex gap-4 items-start pl-1">
                  <Code2 className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {proj.title}
                    </p>
                    {proj.tech_stack && proj.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {proj.tech_stack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-gold-500/10 text-gold-600 text-xs font-medium rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {proj.descriptions && proj.descriptions.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {proj.descriptions.map((desc, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                          >
                            <span className="text-gold-500/50 flex-shrink-0">
                              &bull;
                            </span>
                            {desc}
                          </li>
                        ))}
                      </ul>
                    )}
                    {proj.links && proj.links.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-2">
                        {proj.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-gold-600 hover:text-gold-500 transition-colors"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            {link.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
