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
