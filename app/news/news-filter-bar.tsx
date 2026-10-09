"use client";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";

export type LocationFilter = "All" | "Local" | "Overseas";

const LOCATIONS: LocationFilter[] = ["All", "Local", "Overseas"];
const CATEGORY_SKELETON_COUNT = 6;

interface NewsFilterBarProps {
  loading: boolean;
  categories: string[];
  selectedLocation: LocationFilter;
  selectedCategory: string;
  onLocationChange: (location: LocationFilter) => void;
  onCategoryChange: (category: string) => void;
}

export function NewsFilterBar({
  loading,
  categories,
  selectedLocation,
  selectedCategory,
  onLocationChange,
  onCategoryChange,
}: NewsFilterBarProps) {
  return (
    <section className="sticky top-19 z-30 bg-background">
      <Container>
        <div className="flex items-center pt-4 pb-6 border-b border-border">
          {/* Location pills */}
          <div className="shrink-0 flex gap-2">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => onLocationChange(loc)}
                aria-pressed={selectedLocation === loc}
                className={cn(
                  "px-4 py-1.5 text-sm font-semibold rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2",
                  selectedLocation === loc
                    ? "bg-gold-500 text-navy-950"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="h-5 w-px bg-border mx-4 shrink-0" />

          {/* Category filters — editorial underline style */}
          <div className="flex-1 min-w-0 flex items-center gap-5 overflow-x-auto scrollbar-hide">
            {loading ? (
              Array.from({ length: CATEGORY_SKELETON_COUNT }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-16 shrink-0 rounded bg-muted animate-pulse"
                />
              ))
            ) : (
              categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  aria-pressed={selectedCategory === category}
                  className={cn(
                    "shrink-0 px-1 pb-1 text-sm font-medium capitalize border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2",
                    selectedCategory === category
                      ? "border-gold-500 text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {category}
                </button>
              ))
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
