import Script from "next/script";
import { umami } from "@/config";

export function Umami() {
  return (
    <Script
      async
      defer
      data-website-id={umami.websiteId}
      src={umami.src}
    ></Script>
  );
}
