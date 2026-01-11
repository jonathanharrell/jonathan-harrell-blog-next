import NextMdx from "@next/mdx";
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  redirects() {
    return [
      {
        source: "/",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/rss.xml",
        destination: "/rss",
        permanent: true,
      },
    ];
  },
  images: {
    deviceSizes: [390, 600, 900, 1200, 1600],
    qualities: [40, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog.jonathanharrell.com",
        pathname: "/**",
      },
    ],
  },
  cacheComponents: true,
  // Exclude large asset directories from serverless function tracing
  outputFileTracingExcludes: {
    "*": ["public/assets/photos/**", "public/assets/art/**"],
  },
};

const withMdx = NextMdx({
  options: {},
});

export default withSentryConfig(withMdx(nextConfig), {
  org: "jonathan-harrell",
  project: "jonathanharrell-blog",
  silent: !process.env.CI,
  disableLogger: true,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
});
