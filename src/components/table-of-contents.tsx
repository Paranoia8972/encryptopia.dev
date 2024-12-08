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
  const [hasFoundHeading, setHasFoundHeading] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const updateOpenState = (newState: boolean) => {
    setIsOpen(newState);
    if (detailsRef.current) {
      detailsRef.current.open = newState;
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    updateOpenState(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node)
      ) {
        updateOpenState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
          setHasFoundHeading(true);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-20% 0px -80% 0px",
    });

    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const setInitialActiveHeading = () => {
      const headings = Array.from(
        document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
      );

      if (headings.length === 0) {
        return;
      }

      const topHeading = headings.reduce((nearest, current) => {
        try {
          const currentRect = current.getBoundingClientRect();
          const nearestRect = nearest.getBoundingClientRect();

          return currentRect.top < nearestRect.top ? current : nearest;
        } catch (error) {
          return nearest;
        }
      }, headings[0]);

      if (topHeading) {
        setActiveId(topHeading.id);
        setHasFoundHeading(true);
      }
    };

    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setActiveId(hash);
      setHasFoundHeading(true);
    } else {
      setInitialActiveHeading();
    }
  }, [pathname]);

  const handleHeadingClick = (id: string) => {
    setActiveId(id);
    setHasFoundHeading(true);
  };

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

    let currentRootMargin = "40% 0px -60% 0px";

    const createObserver = (rootMargin: string) => {
      return new IntersectionObserver(
        (entries) => {
          const visibleEntry = entries.find((entry) => entry.isIntersecting);
          if (visibleEntry) {
            setActiveId(visibleEntry.target.id);
            setHasFoundHeading(true);

            if (rootMargin !== "10% 0px -80% 0px") {
              const normalObserver = createObserver("10% 0px -80% 0px");
              elements.forEach((element) => {
                observer.unobserve(element);
                normalObserver.observe(element);
              });
            }
          }
        },
        { rootMargin },
      );
    };

    let observer = createObserver(currentRootMargin);
    elements.forEach((element) => observer.observe(element));

    const timeout = setTimeout(() => {
      if (!hasFoundHeading) {
        observer.disconnect();
        observer = createObserver("60% 0px -40% 0px");
        elements.forEach((element) => observer.observe(element));
      }
    }, 500);

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
      clearTimeout(timeout);
      observer.disconnect();
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [hasFoundHeading]);

  useEffect(() => {
    const collectHeadings = () => {
      const elements = Array.from(
        document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
      ).filter((element) => element.id !== "toc-ignore");

      const newHeadings = elements.map((element) => ({
        id: element.id,
        text: element.textContent || "",
        level: parseInt(element.tagName.substring(1)),
      }));

      setHeadings(newHeadings);
    };

    collectHeadings();

    const timeoutId = setTimeout(collectHeadings, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  if (!pathname.startsWith("/blog/")) {
    return null;
  }
  if (headings.length === 0) {
    return null;
  }

  return (
    <div ref={tocRef} className="mt-8 lg:mt-0">
      <div className="fixed bottom-4 left-1/2 z-50 w-auto max-w-[90%] -translate-x-1/2 md:hidden">
        <details
          ref={detailsRef}
          open={isOpen}
          className="overflow-hidden rounded-3xl border border-gray-700/50 bg-[#0d1117] text-gray-300 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out"
        >
          <summary
            className="flex w-full cursor-pointer items-center justify-between px-6 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-[#0d1117]"
            onClick={handleToggle}
          >
            On this page
            <ChevronDown
              className={`ml-2 h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </summary>
          <ul className="mt-2 max-h-[50vh] space-y-2 overflow-y-auto rounded-b-2xl bg-[#0d1117] p-4">
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
                  onClick={() => handleHeadingClick(heading.id)}
                >
                  {heading.text}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </div>

      <nav className="mt-12 hidden md:block">
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
                onClick={() => handleHeadingClick(heading.id)}
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
