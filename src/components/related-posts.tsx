import Link from "next/link";
import { getBlogPosts } from "@/lib/posts";
import { formatDate } from "@/lib/posts";

interface RelatedPostsProps {
  currentSlug: string;
  tags: string | string[];
}

export function RelatedPosts({ currentSlug, tags }: RelatedPostsProps) {
  const tagArray = Array.isArray(tags) ? tags : JSON.parse(tags);
  const posts = getBlogPosts();

  const relatedPosts = posts
    .filter((post) => {
      if (post.slug === currentSlug) return false;

      const postTags = Array.isArray(post.metadata.tags)
        ? post.metadata.tags
        : post.metadata.tags
          ? JSON.parse(post.metadata.tags as string)
          : [];

      return postTags.some((tag: string) => tagArray.includes(tag));
    })
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 border-t border-neutral-700/40 pt-8">
      <h2 className="mb-4 text-xl font-semibold" id="toc-ignore">
        Related Posts
      </h2>
      <div className="space-y-4">
        {relatedPosts.map((post) => (
          <article key={post.slug} className="group">
            <Link
              href={`/blog/${post.slug}`}
              className="flex flex-col space-y-1"
            >
              <h3
                className="font-medium text-neutral-100 group-hover:text-emerald-500"
                id="toc-ignore"
              >
                {post.metadata.title}
              </h3>
              <p className="line-clamp-2 text-sm text-neutral-400">
                {post.metadata.description}
              </p>
              <time className="text-sm text-neutral-500">
                {formatDate(post.metadata.date)}
              </time>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
