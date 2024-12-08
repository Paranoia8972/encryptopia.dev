import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getBlogPosts, formatDate } from "@/lib/posts";
import { metaData } from "@/config";
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
    date: publishedTime,
    description: description,
  } = post.metadata;
  const ogImage = `${metaData.baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      publishedTime,
      images: [{ url: ogImage }],
    },
  };
}

export default async function Blog({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getBlogPosts().find((post) => post.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-grow">
      <Script
        type="application/ld+json"
        id="json-ld-script"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.metadata.title,
          datePublished: post.metadata.date,
          dateModified: post.metadata.date,
          description: post.metadata.description,
          image: `/og?title=${encodeURIComponent(post.metadata.title)}`,
          url: `${metaData.baseUrl}/blog/${post.slug}`,
          author: {
            "@type": "Person",
            name: metaData.name,
          },
        })}
      </Script>
      <div className="space-y-4">
        <article>
          <header className="mb-8 flex items-baseline justify-between lg:w-[690px]">
            <h2 className="text-lg font-medium text-gray-100" id="!toc-ignore">
              {post.metadata.title}
            </h2>
            <time className="text-sm text-gray-500">
              {formatDate(post.metadata.date, false)}
            </time>
          </header>
          <article className="prose dark:prose-invert prose-h1:text-2xl prose-h1:font-bold prose-h2:text-xl prose-h2:font-bold prose-h3:text-lg prose-h3:font-bold prose-h4:text-base prose-h5:text-sm prose-h6:text-xs">
            <CustomMDX source={post.content} />
          </article>
        </article>
      </div>
    </main>
  );
}
