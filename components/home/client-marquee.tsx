"use client";

import { clientLogos } from "@/lib/mock-data";
import { Container } from "@/components/shared/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import { useState } from "react";

function ClientLogo({ name, logo }: { name: string; logo: string }) {
  const [imgError, setImgError] = useState(false);

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="group relative flex flex-col items-center h-16 w-32 md:h-20 md:w-40 flex-shrink-0 px-3 cursor-pointer transition-transform duration-300 hover:scale-110">
      {/* Logo area */}
      <div className="relative w-full h-8 md:h-12 brightness-95 group-hover:brightness-125 transition-[filter] duration-300">
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

export function ClientMarquee() {
  const [paused, setPaused] = useState(false);
  const duplicatedClients = [...clientLogos, ...clientLogos];

  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-secondary/30 overflow-hidden border-y border-border/50 light:border-0">
      {/* Clients Section */}
      <div>
        <Container className="mb-6">
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
        <div
          className="relative rounded-sm bg-gradient-to-b from-transparent via-background/40 to-transparent shadow-[inset_0_1px_8px_0_rgba(0,0,0,0.06),inset_0_-1px_8px_0_rgba(0,0,0,0.06)] light:shadow-none"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Edge overlays — gradient colour fade */}
          <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-secondary/60 via-secondary/20 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-secondary/60 via-secondary/20 to-transparent z-10 pointer-events-none" />
          {/* Edge overlays — backdrop blur with fading mask */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none backdrop-blur-sm [mask-image:linear-gradient(to_right,black_30%,transparent)] [-webkit-mask-image:linear-gradient(to_right,black_30%,transparent)]" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none backdrop-blur-sm [mask-image:linear-gradient(to_left,black_30%,transparent)] [-webkit-mask-image:linear-gradient(to_left,black_30%,transparent)]" />

          {/* Scrolling Track */}
          <div className="overflow-hidden">
            <div
              className="flex animate-client-marquee py-3"
              style={{ animationPlayState: paused ? "paused" : "running" }}
              aria-hidden="true"
            >
              {duplicatedClients.map((client, index) => (
                <div key={`${client.id}-${index}`} className="flex-shrink-0 px-1 md:px-2">
                  <ClientLogo name={client.name} logo={client.logo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
