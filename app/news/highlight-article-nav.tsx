"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const COUNTER_PAD = 2;

function pad(n: number) {
  return String(n).padStart(COUNTER_PAD, "0");
}

const ARROW_CLASS =
  "flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold-500 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500";

/** Article-level controls for the Highlights header: `01 / 03  ‹ ›`. */
export function HighlightArticleNav({
  current,
  total,
  onPrev,
  onNext,
}: {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <span
        aria-live="polite"
        className="font-serif text-sm tabular-nums text-muted-foreground"
      >
        <span className="text-foreground">{pad(current + 1)}</span> / {pad(total)}
      </span>
      <div className="flex items-center gap-1.5">
        <button onClick={onPrev} aria-label="Previous highlight" className={ARROW_CLASS}>
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button onClick={onNext} aria-label="Next highlight" className={ARROW_CLASS}>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
