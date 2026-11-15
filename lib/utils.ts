import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Picks a grid column count for `count` items from `options` (checked in
 * order) that avoids a lonely single-item last row. Falls back to the first
 * option if no candidate avoids it (e.g. 13 items across 3s and 4s).
 *
 * Used for grids like "Meet Our Team" whose item count grows over time and
 * would otherwise sometimes land on an awkward orphaned last row (e.g. 7
 * items in 3 columns → 3, 3, 1).
 */
export function pickBalancedColumns(count: number, options: number[]): number {
  for (const cols of options) {
    if (count <= cols) return cols;
    if (count % cols !== 1) return cols;
  }
  return options[0];
}

/**
 * Validates that a URL uses a safe scheme (http/https).
 * Returns '#' for invalid or potentially dangerous URLs (e.g. javascript:).
 */
export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url, "https://placeholder.invalid");
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return url;
    }
    return "#";
  } catch {
    return "#";
  }
}

/** Minimum decimals shown for published rates (e.g. 16 → "16.00"). */
const RATE_MIN_FRACTION_DIGITS = 2;
/** Upper bound high enough that no source-provided precision is lost. */
const RATE_MAX_FRACTION_DIGITS = 20;

/**
 * Formats a published rate exactly as the source reports it: never rounds or
 * truncates, but pads to at least two decimals (5.453 → "5.453", 16 → "16.00").
 */
export function formatRate(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: RATE_MIN_FRACTION_DIGITS,
    maximumFractionDigits: RATE_MAX_FRACTION_DIGITS,
    useGrouping: false,
  });
}
