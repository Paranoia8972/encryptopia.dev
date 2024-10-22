import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    ).filter((element) => !element.classList.contains("title"));

    const headings = elements.map((element) => ({
      id: element.id,
      text: element.textContent || "",
      level: parseInt(element.tagName.substring(1)),
    }));
    setHeadings(headings);
  }, []);

  return (
    <nav aria-label="Table of contents">
      <ul>
        {headings.map((heading) => (
          <li key={heading.id} style={{ marginLeft: (heading.level - 1) * 20 }}>
            <Link className="hover:underline" href={`#${heading.id}`}>
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
