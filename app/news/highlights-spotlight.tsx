"use client";

import { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { getMainTag } from "@/hooks/use-news";
import type { NewsItem } from "@/lib/types";
import { HighlightArticleNav } from "./highlight-article-nav";
import { HighlightImagePanel } from "./highlight-image-panel";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Articles auto-advance (interval set by `.animate-highlight-progress` in
 * globals.css — the bar's animationend drives `next()`); images within an
 * article change only via the manual pill. Autoplay pauses on hover/focus,
 * while `paused` is set (e.g. modal open), and under reduced motion.
 */
export function HighlightsSpotlight({
  items,
  onReadMore,
  paused = false,
}: {
  items: NewsItem[];
  onReadMore: (item: NewsItem) => void;
  paused?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  // Bumped on any manual interaction to restart the autoplay bar
  const [cycleKey, setCycleKey] = useState(0);

  const featured = items[currentIndex] ?? items[0];

  const articleImages = useMemo(() => {
    const imgs: string[] = [];
    if (featured?.main_image) imgs.push(featured.main_image);
    for (const img of featured?.extra_images ?? []) {
      if (img) imgs.push(img);
    }
    return imgs;
  }, [featured]);

  if (items.length === 0) return null;

  const hasMultiple = items.length > 1;
  const formattedDate = formatDate(featured.date);

  const goTo = (index: number) => {
    setCurrentIndex((index + items.length) % items.length);
    setImageIndex(0);
  };
  const restartCycle = () => setCycleKey((k) => k + 1);
  const prev = () => {
    goTo(currentIndex - 1);
    restartCycle();
  };
  const next = () => {
    goTo(currentIndex + 1);
    restartCycle();
  };
  const stepImage = (delta: number) => {
    setImageIndex((i) => (i + delta + articleImages.length) % articleImages.length);
    restartCycle();
  };

  return (
    <section className="highlight-autoplay pb-8 mb-6 border-b border-border">
      <div className="flex items-center gap-4 mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold-600 shrink-0">
          Highlights
        </p>
        <div className="h-px flex-1 bg-border" />
        {hasMultiple && (
          <HighlightArticleNav
            current={currentIndex}
            total={items.length}
            onPrev={prev}
            onNext={next}
          />
        )}
      </div>

      {/* Full-width card — image left with overlay, text right */}
      <article
        className="relative grid grid-cols-1 lg:grid-cols-[3fr_2fr] rounded-lg overflow-hidden border border-border cursor-pointer group shadow-sm hover:shadow-lg transition-shadow"
        onClick={() => onReadMore(featured)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onReadMore(featured);
          }
        }}
      >
        {/* Autoplay progress — finishing the animation advances the article */}
        {hasMultiple && (
          <div
            key={`${currentIndex}-${cycleKey}`}
            aria-hidden
            data-paused={paused}
            onAnimationEnd={() => goTo(currentIndex + 1)}
            className="animate-highlight-progress absolute top-0 left-0 right-0 z-20 h-0.5 bg-gold-500"
          />
        )}

        <HighlightImagePanel
          item={featured}
          images={articleImages}
          imageIndex={imageIndex}
          formattedDate={formattedDate}
          onPrevImage={() => stepImage(-1)}
          onNextImage={() => stepImage(1)}
        />

        {/* ── Text panel — same article ── */}
        <div className="bg-card p-7 lg:p-10 flex flex-col">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <time className="text-xs text-muted-foreground uppercase tracking-wider">
                {formattedDate}
              </time>
              <span className="px-2.5 py-0.5 bg-gold-500/10 text-gold-600 text-xs font-medium rounded-full capitalize">
                {getMainTag(featured)}
              </span>
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
