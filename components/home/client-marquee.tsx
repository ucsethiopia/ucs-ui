"use client";

import { clientLogos } from "@/lib/mock-data";

function ClientLogo({ name }: { name: string }) {
  // Generate initials for placeholder logo
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="flex h-16 w-40 flex-shrink-0 items-center justify-center rounded-lg bg-card border border-border px-6 transition-all hover:border-gold-500/50 hover:shadow-md">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-navy-900/10 text-navy-900 text-xs font-bold">
          {initials}
        </div>
        <span className="text-sm font-medium text-foreground truncate max-w-24">
          {name.split(" ").slice(0, 2).join(" ")}
        </span>
      </div>
    </div>
  );
}

export function ClientMarquee() {
  // Double the logos for seamless infinite scroll
  const doubledLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="py-16 bg-secondary/50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
            Trusted Partners
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            Serving Ethiopia{"'"}s Leading Institutions
          </h2>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative group">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused]">
          {doubledLogos.map((logo, index) => (
            <ClientLogo key={`${logo.id}-${index}`} name={logo.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
