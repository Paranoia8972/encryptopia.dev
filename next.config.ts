import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "v0.dev",
      },
      {
        hostname: "picsum.photos",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/rss.xml",
        destination: "/feed/rss.xml",
      },
      {
        source: "/atom.xml",
        destination: "/feed/atom.xml",
      },
      {
        source: "/feed.json",
        destination: "/feed/feed.json",
      },
      {
        source: "/rss",
        destination: "/feed/rss.xml",
      },
      {
        source: "/feed",
        destination: "/feed/rss.xml",
      },
      {
        source: "/atom",
        destination: "/feed/atom.xml",
      },
      {
        source: "/json",
        destination: "/feed/feed.json",
      },
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
      },
      {
        source: "/imprint",
        destination: "/legal/imprint",
      },
      {
        source: "/privacy-policy",
        destination: "/legal/privacy-policy",
      },
      {
        source: "/privacy",
        destination: "/legal/privacy-policy",
      },
      {
        source: "/impressum",
        destination: "/legal/imprint",
      },
    ];
  },
};

export default nextConfig;
