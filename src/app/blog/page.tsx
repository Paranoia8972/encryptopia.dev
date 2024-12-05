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
            if (new Date(a.metadata.date) > new Date(b.metadata.date)) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <article key={post.slug}>
              <header className="mb-4 flex items-baseline justify-between lg:w-[690px]">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-lg font-medium text-gray-100 hover:text-emerald-500">
                    {post.metadata.title}
                  </h2>
                </Link>
                <time className="text-sm text-gray-500">
                  {formatDate(post.metadata.date, false)}
                </time>
              </header>
            </article>
          ))}
      </div>
    </main>
  );
}
