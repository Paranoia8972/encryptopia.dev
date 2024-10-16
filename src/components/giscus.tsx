"use client";
import Script from "next/script";
import React, { useEffect } from "react";

export function Comments() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);
  return (
    <>
      <div
        id="giscus-container"
        className={`giscus px-2 sm:px-4 md:px-6 lg:px-0`}
      >
        <Script
          src="https://giscus.app/client.js"
          data-repo="Paranoia8972/encryptopia.dev"
          data-repo-id="R_kgDOKXIhFA"
          data-category="Blog"
          data-category-id="DIC_kwDOKXIhFM4CjZCJ"
          data-mapping="title"
          data-strict="0"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="bottom"
          data-lang="en"
          data-theme={localStorage.getItem("theme") || "light"}
          crossOrigin="anonymous"
          async
        ></Script>
        <noscript className="text-lg text-red-500">
          Please enable JavaScript to view the comments powered by giscus.
        </noscript>
      </div>
    </>
  );
}
