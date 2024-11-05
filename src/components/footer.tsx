"use client";
import React from "react";
import {
  IconBrandGithub,
  IconMail,
  IconBrandX,
  IconRss,
} from "@tabler/icons-react";
import Link from "next/link";
import { socialLinks } from "@/config";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-16 text-sm text-muted-foreground">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p>
          &copy; {YEAR} Clemens Hoffmann &nbsp;&middot;&nbsp;{" "}
          <Link href="/privacy">Privacy</Link> &middot;{" "}
          <Link href="/imprint">Imprint</Link>
        </p>
        <div className="flex gap-4">
          <Link href={socialLinks.email} className="hover:text-foreground">
            <IconMail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
          <Link href={socialLinks.twitter} className="hover:text-foreground">
            <IconBrandX className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href={socialLinks.github} className="hover:text-foreground">
            <IconBrandGithub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="/rss" className="hover:text-foreground">
            <IconRss className="h-5 w-5" />
            <span className="sr-only">Feed</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
