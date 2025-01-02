import { headers } from "next/headers";
import { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/posts";
import { metaData } from "@/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const domain =
    host in metaData.domains && typeof host === "string"
      ? metaData.domains[host as keyof typeof metaData.domains]
      : metaData.domains["clemensh.me"];
  const baseUrl = domain.baseUrl;

  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}blog/${post.slug}`,
    lastModified: post.metadata.date,
  }));

  const routes = [
    "",
    "blog",
    "projects",
    "privacy",
    "imprint",
    "links",
    "misc",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
