"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface SafeImageProps extends ImageProps {
  fallbackClassName?: string;
}

/**
 * Drop-in replacement for Next.js `<Image>` that gracefully handles
 * broken external URLs by swapping in a navy placeholder on error.
 */
export function SafeImage({
  fallbackClassName,
  className,
  alt,
  onError,
  ...props
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("bg-muted dark:bg-navy-900", fallbackClassName ?? className)}
      />
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
}
