import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { getArticleById } from "@/lib/news-server";
import { articleHref, articleSlug, getMainTag, parseArticleId } from "@/lib/news";
import type { NewsItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArticleBody } from "./article-body";
import { ArticleMeta } from "./article-meta";
import { ArticleSlideshow } from "./article-slideshow";
import { RelatedNews } from "./related-news";
import { ShareBar } from "./share-bar";

const DESCRIPTION_MAX_LENGTH = 160;

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function loadArticle(slug: string): Promise<NewsItem | null> {
  const id = parseArticleId(slug);
  return id === null ? null : getArticleById(id);
}

function describe(item: NewsItem): string {
  const source = item.subtitle?.trim() || item.body.replace(/\s+/g, " ").trim();
  return source.length > DESCRIPTION_MAX_LENGTH
    ? `${source.slice(0, DESCRIPTION_MAX_LENGTH - 1).trimEnd()}…`
    : source;
}

/** Main image first, then extras; blanks and repeats (the feed sometimes lists the main image again) dropped. */
function articleImages(item: NewsItem): string[] {
  const all = [item.main_image, ...(item.extra_images ?? [])].filter((src): src is string =>
    Boolean(src)
  );
  return Array.from(new Set(all));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const item = await loadArticle((await params).slug);
  if (!item) return { title: "Article not found | UCS Ethiopia" };

  const description = describe(item);
  const images = articleImages(item).slice(0, 1);
  const url = articleHref(item);

  return {
    title: `${item.title} | UCS Ethiopia`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: item.title,
      description,
      publishedTime: item.published_at ?? item.date,
      tags: item.tags,
      ...(images.length > 0 && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description,
      ...(images.length > 0 && { images }),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const item = await loadArticle(slug);
  if (!item) notFound();
  // Headline edited since the link was shared → send to the current URL.
  if (slug !== articleSlug(item)) permanentRedirect(articleHref(item));

  const href = articleHref(item);
  const images = articleImages(item);
  const hasImages = images.length > 0;

  return (
    <main id="main-content">
      <PageHero
        eyebrow={getMainTag(item)}
        title={item.title}
        description={item.subtitle ?? undefined}
        titleSizeClassName="text-3xl sm:text-4xl lg:text-5xl leading-tight"
        descriptionClassName="mt-5 max-w-4xl"
        contentWrapperClassName="max-w-6xl"
        className={hasImages ? "pb-28 sm:pb-44 lg:pb-56" : undefined}
        topContent={
          <Link
            href="/news"
            className="group mb-8 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-white/70 transition-colors hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            All news
          </Link>
        }
      >
        <ArticleMeta item={item} />
      </PageHero>

      <article className={cn("bg-background pb-14 sm:pb-20", !hasImages && "pt-10 sm:pt-14")}>
        <Container>
          {hasImages && (
            // Pulled up so the photo straddles the hero's bottom edge.
            <div className="relative z-10 mx-auto max-w-5xl -mt-20 sm:-mt-32 lg:-mt-44">
              <ArticleSlideshow images={images} title={item.title} />
            </div>
          )}
          <div className="mt-10 sm:mt-14 lg:grid lg:grid-cols-[1fr_minmax(0,48rem)_1fr] lg:gap-10">
            <aside className="hidden lg:block justify-self-end" aria-label="Share this article">
              <div className="sticky top-28 flex flex-col items-center gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Share</p>
                <ShareBar path={href} title={item.title} variant="rail" />
              </div>
            </aside>
            <div className="mx-auto max-w-3xl lg:mx-0 lg:max-w-none">
              {item.body && <ArticleBody body={item.body} />}
              <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between lg:hidden">
                <p className="font-serif text-lg font-semibold text-foreground">Share this article</p>
                <ShareBar path={href} title={item.title} />
              </div>
            </div>
          </div>
        </Container>
      </article>

      <RelatedNews item={item} />
    </main>
  );
}
