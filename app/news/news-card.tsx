"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getMainTag, type NewsItem } from "@/hooks/use-news";
import { SafeImage } from "@/components/shared/safe-image";
import { articleHref } from "@/lib/news";
import { cn } from "@/lib/utils";

export function NewsCard({
  item,
  index,
  isVisible,
  headingLevel: Heading = "h2",
}: {
  item: NewsItem;
  index: number;
  isVisible: boolean;
  /** h2 on /news; h3 where the cards sit under their own section heading. */
  headingLevel?: "h2" | "h3";
}) {
  const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article
      className={cn(
        "group h-full bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gold-500/30 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-gold-500 focus-within:ring-offset-2",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{
        transitionDelay: isVisible ? `${Math.min(index, 8) * 75}ms` : "0ms",
      }}
    >
      <Link href={articleHref(item)} aria-label={item.title} className="flex flex-col h-full outline-none">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {(item.main_image ?? item.extra_images?.[0]) ? (
            <SafeImage
              src={item.main_image ?? item.extra_images?.[0] ?? ""}
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
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Category & Date */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-3 py-1 bg-gold-500/10 text-gold-600 text-xs font-medium rounded-full capitalize">
                {getMainTag(item)}
              </span>
            </div>
            <time className="text-xs text-muted-foreground shrink-0">{formattedDate}</time>
          </div>

          {/* Title */}
          <Heading className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-gold-600 transition-colors">
            {item.title}
          </Heading>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
            {item.subtitle ?? ""}
          </p>

          {/* Read more */}
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-all group-hover:text-gold-600 group-hover:gap-3">
            Read more
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}
