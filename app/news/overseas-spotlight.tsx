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

  // Collect this article's own images only
  const articleImages = useMemo(() => {
    const imgs: string[] = [];
    if (featured?.main_image) imgs.push(featured.main_image);
    for (const img of featured?.extra_images ?? []) {
      if (img) imgs.push(img);
    }
    return imgs;
  }, [featured]);

  // Reset and restart image cycle whenever the article changes
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
    <section className="pb-10 mb-10 border-b border-border">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-600 shrink-0">
          International
        </p>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Arrows flank the entire card */}
      <div className="flex items-center gap-3 lg:gap-4">
        {items.length > 1 && (
          <button
            onClick={prev}
            aria-label="Previous article"
            className="shrink-0 h-10 w-10 flex items-center justify-center rounded-full border border-border bg-background hover:bg-muted hover:border-gold-500/50 transition-all text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        {/* Single article card: image left, text right */}
        <article
          className="flex-1 grid grid-cols-1 lg:grid-cols-2 rounded-lg overflow-hidden border border-border cursor-pointer group shadow-sm hover:shadow-lg transition-shadow"
          onClick={() => onReadMore(featured)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onReadMore(featured);
            }
          }}
        >
          {/* Image panel */}
          <div className="relative min-h-[280px] lg:min-h-[400px] overflow-hidden">
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
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    fallbackClassName="absolute inset-0"
                  />
                ) : (
                  <div className="absolute inset-0 bg-navy-900" />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Subtle gradient to pop the badges */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 via-transparent to-transparent pointer-events-none" />

            {/* Location + tag badges */}
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

            {/* Image cycle indicator dots */}
            {articleImages.length > 1 && (
              <div className="absolute bottom-4 left-4 flex gap-1 z-10">
                {articleImages.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      i === imageIndex ? "w-4 bg-white" : "w-1 bg-white/40",
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Text panel — same article */}
          <div className="bg-card p-7 lg:p-10 flex flex-col">
            <div className="flex-1 space-y-4">
              {/* Date + category tags */}
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

              {/* Title */}
              <h3 className="font-serif text-2xl lg:text-[1.65rem] font-bold text-foreground line-clamp-4 group-hover:text-gold-600 transition-colors leading-snug">
                {featured.title}
              </h3>

              {/* Subtitle teaser */}
              {featured.subtitle && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {featured.subtitle}
                </p>
              )}

              {/* Body excerpt — strips leading whitespace, shown when body is available */}
              {featured.body && (
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {featured.body.replace(/<[^>]*>/g, "").trim().slice(0, 400)}
                </p>
              )}
            </div>

            <div className="mt-auto pt-5 border-t border-border flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-gold-600 transition-all group-hover:gap-3">
                Read more
                <ArrowRight className="h-4 w-4" />
              </span>

              {/* Slide position dots */}
              {items.length > 1 && (
                <div className="flex items-center gap-1.5">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(i);
                      }}
                      aria-label={`Article ${i + 1} of ${items.length}`}
                      className={cn(
                        "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                        i === currentIndex
                          ? "h-1.5 w-5 bg-gold-500"
                          : "h-1.5 w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>

        {items.length > 1 && (
          <button
            onClick={next}
            aria-label="Next article"
            className="shrink-0 h-10 w-10 flex items-center justify-center rounded-full border border-border bg-background hover:bg-muted hover:border-gold-500/50 transition-all text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </section>
  );
}
