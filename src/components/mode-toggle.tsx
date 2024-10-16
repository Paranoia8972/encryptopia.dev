"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      changeGiscusTheme(savedTheme);
    }
  }, [setTheme]);

  function changeGiscusTheme(newTheme: string) {
    function sendMessage(message: { setConfig: { theme: any } }) {
      const iframe = document.querySelector("iframe.giscus-frame");
      if (!iframe) return;
      (iframe as HTMLIFrameElement).contentWindow?.postMessage(
        { giscus: message },
        "https://giscus.app"
      );
    }

    sendMessage({
      setConfig: {
        theme: newTheme,
      },
    });
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        const toggledTheme = theme === "light" ? "dark" : "light";
        setTheme(toggledTheme);
        localStorage.setItem("theme", toggledTheme);
        changeGiscusTheme(toggledTheme);
      }}
    >
      <SunIcon className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <MoonIcon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
