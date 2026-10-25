import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, User } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { getArticleById } from "@/lib/news-server";
import { articleHref, articleSlug, getMainTag, parseArticleId } from "@/lib/news";
import type { NewsItem } from "@/lib/types";
import { ArticleBody } from "./article-body";
import { ArticleSlideshow } from "./article-slideshow";
import { RelatedNews } from "./related-news";
import { ShareBar } from "./share-bar";

const DESCRIPTION_MAX_LENGTH = 160;
const WORDS_PER_MINUTE = 200;

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

function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
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
  const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main id="main-content">
      <PageHero
        eyebrow={getMainTag(item)}
        title={item.title}
        description={item.subtitle ?? undefined}
        titleSizeClassName="text-3xl sm:text-4xl lg:text-5xl leading-tight"
        descriptionClassName="mt-5"
      >
        <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
          <li className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gold-500" aria-hidden="true" />
            <time dateTime={item.date}>{formattedDate}</time>
          </li>
          {item.team && (
            <li className="inline-flex items-center gap-2">
              <User className="h-4 w-4 text-gold-500" aria-hidden="true" />
              {item.team}
            </li>
          )}
          {item.location?.city && (
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold-500" aria-hidden="true" />
              {item.location.city}
            </li>
          )}
          {item.body && (
            <li className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold-500" aria-hidden="true" />
              {readingMinutes(item.body)} min read
            </li>
          )}
        </ul>
      </PageHero>

      <div className="border-b border-border bg-background">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            All news
          </Link>
          <ShareBar path={href} title={item.title} />
        </Container>
      </div>

      <article className="bg-background py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-5xl">
            <ArticleSlideshow images={images} title={item.title} />
          </div>
          <div className="mx-auto max-w-3xl mt-10 sm:mt-14">
            {item.body && <ArticleBody body={item.body} />}
            <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-serif text-lg font-semibold text-foreground">Share this article</p>
              <ShareBar path={href} title={item.title} />
            </div>
          </div>
        </Container>
      </article>

      <RelatedNews item={item} />
    </main>
  );
}
