"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import { cn } from "@/lib/utils";
import { SlideshowThumbnails } from "./slideshow-thumbnails";

// Autoplay interval lives in globals.css (.animate-highlight-progress, shared
// with the news Highlights spotlight); the bar's animationend advances slides.
const AUTOPLAY_SECONDS = 8;
const CROSSFADE_SECONDS = 0.9;
const KEN_BURNS_SCALE = 1.06;
const SWIPE_THRESHOLD_PX = 60;
const IMAGE_SIZES = "(max-width: 1024px) 100vw, 1024px";

const ARROW_CLASS =
  "absolute top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-navy-950/50 text-white backdrop-blur-sm transition-colors hover:border-gold-500 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500";

/**
 * Article photo slideshow: slow crossfade with a gentle zoom, autoplay with a
 * progress bar (paused on hover/focus; off under reduced motion), arrows,
 * swipe and thumbnails. Each photo sits on a blurred copy of itself, so any
 * aspect ratio is shown whole without cropping or letterbox bars.
 */
export function ArticleSlideshow({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const reduceMotion = useReducedMotion();

  if (images.length === 0) return null;
  const hasMultiple = images.length > 1;
  const current = images[index];

  const goTo = (next: number, manual = true) => {
    setIndex((next + images.length) % images.length);
    if (manual) setCycleKey((k) => k + 1);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x <= -SWIPE_THRESHOLD_PX) goTo(index + 1);
    else if (info.offset.x >= SWIPE_THRESHOLD_PX) goTo(index - 1);
  };

  return (
    <figure className="highlight-autoplay">
      <div
        className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-navy-950"
        role="group"
        aria-roledescription="carousel"
        aria-label={`${title} photos`}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: CROSSFADE_SECONDS, ease: "easeInOut" }}
            drag={hasMultiple ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
          >
            {/* Blurred fill so non-matching aspect ratios never show bars */}
            <SafeImage
              src={current}
              alt=""
              fill
              sizes={IMAGE_SIZES}
              className="object-cover scale-110 blur-2xl opacity-50"
              fallbackClassName="absolute inset-0"
            />
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reduceMotion ? 1 : KEN_BURNS_SCALE }}
              animate={{ scale: 1 }}
              transition={{ duration: AUTOPLAY_SECONDS + CROSSFADE_SECONDS, ease: "easeOut" }}
            >
              <SafeImage
                src={current}
                alt={hasMultiple ? `${title} (photo ${index + 1} of ${images.length})` : title}
                fill
                priority={index === 0}
                sizes={IMAGE_SIZES}
                className="object-contain pointer-events-none select-none"
                fallbackClassName="absolute inset-0"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-navy-950/70 to-transparent" />

        {hasMultiple && (
          <>
            <div
              key={`${index}-${cycleKey}`}
              aria-hidden
              onAnimationEnd={() => goTo(index + 1, false)}
              className="animate-highlight-progress pointer-events-none absolute left-0 right-0 top-0 z-20 h-0.5 bg-gold-500"
            />
            <button onClick={() => goTo(index - 1)} aria-label="Previous photo" className={cn(ARROW_CLASS, "left-3 sm:left-4")}>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button onClick={() => goTo(index + 1)} aria-label="Next photo" className={cn(ARROW_CLASS, "right-3 sm:right-4")}>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="absolute bottom-4 left-5 z-20 font-serif text-sm tabular-nums text-white/90" aria-live="polite">
              <span className="text-gold-400">{String(index + 1).padStart(2, "0")}</span>
              <span className="mx-1.5 text-white/40">/</span>
              {String(images.length).padStart(2, "0")}
            </p>
          </>
        )}
      </div>

      {hasMultiple && (
        <SlideshowThumbnails images={images} activeIndex={index} onSelect={(i) => goTo(i)} />
      )}
    </figure>
  );
}
