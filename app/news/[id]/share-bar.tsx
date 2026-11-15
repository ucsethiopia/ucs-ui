"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Linkedin, Send, Share2 } from "lucide-react";
import { toast } from "sonner";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const COPIED_RESET_MS = 2000;

const BASE_BUTTON_CLASS =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground transition-colors hover:border-gold-500 hover:text-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500";
const ROW_BUTTON_CLASS = `${BASE_BUTTON_CLASS} px-3`;
const RAIL_BUTTON_CLASS = `${BASE_BUTTON_CLASS} w-9`;

type ShareBarVariant = "row" | "rail";

/**
 * Share actions for an article: copy link, LinkedIn, Telegram, and the device share sheet.
 * "row" shows labelled pills; "rail" is an icon-only vertical stack for the desktop side rail.
 */
export function ShareBar({
  path,
  title,
  variant = "row",
  className,
}: {
  path: string;
  title: string;
  variant?: ShareBarVariant;
  className?: string;
}) {
  const isRail = variant === "rail";
  const buttonClass = isRail ? RAIL_BUTTON_CLASS : ROW_BUTTON_CLASS;
  const labelClass = isRail ? "sr-only" : "hidden sm:inline";
  const url = `${SITE_URL}${path}`;
  const [copied, setCopied] = useState(false);
  // Detected after mount so server and client render the same markup.
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPIED_RESET_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied");
    } catch {
      toast.error("Couldn't copy the link");
    }
  };

  const nativeShare = () => {
    // Dismissing the share sheet rejects; nothing to report.
    navigator.share({ title, url }).catch(() => {});
  };

  const encodedUrl = encodeURIComponent(url);
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const telegramHref = `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(title)}`;

  return (
    <div className={cn("flex items-center gap-2", isRail ? "flex-col" : "flex-wrap", className)}>
      <button type="button" onClick={copyLink} className={buttonClass}>
        {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Link2 className="h-3.5 w-3.5" aria-hidden="true" />}
        <span className={isRail ? "sr-only" : undefined}>{copied ? "Copied" : "Copy link"}</span>
      </button>
      <a href={linkedinHref} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className={buttonClass}>
        <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
        <span className={labelClass}>LinkedIn</span>
      </a>
      <a href={telegramHref} target="_blank" rel="noopener noreferrer" aria-label="Share on Telegram" className={buttonClass}>
        <Send className="h-3.5 w-3.5" aria-hidden="true" />
        <span className={labelClass}>Telegram</span>
      </a>
      {canNativeShare && (
        <button type="button" onClick={nativeShare} aria-label="Share" className={buttonClass}>
          <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span className={labelClass}>Share</span>
        </button>
      )}
    </div>
  );
}
