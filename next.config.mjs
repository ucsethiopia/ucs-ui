/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";
import path from "path";
import { fileURLToPath } from "url";

// Get the absolute path to the current directory (ESM way)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_DOMAINS = [
  process.env.NEXT_PUBLIC_MARKET_DATA_API_URL,
  process.env.NEXT_PUBLIC_UCS_SERVICE_API_URL,
].filter(Boolean);

const isDev = process.env.NODE_ENV === "development";

const cspHeader = [
  "default-src 'self'",
  // Add 'unsafe-eval' ONLY in development mode
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: *.backblazeb2.com",
  "font-src 'self'",
  `connect-src 'self' ${API_DOMAINS.join(" ")}`,
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspHeader },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.backblazeb2.com",
      },
    ],
  },
  // FIX: Moved to top-level and used absolute path
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

// Only apply the analyzer if we are NOT using the --turbopack flag (default in v16)
// or if we explicitly force webpack via the CLI.
export default process.env.ANALYZE === "true" && !process.env.TURBO
  ? withBundleAnalyzer({ enabled: true })(nextConfig)
  : nextConfig;
