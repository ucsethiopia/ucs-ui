"use client";

import { ArrowRight } from "lucide-react";
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

function cardKeyHandler(e: React.KeyboardEvent, cb: () => void) {
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
      className="group relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
      onClick={() => onReadMore(item)}
      tabIndex={0}
      onKeyDown={(e) => cardKeyHandler(e, () => onReadMore(item))}
    >
      {imageSrc ? (
        <SafeImage
          src={imageSrc}
          alt={item.title}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          fallbackClassName="absolute inset-0"
        />
      ) : (
        <div className="absolute inset-0 bg-navy-900" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent" />

      <div className="absolute top-4 left-4 flex items-center gap-2">
        {item.location && (
          <span className="px-2.5 py-1 bg-navy-950/80 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
            {item.location}
          </span>
        )}
        {(item.tags ?? []).slice(0, 1).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-gold-500/90 text-navy-950 text-[10px] font-bold uppercase tracking-wider rounded-full capitalize"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <time className="text-[10px] text-white/50 mb-2 block uppercase tracking-wider">
          {formatDate(item.date)}
        </time>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-4 line-clamp-4 group-hover:text-gold-300 transition-colors leading-snug">
          {item.title}
        </h3>
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 transition-all group-hover:gap-3">
          Read more <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </article>
  );
}

function ArticleListItem({
  item,
  onReadMore,
}: {
  item: NewsItem;
  onReadMore: (item: NewsItem) => void;
}) {
  return (
    <article
      className={cn(
        "group border-l-2 border-gold-500/30 pl-4 py-4 border-b border-border/50 last:border-b-0",
        "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2",
        "hover:border-l-gold-500 transition-colors",
      )}
      onClick={() => onReadMore(item)}
      tabIndex={0}
      onKeyDown={(e) => cardKeyHandler(e, () => onReadMore(item))}
    >
      <div className="flex items-center gap-2 mb-1.5">
        {item.location && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600">
            {item.location}
          </span>
        )}
        <span className="text-[10px] text-muted-foreground">
          · {formatDate(item.date)}
        </span>
      </div>
      <h3 className="font-serif text-sm font-semibold text-foreground line-clamp-2 group-hover:text-gold-600 transition-colors leading-snug">
        {item.title}
      </h3>
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
  const listItems = rest.slice(0, 4);

  return (
    <section className="py-10 mb-10 border-b border-border">
      <div className="flex items-center gap-4 mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-600 shrink-0">
          International
        </p>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div
        className={cn(
          "grid gap-8",
          listItems.length > 0
            ? "grid-cols-1 lg:grid-cols-[5fr_4fr]"
            : "grid-cols-1 max-w-sm",
        )}
      >
        <FeaturedCard item={featured} onReadMore={onReadMore} />
        {listItems.length > 0 && (
          <div className="flex flex-col">
            {listItems.map((item) => (
              <ArticleListItem key={item.id} item={item} onReadMore={onReadMore} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
