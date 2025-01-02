import { Feed } from "feed";
import { getBlogPosts } from "@/lib/posts";
import { metaData } from "@/config";
import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

export async function generateStaticParams() {
  return [
    { format: "rss.xml" },
    { format: "atom.xml" },
    { format: "feed.json" },
  ];
}

type Params = Promise<{ format: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { format } = await params;
  const validFormats = ["rss.xml", "atom.xml", "feed.json"];
  if (!validFormats.includes(format)) {
    return NextResponse.json(
      { error: "Unsupported feed format" },
      { status: 404 },
    );
  }

  const headersList = await headers();
  const host = headersList.get("host") || "";
  const domain =
    host in metaData.domains && typeof host === "string"
      ? metaData.domains[host as keyof typeof metaData.domains]
      : metaData.domains["clemensh.me"];
  const baseUrl = domain.baseUrl;

  const feed = new Feed({
    title: metaData.title,
    description: metaData.description,
    id: baseUrl,
    link: baseUrl,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${
      metaData.title
    }`,
    generator: "Feed for Node.js",
    feedLinks: {
      json: `${baseUrl}feed.json`,
      atom: `${baseUrl}atom.xml`,
      rss: `${baseUrl}rss.xml`,
    },
  });

  const allPosts = await getBlogPosts();

  allPosts.forEach((post) => {
    const postUrl = `${baseUrl}blog/${post.slug}`;
    const categories = post.metadata.tags
      ? post.metadata.tags.split(",").map((tag) => tag.trim())
      : [];

    feed.addItem({
      title: post.metadata.title,
      id: postUrl,
      link: postUrl,
      description: post.metadata.description,
      category: categories.map((tag) => ({
        name: tag,
        term: tag,
      })),
      date: new Date(post.metadata.date),
    });
  });

  const responseMap: Record<string, { content: string; contentType: string }> =
    {
      "rss.xml": { content: feed.rss2(), contentType: "application/xml" },
      "atom.xml": { content: feed.atom1(), contentType: "application/xml" },
      "feed.json": { content: feed.json1(), contentType: "application/json" },
    };

  const response = responseMap[format];

  return new NextResponse(response.content, {
    headers: {
      "Content-Type": response.contentType,
    },
  });
}
