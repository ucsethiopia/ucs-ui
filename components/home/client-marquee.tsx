"use client";

import { clientLogos } from "@/lib/mock-data";
import { Container } from "@/components/shared/container";
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
    <div className="flex flex-col items-center h-16 w-36 flex-shrink-0 px-4">
      <div className="relative w-full h-10 opacity-60">
        {logo && !imgError ? (
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain"
            onError={() => setImgError(true)}
            sizes="144px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-xs font-semibold text-muted-foreground tracking-wider">
              {initials}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function ClientMarquee() {
  const [paused, setPaused] = useState(false);
  const duplicatedClients = [...clientLogos, ...clientLogos];

  return (
    <section
      className="overflow-hidden"
      style={{ paddingBlock: "var(--space-section-tight)" }}
    >
      {/* Simple label */}
      <Container className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by
        </p>
      </Container>

      {/* Marquee Container — no gradients, no borders */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="overflow-hidden">
          <div
            className="flex animate-marquee py-2"
            style={{ animationPlayState: paused ? "paused" : "running" }}
            aria-hidden="true"
          >
            {duplicatedClients.map((client, index) => (
              <div key={`${client.id}-${index}`} className="flex-shrink-0 px-1">
                <ClientLogo name={client.name} logo={client.logo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
