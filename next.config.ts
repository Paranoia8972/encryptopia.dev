import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
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
        source: "/sitemap",
        destination: "/sitemap.xml",
      },
      {
        source: "/imprint",
        destination: "/legal/imprint",
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
  poweredByHeader: false,
};

const withVercelToolbar = require("@vercel/toolbar/plugins/next")();
module.exports = withVercelToolbar(nextConfig);
// export default nextConfig;
