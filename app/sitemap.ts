import type { MetadataRoute } from "next";
import { articleHref } from "@/lib/news";
import { getAllArticlesSafe } from "@/lib/news-server";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = ["/", "/about", "/services", "/team", "/news", "/contact"];

// Regenerated with the news cache so new articles appear without a deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticlesSafe();
  return [
    ...STATIC_ROUTES.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...articles.map((item) => ({
      url: `${SITE_URL}${articleHref(item)}`,
      lastModified: item.published_at ?? item.date,
    })),
  ];
}
