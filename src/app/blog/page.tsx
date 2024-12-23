import Link from "next/link";
import { formatDate, getBlogPosts } from "@/lib/posts";
import { metaData } from "@/config";

export const metadata = {
  title: `Blog - ${metaData.name}`,
  description: metaData.description,
};

export default function BlogPosts() {
  const allBlogs = getBlogPosts();

  const postsByYear = allBlogs.reduce(
    (acc, post) => {
      const year = new Date(post.metadata.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, typeof allBlogs>,
  );

  const sortedYears = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      {sortedYears.map((year) => (
        <div key={year}>
          <h2 className="mb-6 text-2xl font-bold text-gray-100">{year}</h2>
          {postsByYear[year]
            .sort((a, b) => {
              if (new Date(a.metadata.date) > new Date(b.metadata.date)) {
                return -1;
              }
              return 1;
            })
            .map((post) => (
              <article
                key={post.slug}
                className="mb-8 flex flex-col lg:w-[690px]"
              >
                <div className="flex items-center justify-between">
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-lg font-medium text-gray-100 hover:text-emerald-500">
                      {post.metadata.title}
                    </h2>
                  </Link>
                  <time className="mt-2 text-sm text-gray-400 sm:mt-2 md:mt-0">
                    {formatDate(post.metadata.date, false)}
                  </time>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  {post.metadata.description}
                </p>
              </article>
            ))}
        </div>
      ))}
    </>
  );
}
