"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SafeImage } from "@/components/shared/safe-image";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function OverseasSpotlight({
  items,
  onReadMore,
}: {
  items: NewsItem[];
  onReadMore: (item: NewsItem) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const featured = items[currentIndex] ?? items[0];

  const articleImages = useMemo(() => {
    const imgs: string[] = [];
    if (featured?.main_image) imgs.push(featured.main_image);
    for (const img of featured?.extra_images ?? []) {
      if (img) imgs.push(img);
    }
    return imgs;
  }, [featured]);

  useEffect(() => {
    setImageIndex(0);
    if (articleImages.length <= 1) return;
    const id = setInterval(
      () => setImageIndex((p) => (p + 1) % articleImages.length),
      4000,
    );
    return () => clearInterval(id);
  }, [currentIndex, articleImages.length]);

  if (items.length === 0) return null;

  const currentImage = articleImages[imageIndex];
  const prev = () => setCurrentIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setCurrentIndex((i) => (i + 1) % items.length);

  return (
    <section className="pb-8 mb-6 border-b border-border">
      <div className="flex items-center gap-4 mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold-600 shrink-0">
          International
        </p>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Full-width card — image left with overlay, text right */}
      <article
        className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] rounded-lg overflow-hidden border border-border cursor-pointer group shadow-sm hover:shadow-lg transition-shadow"
        onClick={() => onReadMore(featured)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onReadMore(featured);
          }
        }}
      >
        {/* ── Image panel with gradient overlay + title + controls ── */}
        <div className="relative min-h-[380px] lg:min-h-[480px] overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={currentImage ?? "placeholder"}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {currentImage ? (
                <SafeImage
                  src={currentImage}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  fallbackClassName="absolute inset-0"
                />
              ) : (
                <div className="absolute inset-0 bg-navy-900" />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Strong bottom gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-transparent pointer-events-none" />

          {/* Location + tag badges — top left */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            {featured.location?.city && (
              <span className="px-2.5 py-1 bg-navy-950/80 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                {featured.location.city}
                {featured.location.country_code ? `, ${featured.location.country_code}` : ""}
              </span>
            )}
            {(featured.tags ?? []).slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-gold-500/90 text-navy-950 text-[10px] font-bold uppercase tracking-wider rounded-full capitalize"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom overlay: date → title → read more → controls */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-16 z-10">
            <time className="text-[10px] text-white/50 mb-2 block uppercase tracking-wider">
              {formatDate(featured.date)}
            </time>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3 line-clamp-3 leading-snug group-hover:text-gold-300 transition-colors">
              {featured.title}
            </h3>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 group-hover:gap-3 transition-all mb-5">
              Read more <ArrowRight className="h-3.5 w-3.5" />
            </span>

            {/* Carousel controls: prev arrow · dots · next arrow */}
            {items.length > 1 && (
              <div
                className="flex items-center gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={prev}
                  aria-label="Previous article"
                  className="text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-full p-0.5"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-1.5">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      aria-label={`Article ${i + 1} of ${items.length}`}
                      className={cn(
                        "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                        i === currentIndex
                          ? "h-1.5 w-5 bg-gold-400"
                          : "h-1.5 w-1.5 bg-white/30 hover:bg-white/60",
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  aria-label="Next article"
                  className="text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-full p-0.5"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Text panel — same article ── */}
        <div className="bg-card p-7 lg:p-10 flex flex-col">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <time className="text-xs text-muted-foreground uppercase tracking-wider">
                {formatDate(featured.date)}
              </time>
              {(featured.tags ?? []).slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 bg-gold-500/10 text-gold-600 text-xs font-medium rounded-full capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="font-serif text-xl lg:text-2xl font-semibold text-foreground line-clamp-3 group-hover:text-gold-600 transition-colors leading-snug">
              {featured.title}
            </h3>

            {featured.subtitle && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {featured.subtitle}
              </p>
            )}

            {featured.body && (
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                {featured.body.replace(/<[^>]*>/g, "").trim().slice(0, 400)}
              </p>
            )}
          </div>

          <div className="mt-auto pt-5 border-t border-border">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-gold-600 transition-all group-hover:gap-3">
              Read more
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </article>
    </section>
  );
}
