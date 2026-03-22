"use client";

import { clientLogos, strategicPartners } from "@/lib/mock-data";
import { Container } from "@/components/shared/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ClientLogo({ name, logo }: { name: string; logo: string }) {
  const [imgError, setImgError] = useState(false);

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="group relative flex flex-col items-center h-20 w-40 flex-shrink-0 px-3 cursor-pointer transition-transform duration-300 hover:scale-110">
      {/* Logo area */}
      <div className="relative w-full h-14 brightness-95 group-hover:brightness-100 transition-[filter] duration-300">
        {logo && !imgError ? (
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain"
            onError={() => setImgError(true)}
            sizes="160px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-xs font-semibold text-muted-foreground tracking-wider">
              {initials}
            </span>
          </div>
        )}
      </div>
      {/* Company name — fades up on hover */}
      <span className="mt-0.5 text-[10px] font-medium text-center text-foreground/60 leading-tight opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 line-clamp-1 w-full">
        {name}
      </span>
    </div>
  );
}

function PartnerCard({ name, logo }: { name: string; logo: string }) {
  const [imgError, setImgError] = useState(false);

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="group flex flex-col items-center text-center p-4 rounded-lg border border-border/40 bg-card/50 transition-all hover:border-border hover:shadow-sm hover:opacity-100 opacity-80">
      {logo && !imgError ? (
        <div className="relative h-14 w-full mb-3">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain"
            onError={() => setImgError(true)}
            sizes="180px"
          />
        </div>
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-muted-foreground text-sm font-semibold mb-3">
          {initials}
        </div>
      )}
      <h4 className="text-xs font-medium text-foreground leading-tight">
        {name}
      </h4>
    </div>
  );
}

export function ClientMarquee() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <section className="py-10 sm:py-14 lg:py-16 bg-secondary/30 overflow-hidden border-y border-border/50">
      {/* Clients Section */}
      <div className="mb-8">
        <Container className="mb-8">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">
                Trusted by Leaders
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                Our Valued Clients
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Serving Ethiopia&apos;s leading banks, insurance companies,
                government institutions, and private enterprises
              </p>
            </div>
          </ScrollReveal>
        </Container>

        {/* Marquee Container */}
        <div className="relative overflow-x-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary/30 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div
            ref={scrollRef}
            className="flex"
            aria-hidden="true"
            style={{ scrollBehavior: "auto", whiteSpace: "nowrap" }}
          >
            {duplicatedClients.map((client, index) => (
              <div key={`${client.id}-${index}`} className="inline-block px-3">
                <ClientLogo name={client.name} logo={client.logo} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <Container>
        <ScrollReveal>
          <div className="text-center mb-8">
            <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3">
              Strategic Partnerships
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              Global Network
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              We partner with established consulting firms and multidisciplinary
              experts from around the world to deliver exceptional results
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
          {strategicPartners.map((partner) => (
            <PartnerCard
              key={partner.id}
              name={partner.name}
              logo={partner.logo}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
