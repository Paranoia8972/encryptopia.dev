"use client";
import { highlight } from "sugar-high";

export default function Code({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const codeContent = children?.toString() || "";
  const isCodeBlock = codeContent.includes("\n");
  const codeHTML = isCodeBlock ? highlight(codeContent) : codeContent;

  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}
