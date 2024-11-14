"use client";
import React from "react";
import { Mail, Github, Twitter, Rss } from "lucide-react";
import Link from "next/link";
import { socialLinks } from "@/config";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer
      className={` ${pathname !== "/links" ? "mx-8 mt-16 md:ml-56" : "mx-2"}`}
    >
      <div className="flex flex-col items-center justify-between text-sm text-gray-400 md:flex-row">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Clemens Hoffmann
            &nbsp;&middot;&nbsp; <Link href="/privacy">Privacy</Link> &middot;{" "}
            <Link href="/imprint">Imprint</Link>
          </p>
        </div>
        <div className="flex gap-4">
          <Link href={socialLinks.email} className="hover:text-gray-300">
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
          <Link href={socialLinks.twitter} className="hover:text-gray-300">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href={socialLinks.github} className="hover:text-gray-300">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="/feed" className="hover:text-gray-300">
            <Rss className="h-5 w-5" />
            <span className="sr-only">Feed</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
