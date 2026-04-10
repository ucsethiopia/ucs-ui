import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
