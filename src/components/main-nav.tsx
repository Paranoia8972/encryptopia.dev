"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { metaData } from "@/config";

export function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="font-bold">{metaData.title}</span>
      </Link>
      <Link
        href="/blog"
        className={cn(
          "hidden text-sm font-medium transition-colors hover:text-primary sm:inline-block",
          pathname === "/blog" ? "text-foreground" : "text-foreground/60",
        )}
      >
        Blog
      </Link>
      <Link
        href="/projects"
        className={cn(
          "hidden text-sm font-medium transition-colors hover:text-primary sm:inline-block",
          pathname === "/projects" ? "text-foreground" : "text-foreground/60",
        )}
      >
        Projects
      </Link>
      <Link
        href="/gallery"
        className={cn(
          "hidden text-sm font-medium transition-colors hover:text-primary sm:inline-block",
          pathname === "/gallery" ? "text-foreground" : "text-foreground/60",
        )}
      >
        Gallery
      </Link>
    </nav>
  );
}
