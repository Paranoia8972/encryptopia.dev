import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { formatDate, getBlogPosts } from "@/lib/posts";
import { metaData } from "@/config";
import { Comments } from "@/components/giscus";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import TableOfContents from "@/components/table-of-contents";
import Script from "next/script";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | undefined> {
  const resolvedParams = await params;
  const post = getBlogPosts().find((post) => post.slug === resolvedParams.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? image
    : `${metaData.baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      publishedTime,
      images: [
        {
          url: ogImage,
        },
      ],
    },
  };
}

export default async function Blog({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getBlogPosts().find((post) => post.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const tags = ["React", "Next.js", "Tailwind CSS"];
  return (
    <div className="container mx-auto max-w-prose px-4 py-8 lg:max-w-4xl">
      <Script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${metaData.baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${metaData.baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: metaData.name,
            },
          }),
        }}
      />
      <h1 className="mb-2 text-3xl font-bold" id="blog-post-title">
        {post.metadata.title}
      </h1>
      <div className="mb-6 flex items-center text-sm text-muted-foreground">
        <time dateTime={post.metadata.publishedAt}>
          {formatDate(post.metadata.publishedAt)}
        </time>
      </div>
      <div className="max-w-prose lg:flex lg:max-w-none lg:gap-8">
        <div className="max-w-prose lg:w-2/3">
          <div className="mb-6 aspect-[2/1] w-full max-w-prose overflow-hidden rounded-lg">
            <Image
              src={post.metadata.thumbnail}
              alt="AI concept image"
              width={600}
              height={300}
              className="h-full w-full border object-cover"
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {post.metadata.tags &&
              post.metadata.tags.split(",").map((tag) => (
                <Badge
                  key={tag}
                  className="text-xsm rounded-md bg-neutral-300 px-2 py-1 text-slate-950 hover:bg-neutral-300 dark:bg-[#2e3f5b] dark:text-slate-200"
                >
                  {tag.trim()}
                </Badge>
              ))}
          </div>
          <main className="max-w-prose lg:max-w-none">
            <article className="prose prose-sm prose-neutral prose-quoteless max-w-none dark:prose-invert sm:prose">
              <CustomMDX source={post.content} />
            </article>
          </main>
          <Comments />
        </div>
        <div className="mt-8 lg:mt-0">
          <TableOfContents />
        </div>
      </div>
    </div>
  );
}
