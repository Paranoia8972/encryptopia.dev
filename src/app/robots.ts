import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { metaData } from "@/config";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const domain =
    host in metaData.domains && typeof host === "string"
      ? metaData.domains[host as keyof typeof metaData.domains]
      : metaData.domains["clemensh.me"];
  const baseUrl = domain.baseUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${baseUrl}sitemap.xml`,
  };
}
