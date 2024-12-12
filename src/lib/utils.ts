import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, subDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDate = (sub: number = 0) => {
  const dateXDaysAgo = subDays(new Date(), sub);

  return format(dateXDaysAgo, "dd/MM/yyyy");
};

export async function getMetadata(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const domain = new URL(url).hostname;

    return {
      title:
        doc
          .querySelector('meta[property="og:title"]')
          ?.getAttribute("content") ||
        doc.querySelector("title")?.textContent ||
        "",
      description:
        doc
          .querySelector('meta[property="og:description"]')
          ?.getAttribute("content") ||
        doc
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") ||
        "",
      image:
        doc
          .querySelector('meta[property="og:image"]')
          ?.getAttribute("content") || "",
      domain,
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
}
