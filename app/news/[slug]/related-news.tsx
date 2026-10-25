import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { getRelatedArticles } from "@/lib/news-server";
import type { NewsItem } from "@/lib/types";
import { NewsCard } from "../news-card";

const RELATED_COUNT = 3;

/** "More news" grid under an article, reusing the /news card design. */
export async function RelatedNews({ item }: { item: NewsItem }) {
  const related = await getRelatedArticles(item, RELATED_COUNT);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-news-heading" className="border-t border-border bg-background py-14 sm:py-20">
      <Container>
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold-600 mb-2">Keep reading</p>
            <h2 id="related-news-heading" className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              More from UCS
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground transition-all hover:text-gold-600 hover:gap-3"
          >
            All news
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((other, index) => (
            <NewsCard key={other.id} item={other} index={index} isVisible headingLevel="h3" />
          ))}
        </div>
      </Container>
    </section>
  );
}
