"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const tocRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setActiveId(hash);
    }
    const elements = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    ).filter((element) => element.id !== "toc-ignore");
    const headings = elements.map((element) => ({
      id: element.id,
      text: element.textContent || "",
      level: parseInt(element.tagName.substring(1)),
    }));
    setHeadings(headings);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    const footer = document.querySelector("footer");
    if (footer) {
      const footerObserver = new IntersectionObserver(
        ([entry]) => {
          if (tocRef.current) {
            const tocRect = tocRef.current.getBoundingClientRect();
            const footerRect = entry.boundingClientRect;
            setIsStuck(footerRect.top > tocRect.bottom);
          }
        },
        { threshold: [1] },
      );
      footerObserver.observe(footer);
    }
    return () => {
      observer.disconnect();
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);
  if (!pathname.startsWith("/blog/")) {
    return null;
  }

  return (
    <div ref={tocRef} className="mt-8 lg:mt-0">
      <div className="mb-8 hidden max-w-prose">
        <details className="rounded-lg border border-gray-700 bg-gray-800 text-gray-300 shadow-sm">
          <summary className="flex w-full cursor-pointer items-center justify-between px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:ring-offset-gray-800">
            Table of Contents
            <ChevronDown className="ml-2 h-5 w-5" />
          </summary>
          <ul className="space-y-2 p-4">
            {headings.map((heading, index) => (
              <li
                key={`${heading.id}-${index}`}
                style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
              >
                <Link
                  href={`#${heading.id}`}
                  className={cn(
                    "inline-block text-sm transition-colors hover:text-emerald-400",
                    activeId === heading.id
                      ? "font-medium text-emerald-400"
                      : "text-gray-400",
                  )}
                  onClick={() => setActiveId(heading.id)}
                >
                  {heading.text}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </div>

      <nav className="mt-12 hidden lg:block">
        <h4 className="mb-4 tracking-tight text-gray-300" id="toc-ignore">
          On this page
        </h4>
        <ul className="space-y-3 border-l border-gray-700 pl-4">
          {headings.map((heading, index) => (
            <li
              key={`${heading.id}-${index}`}
              style={{ marginLeft: `${(heading.level - 1) * 0.5}rem` }}
            >
              <Link
                href={`#${heading.id}`}
                className={cn(
                  "inline-block text-sm transition-colors hover:text-emerald-400",
                  activeId === heading.id
                    ? "font-medium text-emerald-400"
                    : "text-gray-400",
                )}
                onClick={() => setActiveId(heading.id)}
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;
