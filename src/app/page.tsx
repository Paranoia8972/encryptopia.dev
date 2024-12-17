import Link from "next/link";
import { formatDate, getBlogPosts } from "@/lib/posts";

export default function Page() {
  const allBlogs = getBlogPosts();

  return (
    <main className="flex-grow">
      <article className="prose prose-neutral dark:prose-invert">
        <p>
          I&apos;m a 15 year old high school student in 10th grade. I love
          exploring and working with Servers (Minecraft, Linux), Web Development
          and Raspberry Pis projects.
        </p>
        <p>
          I enjoy self-hosting stuff, enhancing my ethical hacking skills, and
          contributing to open-source projects.
        </p>
      </article>
      <h2 className="mb-6 mt-12 text-lg font-medium text-gray-100">
        Recent Posts
      </h2>

      {allBlogs
        .sort((a, b) => {
          if (new Date(a.metadata.date) > new Date(b.metadata.date)) {
            return -1;
          }
          return 1;
        })
        .slice(0, 3)
        .map((post) => (
          <article
            key={post.slug}
            className="mb-2 flex flex-col items-baseline justify-between md:min-w-full md:flex-row lg:w-[690px]"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="mr-4 text-xl font-semibold text-gray-100 hover:text-emerald-500 md:w-full">
                {post.metadata.title}
              </h2>
            </Link>
            <time className="mt-2 text-sm text-gray-400 md:ml-4 md:mt-0">
              {formatDate(post.metadata.date, false)}
            </time>
          </article>
        ))}
    </main>
  );
}
