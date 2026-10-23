// Canonical public origin (no trailing slash), from NEXT_PUBLIC_SITE_URL.
// Used for metadataBase, robots and sitemap. Fails loudly when unset so a
// deploy can never ship canonical/OG URLs pointing at the wrong host.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (!siteUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL is not set");
}
export const SITE_URL = siteUrl.replace(/\/+$/, "");

// Search indexing is opt-in: set ALLOW_INDEXING=true only on the real
// production domain. Not tied to VERCEL_ENV, because dev.ucsethiopia.com is
// currently served as the Vercel "production" deployment.
export const ALLOW_INDEXING = process.env.ALLOW_INDEXING === "true";
