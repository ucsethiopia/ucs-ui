"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { SafeImage } from "@/components/shared/safe-image";
import { cn } from "@/lib/utils";

const ARROW_CLASS =
  "absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 disabled:opacity-0 disabled:pointer-events-none";

const IMAGE_SIZES = "(max-width: 896px) 100vw, 896px";

/** Article images: a single image, or a swipeable carousel when there are several. */
export function ArticleGallery({ images, title }: { images: string[]; title: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [slideIndex, setSlideIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(images.length > 1);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSlideIndex(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <SafeImage
          src={images[0]}
          alt={title}
          fill
          priority
          sizes={IMAGE_SIZES}
          className="object-contain"
          fallbackClassName="absolute inset-0"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((src, i) => (
            <div key={src} className="relative flex-[0_0_100%] h-full">
              <SafeImage
                src={src}
                alt={`${title} (image ${i + 1} of ${images.length})`}
                fill
                priority={i === 0}
                sizes={IMAGE_SIZES}
                className="object-contain"
                fallbackClassName="absolute inset-0"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canPrev}
        aria-label="Previous image"
        className={cn(ARROW_CLASS, "left-3")}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canNext}
        aria-label="Next image"
        className={cn(ARROW_CLASS, "right-3")}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute top-3 left-4 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full tabular-nums">
        {slideIndex + 1} / {images.length}
      </div>
    </div>
  );
}
