"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NewsModal } from "@/components/home/news-modal";
import { getRememberedNews } from "@/lib/news-store";

/** Article modal driven by the URL: closing it navigates back to the list. */
export function ArticleModalRoute({ id, href }: { id: number | null; href: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const news = id === null ? null : getRememberedNews(id);

  // The card that linked here always loaded the article first; if not (an
  // unexpected entry point), fall back to the full server-rendered page.
  useEffect(() => {
    if (!news) window.location.assign(href);
  }, [news, href]);

  return (
    <NewsModal
      news={news}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onExitComplete={() => router.back()}
    />
  );
}
