"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ease } from "@/lib/motion";

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 16 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.5, delay, ease: ease.out },
});

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const motto = "Think Agile, Get Inspired for Change!";

  return (
    <section
      ref={containerRef}
      className="relative h-[80vh] min-h-[500px] sm:min-h-[580px] flex items-center pt-[76px] sm:pt-[116px] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-background.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/70 to-navy-950/90" />
      </div>

      {/* Ghost monogram — asymmetric visual weight */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 font-serif font-bold text-white/[0.03] leading-none hidden md:block"
        style={{ fontSize: "clamp(10rem, 25vw, 22rem)" }}
      >
        UCS
      </div>

      {/* Content — left-aligned */}
      <motion.div
        className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14 py-8 sm:py-12 lg:py-16"
        style={{ opacity }}
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            {...reveal(0.1)}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-0.5 h-6 bg-white/30" />
            <p className="text-white/50 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
              Ultimate Consultancy Service
            </p>
          </motion.div>

          {/* Main Heading — single fade, no word-by-word */}
          <motion.h1
            {...reveal(0.2)}
            className="font-serif font-bold text-white leading-tight mb-6 sm:mb-8"
            style={{ fontSize: "var(--font-size-display)" }}
          >
            {motto}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            {...reveal(0.35)}
            className="text-white/60 max-w-xl mb-8 sm:mb-10 leading-relaxed"
            style={{ fontSize: "var(--font-size-body-lg)" }}
          >
            Making a positive difference in organizations and individuals&apos;
            life through the provision of value adding advisory and training
            services.
          </motion.p>

          {/* Single CTA + location badge */}
          <motion.div
            {...reveal(0.45)}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
          >
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-navy-950 transition-all hover:bg-white/90 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              Explore Our Services
              <ArrowRight className="h-5 w-5" />
            </Link>
            <span className="text-white/30 text-xs uppercase tracking-[0.15em] font-medium">
              Addis Ababa, Ethiopia
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
