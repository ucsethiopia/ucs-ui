"use client";

import { clientLogos, strategicPartners } from "@/lib/mock-data";
import { Container } from "@/components/shared/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useEffect, useRef } from "react";

function ClientLogo({ name, logo }: { name: string; logo: string }) {
  // Generate initials for fallback
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-20 w-44 flex-shrink-0 items-center justify-center rounded-lg bg-card border border-border px-6 transition-all hover:border-gold-500/50 hover:shadow-md group cursor-pointer">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Placeholder with initials - will be replaced with actual logos */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-gold-500/10 text-gold-600 text-sm font-bold group-hover:bg-gold-500/20 transition-colors">
            {initials}
          </div>
          <span className="text-xs font-medium text-foreground truncate max-w-24">
            {name.split(" ").slice(0, 2).join(" ")}
          </span>
        </div>
      </div>
    </div>
  );
}

function PartnerCard({
  name,
  logo,
  description,
}: {
  name: string;
  logo: string;
  description?: string;
}) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="group flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border transition-all hover:border-gold-500/50 hover:shadow-lg hover:-translate-y-1">
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary text-lg font-bold mb-4 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all">
        {initials}
      </div>
      <h4 className="font-semibold text-sm text-foreground mb-1 group-hover:text-gold-600 transition-colors">
        {name}
      </h4>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export function ClientMarquee() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate the logos for seamless loop (2 sets should be enough with this logic)
  const duplicatedClients = [...clientLogos, ...clientLogos];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    let animationId: number;
    let isPaused = false;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += 0.5;
        // Reset when half of the content is scrolled (since we duplicated the content)
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-secondary/30 overflow-hidden border-y border-border/50">
      {/* Clients Section */}
      <div className="mb-20">
        <Container className="mb-10">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3">
                Trusted By Leaders
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Our Valued Clients
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Serving Ethiopia&apos;s leading banks, insurance companies,
                government institutions, and private enterprises
              </p>
            </div>
          </ScrollReveal>
        </Container>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track - Clients */}
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden"
            aria-hidden="true"
            style={{
              scrollBehavior: "auto",
              whiteSpace: "nowrap",
            }}
          >
            {duplicatedClients.map((client, index) => (
              <div key={`${client.id}-${index}`} className="inline-block px-4">
                <ClientLogo name={client.name} logo={client.logo} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Section - Static Grid */}
      <div>
        <Container>
          <div className="text-center mb-10">
            <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-2">
              Strategic Partnerships
            </p>
            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Global Network
            </h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              We partner with established consulting firms and multidisciplinary
              experts from around the world to deliver exceptional results
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {strategicPartners.map((partner) => (
              <PartnerCard
                key={partner.id}
                name={partner.name}
                logo={partner.logo}
                description={partner.description}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
