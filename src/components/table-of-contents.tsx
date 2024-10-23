"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    ).filter(
      (element) =>
        !element.classList.contains("title") &&
        element.id !== "table-of-contents" &&
        element.id !== "blog-post-title",
    );

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

  return (
    <div ref={tocRef} className="lg:sticky lg:top-24">
      <div className="mb-8 max-w-prose lg:hidden">
        <details className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <summary className="flex w-full cursor-pointer items-center justify-between px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
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
                    "inline-block text-sm transition-colors hover:text-primary",
                    activeId === heading.id
                      ? "font-medium text-primary"
                      : "text-muted-foreground",
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

      <nav className="hidden lg:block">
        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <h3 className="mb-4 font-semibold" id="table-of-contents">
            Table of Contents
          </h3>
          <ul className="space-y-3">
            {headings.map((heading, index) => (
              <li
                key={`${heading.id}-${index}`}
                style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
              >
                <Link
                  href={`#${heading.id}`}
                  className={cn(
                    "inline-block text-sm transition-colors hover:text-primary",
                    activeId === heading.id
                      ? "font-medium text-primary"
                      : "text-muted-foreground",
                  )}
                  onClick={() => setActiveId(heading.id)}
                >
                  {heading.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default TableOfContents;
