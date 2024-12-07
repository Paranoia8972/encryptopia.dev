"use client";
import { highlight } from "sugar-high";
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  children: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
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
      {(language || title) && (
        <div className="flex items-center justify-between bg-[var(--sh-bg-2)] px-4 py-2">
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
