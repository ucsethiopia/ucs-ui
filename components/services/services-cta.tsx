"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/shared/container";

interface ServicesCTAProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function ServicesCTA({
  heading = "Ready to Transform Your Organization?",
  description = "Let's discuss how UCS Ethiopia can help you achieve your strategic objectives and build lasting capabilities.",
  buttonText = "Get in Touch",
  buttonHref = "/contact",
}: ServicesCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 md:py-20 bg-navy-950">
      <Container>
      <div ref={ref} className="max-w-[700px] mx-auto text-center">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-3"
        >
          Let{"'"}s Work Together
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 text-balance"
        >
          {heading}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/70 leading-[1.65] mb-8 text-base sm:text-lg"
        >
          {description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={buttonHref}
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold-500 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-navy-950 transition-all hover:bg-gold-400 hover:gap-3"
          >
            {buttonText}
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </motion.div>
      </div>
      </Container>
    </section>
  );
}
