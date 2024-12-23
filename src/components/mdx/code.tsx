"use client";
import { highlight } from "sugar-high";
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  children: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const isInline = !children.includes("\n");
  const [inlineCopied, setInlineCopied] = useState(false);

  const copyInlineCode = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setInlineCopied(true);
      setTimeout(() => setInlineCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy inline code:", err);
    }
  };

  if (isInline) {
    return (
      <code
        onClick={copyInlineCode}
        className={`relative rounded bg-[var(--sh-bg)] px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${
          inlineCopied ? "text-emerald-500" : "text-gray-100"
        } cursor-pointer transition-colors before:content-[none] after:content-[none] hover:text-gray-300`}
      >
        {children}
      </code>
    );
  }

  const [copied, setCopied] = useState(false);
  const [languageClass] = (className || "").split(" ");
  const [language, title] = languageClass
    ? languageClass.replace("language-", "").split(":")
    : ["", ""];
  const highlightedCode = highlight(children);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      {language || title ? (
        <div className="flex items-center justify-between bg-[var(--sh-bg-2)] py-1 pl-3 pr-2">
          <div>
            {!title && language && (
              <span className="text-sm text-neutral-400">{language}</span>
            )}
            {title && <span className="text-sm text-neutral-400">{title}</span>}
          </div>
          <button
            onClick={copyToClipboard}
            className="aspect-square rounded p-[0.4rem] text-sm text-neutral-400 transition-colors hover:bg-[var(--sh-bg)] hover:text-neutral-300"
          >
            <span className="sr-only">Copy code</span>
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      ) : (
        <div className="absolute right-2 top-2 z-10">
          <button
            onClick={copyToClipboard}
            className="aspect-square rounded bg-[var(--sh-bg)] p-[0.4rem] text-sm text-neutral-400 transition-colors hover:bg-[var(--sh-bg-2)] hover:text-neutral-300"
          >
            <span className="sr-only">Copy code</span>
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      )}

      <div
        className="overflow-x-auto bg-[var(--sh-bg)] p-4"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
};

export default CodeBlock;
