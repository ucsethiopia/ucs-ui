"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { strategicPartners } from "@/lib/mock-data";
import { Container } from "@/components/shared/container";
import { ease, staggerContainer, staggerItem } from "@/lib/motion";

function PartnerLogo({ name, logo, country }: { name: string; logo: string; country?: string }) {
  const [imgError, setImgError] = useState(false);

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-4 py-3">
      <div className="relative h-12 w-12 flex-shrink-0 rounded-lg border border-border bg-card overflow-hidden flex items-center justify-center">
        {logo && !imgError ? (
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain p-1.5"
            onError={() => setImgError(true)}
            sizes="48px"
          />
        ) : (
          <span className="text-[10px] font-semibold text-muted-foreground tracking-wide">
            {initials}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground leading-tight truncate">{name}</p>
        {country && (
          <p className="text-xs text-muted-foreground">{country}</p>
        )}
      </div>
    </div>
  );
}

export function OrbitalPartners() {
  const localPartners = strategicPartners.filter(
    (p) => p.partnerType === "local"
  );
  const overseasPartners = strategicPartners.filter(
    (p) => p.partnerType === "overseas"
  );

  return (
    <section style={{ paddingBlock: "var(--space-section-normal)" }}>
      <Container>
        {/* Header — left-aligned */}
        <motion.div
          className="mb-10 max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: ease.out }}
        >
          <h2
            className="font-serif font-bold text-foreground mb-4"
            style={{ fontSize: "var(--font-size-heading-1)" }}
          >
            Strategic Partnerships
          </h2>
          <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "var(--font-size-body-lg)" }}>
            We partner with established consulting firms and multidisciplinary
            experts to deliver exceptional results.
          </p>
        </motion.div>

        {/* Two-row partner grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Local partners */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4 pb-3 border-b border-border">
              Local Partners
            </p>
            <motion.div
              className="space-y-0 divide-y divide-border/50"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {localPartners.map((partner) => (
                <motion.div key={partner.id} variants={staggerItem}>
                  <PartnerLogo
                    name={partner.name}
                    logo={partner.logo}
                    country={partner.country}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Overseas partners */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4 pb-3 border-b border-border">
              Overseas Partners
            </p>
            <motion.div
              className="space-y-0 divide-y divide-border/50"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {overseasPartners.map((partner) => (
                <motion.div key={partner.id} variants={staggerItem}>
                  <PartnerLogo
                    name={partner.name}
                    logo={partner.logo}
                    country={partner.country}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
