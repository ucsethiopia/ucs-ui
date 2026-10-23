import { parseArticleId } from "@/lib/news";
import { ArticleModalRoute } from "./article-modal-route";

// Intercepts in-app navigation to /news/<slug> (a card click) and shows the
// article as a modal over the current page. Direct visits and shared links
// skip this and render the full page at app/news/[slug].
export default async function InterceptedArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticleModalRoute id={parseArticleId(slug)} href={`/news/${slug}`} />;
}
