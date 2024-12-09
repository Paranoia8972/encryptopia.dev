import Link from "next/link";
import { formatDate, getBlogPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog",
  description: "Nextfolio Blog",
};

export default function BlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <>
      {allBlogs
        .sort((a, b) => {
          if (new Date(a.metadata.date) > new Date(b.metadata.date)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <article
            key={post.slug}
            className="mb-4 flex flex-col items-baseline justify-between md:min-w-full md:flex-row lg:w-[690px]"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="mr-4 text-lg font-medium text-gray-100 hover:text-emerald-500 md:w-full">
                {post.metadata.title}
              </h2>
            </Link>
            <time className="mt-2 text-sm text-gray-500 md:ml-4 md:mt-0">
              {formatDate(post.metadata.date, false)}
            </time>
          </article>
        ))}
    </>
  );
}
