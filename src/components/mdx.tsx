import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import { TweetComponent } from "./mdx/tweet";
import { CaptionComponent } from "./mdx/caption";
import { YouTubeComponent } from "./mdx/youtube";
import { ImageGrid } from "./image-grid";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { Callout } from "./mdx/callout";
import { ImageProps } from "next/image";
import { AnchorHTMLAttributes } from "react";
import remarkGfm from "remark-gfm";
import { Disclosure } from "./mdx/disclosure";
import { Tab, Tabs } from "./mdx/tabs";

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

function CustomLink(props: CustomLinkProps) {
  const href = props.href;
  if (href && href.startsWith("/")) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    );
  }
  if (href && href.startsWith("#")) {
    return <a {...props} />;
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: ImageProps) {
  const { alt, ...rest } = props;
  return <Image alt={alt} className="rounded-lg" {...rest} />;
}

function Code({
  children,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  const codeHTML = highlight(children?.toString() || "");
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
  const Heading = (props: React.HTMLProps<HTMLHeadingElement>) => {
    const { children, ...rest } = props;
    const slug = slugify(children?.toString() || "");
    return React.createElement(
      `h${level}`,
      { id: slug, ...rest },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  ImageGrid,
  Disclosure,
  Tab,
  Tabs,
  a: CustomLink,
  Tweet: TweetComponent,
  Caption: CaptionComponent,
  YouTube: YouTubeComponent,
  code: Code,
  Callout,
};

export function CustomMDX(
  props: React.JSX.IntrinsicAttributes & MDXRemoteProps,
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkMath, remarkGfm],
          rehypePlugins: [rehypeKatex],
        },
      }}
    />
  );
}
