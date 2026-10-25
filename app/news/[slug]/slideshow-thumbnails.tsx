"use client";

import { SafeImage } from "@/components/shared/safe-image";
import { cn } from "@/lib/utils";

/** Thumbnail strip under the article slideshow; the active photo is ringed in gold. */
export function SlideshowThumbnails({
  images,
  activeIndex,
  onSelect,
}: {
  images: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {images.map((src, i) => (
        <button
          key={src}
          onClick={() => onSelect(i)}
          aria-label={`Show photo ${i + 1}`}
          aria-current={i === activeIndex}
          className={cn(
            "relative h-14 w-20 sm:h-16 sm:w-24 shrink-0 overflow-hidden rounded-md border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
            i === activeIndex
              ? "border-gold-500 opacity-100"
              : "border-transparent opacity-50 hover:opacity-90"
          )}
        >
          <SafeImage
            src={src}
            alt=""
            fill
            sizes="96px"
            className="object-cover"
            fallbackClassName="absolute inset-0"
          />
        </button>
      ))}
    </div>
  );
}
