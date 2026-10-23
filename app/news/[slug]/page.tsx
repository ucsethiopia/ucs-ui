import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Container } from "@/components/shared/container";
import { getArticleById } from "@/lib/news-server";
import { articleHref, articleSlug, getMainTag, parseArticleId } from "@/lib/news";
import type { NewsItem } from "@/lib/types";
import { ArticleBody } from "./article-body";
import { ArticleGallery } from "./article-gallery";

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

function articleImages(item: NewsItem): string[] {
  return [item.main_image, ...(item.extra_images ?? [])].filter((src): src is string =>
    Boolean(src)
  );
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

  const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main id="main-content">
      <header className="bg-navy-950 pt-32 pb-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm mb-8"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All news
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-5 text-xs text-white/60">
              <span className="px-3 py-1 rounded-full bg-gold-500/90 text-navy-950 font-bold uppercase tracking-wider">
                {getMainTag(item)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                <time dateTime={item.date}>{formattedDate}</time>
              </span>
              {item.team && (
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.team}
                </span>
              )}
            </div>
            <h1 className="font-serif font-bold text-white text-balance text-3xl sm:text-4xl lg:text-5xl leading-tight">
              {item.title}
            </h1>
            {item.subtitle && (
              <p className="mt-5 text-lg text-white/70 leading-relaxed">{item.subtitle}</p>
            )}
          </div>
        </Container>
      </header>

      <article className="bg-background py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <ArticleGallery images={articleImages(item)} title={item.title} />
            <div className="mx-auto max-w-3xl mt-10">
              {item.body && <ArticleBody body={item.body} />}
              <Link
                href="/news"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to all news
              </Link>
            </div>
          </div>
        </Container>
      </article>
    </main>
  );
}
