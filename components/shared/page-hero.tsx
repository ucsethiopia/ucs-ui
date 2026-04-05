"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";
import { Container } from "@/components/shared/container";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  backgroundImage?: string;
  backgroundPositionClass?: string;
  contentWrapperClassName?: string;
  descriptionClassName?: string;
  condensed?: boolean;
  wideImage?: boolean;
}

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: ease.out },
});

export function PageHero({
  eyebrow,
  title,
  description,
  backgroundImage,
  backgroundPositionClass = "bg-center",
  contentWrapperClassName,
  descriptionClassName,
  condensed,
  wideImage,
}: PageHeroProps) {
  // Wide image layout - side by side design
  if (wideImage && backgroundImage) {
    return (
      <section className="relative bg-navy-950 min-h-[70vh] py-16 lg:py-0">
        <div className="absolute inset-0 lg:hidden overflow-hidden">
          <div
            className={`absolute inset-0 bg-cover ${backgroundPositionClass}`}
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-navy-950/50 to-navy-950/70" />
        </div>

        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[70vh]">
            {/* Content — left-aligned */}
            <div className={`py-12 lg:py-20 ${contentWrapperClassName ?? ""}`}>
              {eyebrow && (
                <motion.div {...reveal(0.1)} className="flex items-center gap-3 mb-4">
                  <div className="w-0.5 h-6 bg-white/30" />
                  <p className="text-white/50 text-sm font-semibold uppercase tracking-[0.2em]">
                    {eyebrow}
                  </p>
                </motion.div>
              )}
              <motion.h1
                {...reveal(eyebrow ? 0.2 : 0.1)}
                className="font-serif font-bold text-white mb-6 text-balance"
                style={{ fontSize: "var(--font-size-display)" }}
              >
                {title}
              </motion.h1>
              {description && (
                <motion.p
                  {...reveal(eyebrow ? 0.3 : 0.2)}
                  className={`text-white/60 leading-relaxed max-w-2xl ${descriptionClassName ?? ""}`}
                  style={{ fontSize: "var(--font-size-body-lg)" }}
                >
                  {description}
                </motion.p>
              )}
            </div>

            {/* Image - Hidden on mobile, shown on lg+ */}
            <div className="hidden lg:block relative">
              <div className="relative aspect-[4/3] w-[50vw] max-w-[700px] -mr-[calc((50vw-min(50vw,700px))/2+2rem)] rounded-l-2xl overflow-hidden shadow-2xl">
                <div
                  className={`absolute inset-0 bg-cover ${backgroundPositionClass}`}
                  style={{ backgroundImage: `url('${backgroundImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-950/15 to-transparent" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      className={`relative bg-navy-950 ${
        condensed ? "min-h-[75vh] py-20 lg:py-20 flex items-end" : "pt-32 pb-20"
      }`}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute inset-0 bg-cover ${condensed ? "top-9 sm:top-19" : ""} ${backgroundPositionClass}`}
            style={{
              backgroundImage: `url('${backgroundImage}')`,
            }}
          />
          {/* Overlay for readability — simple gradient, no pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-navy-950/50 to-navy-950/70" />
        </div>
      )}

      <Container className="relative z-10">
        <div
          className={`${condensed ? "max-w-2xl" : "max-w-3xl"} ${contentWrapperClassName ?? ""}`}
        >
          {eyebrow && (
            <motion.div {...reveal(0.1)} className="flex items-center gap-3 mb-4">
              <div className="w-0.5 h-6 bg-white/30" />
              <p className="text-white/50 text-sm font-semibold uppercase tracking-[0.2em]">
                {eyebrow}
              </p>
            </motion.div>
          )}
          <motion.h1
            {...reveal(eyebrow ? 0.2 : 0.1)}
            className={`font-serif font-bold text-white text-balance ${
              condensed ? "mb-4" : ""
            }`}
            style={{ fontSize: condensed ? "var(--font-size-heading-1)" : "var(--font-size-display)" }}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              {...reveal(eyebrow ? 0.3 : 0.2)}
              className={`text-white/60 leading-relaxed max-w-2xl ${descriptionClassName ?? ""}`}
              style={{ fontSize: "var(--font-size-body-lg)" }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </Container>
    </section>
  );
}
