import Link from "next/link";
import { formatDate, getBlogPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog",
  description: "Nextfolio Blog",
};

export default function BlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <div className="mt-16 flex min-h-screen justify-center">
      <section className="w-full max-w-[640px] px-4">
        <h1 className="mb-8 text-2xl font-medium tracking-tight">My Blog</h1>
        <div>
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
              <Link
                key={post.slug}
                className="mb-4 flex flex-col space-y-1 transition-opacity duration-200 hover:opacity-80"
                href={`/blog/${post.slug}`}
              >
                <div className="flex w-full flex-col items-start justify-between space-y-1 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                  <p className="tracking-tight text-black dark:text-white">
                    {post.metadata.title}
                  </p>
                  <p className="text-sm tabular-nums text-neutral-600 dark:text-neutral-400">
                    {formatDate(post.metadata.publishedAt, false)}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
