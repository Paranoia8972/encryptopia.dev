"use client";
import Script from "next/script";
import React, { useEffect } from "react";

export function Comments() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme =
        localStorage.getItem("theme") || "preferred_color_scheme";
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);
  return (
    <>
      <div id="giscus-container" className="giscus max-w-prose pt-8 sm:pt-16">
        <Script
          src="https://giscus.app/client.js"
          data-repo="Paranoia8972/encryptopia.dev"
          data-repo-id="R_kgDONAEZkA"
          data-category="Blog"
          data-category-id="DIC_kwDONAEZkM4CjdGR"
          data-mapping="title"
          data-strict="0"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="bottom"
          data-lang="en"
          data-theme={
            typeof window !== "undefined"
              ? localStorage.getItem("theme") || "preferred_color_scheme"
              : "preferred_color_scheme"
          }
          crossOrigin="anonymous"
          async
        />
        <noscript className="text-base text-red-500 sm:text-lg">
          Please enable JavaScript to view the comments powered by giscus.
        </noscript>
      </div>
    </>
  );
}
