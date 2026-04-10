"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
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
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className={`object-cover ${backgroundPositionClass.replace("bg-", "object-")}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/30 via-navy-950/40 to-navy-950/60" />
          {/* Light mode: dissolve edges into white page */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-[1] opacity-0 light:opacity-100 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-[1] opacity-0 light:opacity-100 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-[1] opacity-0 light:opacity-100 pointer-events-none" />
          {/* Cross pattern overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[70vh]">
            {/* Content */}
            <div className={`py-12 lg:py-20 ${contentWrapperClassName ?? ""}`}>
              {eyebrow && (
                <motion.p {...fadeUp(0.1)} className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
                  {eyebrow}
                </motion.p>
              )}
              <motion.h1 {...fadeUp(eyebrow ? 0.25 : 0.1)} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
                {title}
              </motion.h1>
              {description && (
                <motion.p
                  {...fadeUp(eyebrow ? 0.4 : 0.25)}
                  className={`text-lg text-white/70 leading-relaxed max-w-2xl ${descriptionClassName ?? ""}`}
                >
                  {description}
                </motion.p>
              )}
            </div>

            {/* Image - Hidden on mobile, shown on lg+ */}
            <div className="hidden lg:block relative">
              <div className="relative aspect-[4/3] w-[50vw] max-w-[700px] -mr-[calc((50vw-min(50vw,700px))/2+2rem)] rounded-l-2xl overflow-hidden shadow-2xl">
                <Image
                  src={backgroundImage}
                  alt=""
                  fill
                  sizes="50vw"
                  className={`object-cover ${backgroundPositionClass.replace("bg-", "object-")}`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-950/15 to-transparent" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold-500/10 rounded-lg -z-10" />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
    <section
      className={`relative bg-navy-950 ${
        condensed ? "min-h-[65vh] py-20 lg:py-20 flex items-end" : "pt-32 pb-20"
      }`}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className={`absolute inset-0 overflow-hidden ${condensed ? "top-9 sm:top-19" : ""}`}>
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            priority
            className={`object-cover ${backgroundPositionClass.replace("bg-", "object-")}`}
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/30 via-navy-950/40 to-navy-950/60" />
          {/* Light mode: dissolve edges into white page */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent z-[1] block dark:hidden pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-white to-transparent z-[1] block dark:hidden pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-0 bg-gradient-to-l from-white to-transparent z-[1] block dark:hidden pointer-events-none" />
        </div>
      )}

      {/* Cross pattern overlay — always visible */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative z-10">
        <div
          className={`${condensed ? "max-w-2xl" : "max-w-3xl"} ${contentWrapperClassName ?? ""}`}
        >
          {eyebrow && (
            <motion.p {...fadeUp(0.1)} className="text-gold-500 text-sm font-semibold uppercase tracking-widest mb-4">
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            {...fadeUp(eyebrow ? 0.25 : 0.1)}
            className={`font-serif font-bold text-white text-balance ${
              condensed
                ? "text-3xl sm:text-4xl lg:text-5xl mb-4"
                : "text-4xl sm:text-5xl lg:text-6xl"
            }`}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              {...fadeUp(eyebrow ? 0.4 : 0.25)}
              className={`text-lg text-white/70 leading-relaxed max-w-2xl ${descriptionClassName ?? ""}`}
            >
              {description}
            </motion.p>
          )}
        </div>
      </Container>
    </section>
    <div className="pointer-events-none relative h-0" aria-hidden="true">
      <div className="absolute left-1/2 -translate-x-1/2 w-screen border-t-2 deco-h" />
    </div>
    </>
  );
}
