import Link from "next/link";
import { formatDate, getBlogPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog",
  description: "Nextfolio Blog",
};

export default function BlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <main className="flex-grow">
      <div className="space-y-4">
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <article
              key={post.slug}
              className="flex items-baseline justify-between"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="text-gray-100 hover:text-emerald-500"
              >
                <h2 className="text-lg font-medium tracking-tight">
                  {post.metadata.title}
                </h2>
              </Link>
              <time className="text-sm text-gray-500">
                {formatDate(post.metadata.publishedAt, false)}
              </time>
            </article>
          ))}
      </div>
    </main>
  );
}
