import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getBlogPosts, formatDate } from "@/lib/posts";
import { metaData } from "@/config";
import Script from "next/script";
import PostNavigation from "@/components/post-navigation";
import { headers } from "next/headers";
// import { RelatedPosts } from "@/components/related-posts";

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

  const headersList = await headers();
  const host = headersList.get("host") || "";
  const domain =
    host in metaData.domains && typeof host === "string"
      ? metaData.domains[host as keyof typeof metaData.domains]
      : metaData.domains["clemensh.me"];
  const baseUrl = domain.baseUrl;

  const {
    title,
    date: publishedTime,
    description: description,
  } = post.metadata;
  const ogImage = `${baseUrl}og?title=${encodeURIComponent(title)}`;

  return {
    title: `${title} - ${metaData.name}`,
    description,
    openGraph: {
      title: `${title} - ${metaData.name}`,
      description,
      publishedTime,
      images: [{ url: ogImage }],
    },
  };
}

export default async function Blog({ params }: PageProps) {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const domain =
    host in metaData.domains && typeof host === "string"
      ? metaData.domains[host as keyof typeof metaData.domains]
      : metaData.domains["clemensh.me"];
  const baseUrl = domain.baseUrl;

  const resolvedParams = await params;
  const posts = getBlogPosts();
  const currentIndex = posts.findIndex(
    (post) => post.slug === resolvedParams.slug,
  );
  const post = posts[currentIndex];

  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const prevPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  if (!post) {
    notFound();
  }

  return (
    <>
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
          url: `${baseUrl}/blog/${post.slug}`,
          author: {
            "@type": "Person",
            name: metaData.name,
          },
        })}
      </Script>
      <article key={post.slug} className="mb-8 flex flex-col lg:w-[690px]">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium text-gray-100">
            {post.metadata.title}
          </h1>
          <time className="mt-2 text-sm text-gray-400 sm:mt-2 md:mt-0">
            {formatDate(post.metadata.date, false)}
          </time>
        </div>
      </article>
      <article className="prose dark:prose-invert prose-h1:text-2xl prose-h1:font-bold prose-h2:text-xl prose-h2:font-bold prose-h3:text-lg prose-h3:font-bold prose-h4:text-base prose-h5:text-sm prose-h6:text-xs">
        <CustomMDX source={post.content} />
      </article>
      <PostNavigation prevPost={prevPost} nextPost={nextPost} />
      {/* <RelatedPosts currentSlug={post.slug} tags={post.metadata.tags} /> */}
    </>
  );
}
