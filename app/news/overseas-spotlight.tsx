"use client";

import { ArrowRight, Globe } from "lucide-react";
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

function cardKeyHandler(
  e: React.KeyboardEvent,
  cb: () => void,
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    cb();
  }
}

function FeaturedCard({
  item,
  onReadMore,
}: {
  item: NewsItem;
  onReadMore: (item: NewsItem) => void;
}) {
  const imageSrc = item.extra_images?.[0] ?? item.main_image;
  return (
    <article
      className="group relative aspect-[16/9] overflow-hidden rounded-xl cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
      onClick={() => onReadMore(item)}
      tabIndex={0}
      onKeyDown={(e) => cardKeyHandler(e, () => onReadMore(item))}
    >
      {imageSrc ? (
        <SafeImage
          src={imageSrc}
          alt={item.title}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          fallbackClassName="absolute inset-0"
        />
      ) : (
        <div className="absolute inset-0 bg-navy-900" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />

      <div className="absolute top-4 left-4 flex items-center gap-2">
        {item.location && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-navy-950/80 text-white text-xs font-medium rounded-full capitalize">
            <Globe className="h-3 w-3" />
            {item.location}
          </span>
        )}
        {(item.tags ?? []).slice(0, 1).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-gold-500/90 text-navy-950 text-xs font-semibold rounded-full capitalize"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <time className="text-xs text-white/60 mb-2 block">
          {formatDate(item.date)}
        </time>
        <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 line-clamp-3 group-hover:text-gold-300 transition-colors">
          {item.title}
        </h3>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition-all group-hover:gap-3">
          Read more <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

function SideCard({
  item,
  onReadMore,
}: {
  item: NewsItem;
  onReadMore: (item: NewsItem) => void;
}) {
  const imageSrc = item.extra_images?.[0] ?? item.main_image;
  return (
    <article
      className="group flex gap-4 py-4 border-b border-border last:border-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
      onClick={() => onReadMore(item)}
      tabIndex={0}
      onKeyDown={(e) => cardKeyHandler(e, () => onReadMore(item))}
    >
      <div className="relative w-24 h-20 shrink-0 rounded-md overflow-hidden bg-muted">
        {imageSrc ? (
          <SafeImage
            src={imageSrc}
            alt={item.title}
            fill
            sizes="96px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fallbackClassName="absolute inset-0"
          />
        ) : (
          <div className="absolute inset-0 bg-navy-900/20" />
        )}
      </div>
      <div className="flex flex-col justify-between min-w-0 flex-1">
        <h3 className="font-serif text-sm font-semibold text-foreground line-clamp-2 group-hover:text-gold-600 transition-colors leading-snug">
          {item.title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <time className="text-xs text-muted-foreground">
            {formatDate(item.date)}
          </time>
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold text-gold-600",
              "opacity-0 group-hover:opacity-100 transition-opacity",
            )}
          >
            Read <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function OverseasSpotlight({
  items,
  onReadMore,
}: {
  items: NewsItem[];
  onReadMore: (item: NewsItem) => void;
}) {
  if (items.length === 0) return null;

  const [featured, ...rest] = items;
  const sideItems = rest.slice(0, 4);

  return (
    <section className="py-12 border-b border-border">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2.5 shrink-0">
          <Globe className="h-5 w-5 text-gold-500" />
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            International Coverage
          </h2>
        </div>
        <div className="h-px flex-1 bg-gold-500/20" />
      </div>

      <div
        className={cn(
          "grid gap-6",
          sideItems.length > 0
            ? "grid-cols-1 lg:grid-cols-[3fr_2fr]"
            : "grid-cols-1",
        )}
      >
        <FeaturedCard item={featured} onReadMore={onReadMore} />
        {sideItems.length > 0 && (
          <div className="flex flex-col">
            {sideItems.map((item) => (
              <SideCard key={item.id} item={item} onReadMore={onReadMore} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
