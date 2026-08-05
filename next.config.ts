import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { products } from "./src/data/products";

const turnstileHosts = "https://challenges.cloudflare.com";
const vercelInsights =
  "https://va.vercel-scripts.com https://vitals.vercel-insights.com";

const publicCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' " +
    vercelInsights +
    " " +
    turnstileHosts,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' " + vercelInsights + " " + turnstileHosts,
  "frame-src " + turnstileHosts,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const adminCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const nextConfig: NextConfig = {
  // Required for production Docker / EasyPanel images
  output: "standalone",
  async redirects() {
    return products.map((product) => ({
      source: `/products/${product.slug}`,
      destination: `/products?product=${product.slug}`,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          ...securityHeaders,
          { key: "Content-Security-Policy", value: adminCsp },
        ],
      },
      {
        source: "/cms-api/:path*",
        headers: [
          ...securityHeaders,
          { key: "Content-Security-Policy", value: adminCsp },
        ],
      },
      {
        source: "/:path*",
        headers: [
          ...securityHeaders,
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: publicCsp },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
