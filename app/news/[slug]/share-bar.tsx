"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Linkedin, Send, Share2 } from "lucide-react";
import { toast } from "sonner";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const COPIED_RESET_MS = 2000;

const BUTTON_CLASS =
  "inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-semibold text-muted-foreground transition-colors hover:border-gold-500 hover:text-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500";

/** Share actions for an article: copy link, LinkedIn, Telegram, and the device share sheet. */
export function ShareBar({ path, title, className }: { path: string; title: string; className?: string }) {
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
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <button type="button" onClick={copyLink} className={BUTTON_CLASS}>
        {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Link2 className="h-3.5 w-3.5" aria-hidden="true" />}
        {copied ? "Copied" : "Copy link"}
      </button>
      <a href={linkedinHref} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className={BUTTON_CLASS}>
        <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">LinkedIn</span>
      </a>
      <a href={telegramHref} target="_blank" rel="noopener noreferrer" aria-label="Share on Telegram" className={BUTTON_CLASS}>
        <Send className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">Telegram</span>
      </a>
      {canNativeShare && (
        <button type="button" onClick={nativeShare} aria-label="Share" className={BUTTON_CLASS}>
          <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Share</span>
        </button>
      )}
    </div>
  );
}
