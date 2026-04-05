"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/shared/container";
import { ease } from "@/lib/motion";

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
    <section className="bg-navy-950" style={{ paddingBlock: "var(--space-section-generous)" }}>
      <Container>
        <div ref={ref} className="max-w-[600px]">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05, ease: ease.out }}
            className="font-serif font-bold text-white mb-4"
            style={{ fontSize: "var(--font-size-heading-1)" }}
          >
            {heading}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: ease.out }}
            className="text-white/60 leading-[1.65] mb-8"
            style={{ fontSize: "var(--font-size-body-lg)" }}
          >
            {description}
          </motion.p>

          {/* CTA Button — gold is acceptable here (1 per page) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25, ease: ease.out }}
          >
            <Link
              href={buttonHref}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold-500 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-navy-950 transition-all hover:bg-gold-400"
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
