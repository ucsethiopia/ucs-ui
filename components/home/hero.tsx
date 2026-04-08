"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const companyName = "Ultimate Consultancy Service";
  const motto = "Think Agile, Get Inspired for Change!";
  const words = motto.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative h-[90vh] min-h-[500px] sm:min-h-[580px] flex items-center pt-[76px] sm:pt-[116px] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 top-26 z-0">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-background.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/70 to-navy-950/90" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-14 py-8 sm:py-12 lg:py-16 text-center"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <motion.p
            className="text-gold-500 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {companyName}
          </motion.p>

          {/* Main Heading with word-by-word animation */}
          <div className="overflow-hidden mb-5 sm:mb-8">
            <motion.h1
              className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              initial="hidden"
              animate="visible"
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.65,
                    delay: 0.3 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Location indicator with line */}
          <motion.div
            className="overflow-hidden mb-5 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-0.5 bg-gold-500" />
              <span className="text-gold-500 font-medium tracking-wider text-sm uppercase">
                Addis Ababa, Ethiopia
              </span>
            </div>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Making a positive difference in organizations and individuals&apos;
            life through the provision of value adding advisory and training
            services.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold-500 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-navy-950 transition-all hover:bg-gold-400 hover:gap-3 hover:scale-105 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              Explore Our Services
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/40 bg-transparent px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              Learn About Us
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
