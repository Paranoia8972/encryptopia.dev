"use client";
import React from "react";
import {
  IconBrandGithub,
  IconMail,
  IconBrandX,
  IconRss,
} from "@tabler/icons-react";
import { metaData, socialLinks } from "@/config";
import Link from "next/link";

const YEAR = new Date().getFullYear();

interface SocialLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

function SocialLink({ href, icon: Icon, label }: SocialLinkProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Icon className="size-5" />
      <span className="sr-only">{label}</span>
    </Link>
  );
}

function SocialLinks() {
  return (
    <div className="float-right mt-4 flex gap-3.5 text-lg transition-opacity duration-300 hover:opacity-90 md:mt-0">
      <SocialLink
        href={socialLinks.twitter}
        icon={IconBrandX}
        label="Twitter"
      />
      <SocialLink
        href={socialLinks.github}
        icon={IconBrandGithub}
        label="GitHub"
      />
      <SocialLink href={socialLinks.email} icon={IconMail} label="Email" />
      <SocialLink href="/rss" icon={IconRss} label="RSS Feed" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer>
      <div className="-mb-16 mt-14 flex flex-col items-center lg:-mb-48">
        <div className="mb-3 flex space-x-4">
          <SocialLinks />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          <time>&copy; {YEAR}</time>{" "}
          <Link
            className="no-underline"
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            {metaData.username}
          </Link>
          <span className="mx-1"> </span>
          <Link href="/imprint" className="no-underline">
            Imprint
          </Link>{" "}
          &middot;{" "}
          <Link href="/privacy" className="no-underline">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
