import Link from "next/link";
import type { BlogPost } from "@/lib/posts";

interface PostNavigationProps {
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export default function PostNavigation({
  prevPost,
  nextPost,
}: PostNavigationProps) {
  return (
    <nav className="mt-8 flex justify-between border-t border-gray-700/50 pt-8">
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.slug}`}
          className="flex flex-col items-start hover:text-emerald-400"
        >
          <span className="text-sm text-gray-500">Previous</span>
          <span className="text-lg">{prevPost.metadata.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="flex flex-col items-end hover:text-emerald-400"
        >
          <span className="text-sm text-gray-500">Next</span>
          <span className="text-lg">{nextPost.metadata.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
