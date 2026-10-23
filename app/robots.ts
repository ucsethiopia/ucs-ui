import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/site";

// When indexing is off, crawling stays allowed on purpose: pages carry a
// noindex tag instead (see app/layout.tsx), which keeps them out of search
// while still letting link-preview bots (LinkedIn honours robots.txt) build
// cards for testing.
export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    return { rules: { userAgent: "*", allow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
