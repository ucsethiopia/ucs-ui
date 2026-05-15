"use client";

import { ArrowRight, Globe } from "lucide-react";
import { SafeImage } from "@/components/shared/safe-image";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

function SpotlightCard({
  item,
  onReadMore,
}: {
  item: NewsItem;
  onReadMore: (item: NewsItem) => void;
}) {
  const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article
      className="group flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gold-500/30 hover:-translate-y-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
      onClick={() => onReadMore(item)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onReadMore(item);
        }
      }}
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {(item.extra_images?.[0] ?? item.main_image) ? (
          <SafeImage
            src={item.extra_images?.[0] ?? item.main_image ?? ""}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fallbackClassName="absolute inset-0"
          />
        ) : (
          <div className="absolute inset-0 bg-muted dark:bg-navy-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
        {item.location && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-navy-950/80 text-white text-xs font-medium rounded-full capitalize">
            <Globe className="h-3 w-3" />
            {item.location}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {(item.tags ?? ["News"]).slice(0, 2).map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gold-500/10 text-gold-600 text-xs font-medium rounded-full capitalize">
                {tag}
              </span>
            ))}
          </div>
          <time className="text-xs text-muted-foreground shrink-0">{formattedDate}</time>
        </div>

        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-gold-600 transition-colors">
          {item.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
          {item.subtitle}
        </p>

        <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-all group-hover:text-gold-600 group-hover:gap-3">
          Read more
          <ArrowRight className="h-4 w-4" />
        </span>
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

  return (
    <section className="py-10 border-b border-border">
      <div className="flex items-center gap-3 mb-6">
        <Globe className="h-5 w-5 text-gold-500 shrink-0" />
        <h2 className="font-serif text-xl font-semibold text-foreground">International Coverage</h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className={cn(
        "grid gap-6",
        items.length === 1 ? "grid-cols-1 max-w-sm" :
        items.length === 2 ? "grid-cols-1 sm:grid-cols-2" :
        "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      )}>
        {items.map((item) => (
          <SpotlightCard key={item.id} item={item} onReadMore={onReadMore} />
        ))}
      </div>
    </section>
  );
}
