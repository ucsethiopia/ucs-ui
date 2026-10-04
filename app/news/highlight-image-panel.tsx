"use client";

import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SafeImage } from "@/components/shared/safe-image";
import { getMainTag } from "@/hooks/use-news";
import type { NewsItem } from "@/lib/types";

const IMAGE_ARROW_CLASS =
  "rounded-full p-0.5 text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500";

/** Image half of the Highlights card — crossfading images, manually controlled. */
export function HighlightImagePanel({
  item,
  images,
  imageIndex,
  formattedDate,
  onPrevImage,
  onNextImage,
}: {
  item: NewsItem;
  images: string[];
  imageIndex: number;
  formattedDate: string;
  onPrevImage: () => void;
  onNextImage: () => void;
}) {
  const currentImage = images[imageIndex];

  return (
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
              alt={item.title}
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
        {item.location?.city && (
          <span className="px-2.5 py-1 bg-navy-950/80 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
            {item.location.city}
            {item.location.country_code ? `, ${item.location.country_code}` : ""}
          </span>
        )}
        <span className="px-2.5 py-1 bg-gold-500/90 text-navy-950 text-[10px] font-bold uppercase tracking-wider rounded-full capitalize">
          {getMainTag(item)}
        </span>
      </div>

      {/* Bottom overlay: date → title → read more → image controls */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-16 z-10">
        <time className="text-[10px] text-white/50 mb-2 block uppercase tracking-wider">
          {formattedDate}
        </time>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3 line-clamp-3 leading-snug group-hover:text-gold-300 transition-colors">
          {item.title}
        </h3>
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 group-hover:gap-3 transition-all">
          Read more <ArrowRight className="h-3.5 w-3.5" />
        </span>

        {images.length > 1 && (
          <div
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy-950/70 px-2 py-1 backdrop-blur-sm"
            // Keep clicks/Enter on these buttons from opening the article modal
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <button onClick={onPrevImage} aria-label="Previous image" className={IMAGE_ARROW_CLASS}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[11px] font-semibold tabular-nums text-white/80">
              {imageIndex + 1}/{images.length}
            </span>
            <button onClick={onNextImage} aria-label="Next image" className={IMAGE_ARROW_CLASS}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
