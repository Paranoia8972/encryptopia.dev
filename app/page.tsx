"use client";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#131c2f] text-white">
      <Image
        alt="Avatar"
        src="/logo.png"
        className="rounded-full size-24 mb-8"
        width={100}
        height={100}
        style={{
          animation: "spin 4s linear infinite",
        }}
      />
      <div className="space-y-4 text-center flex flex-col">
        <a
          href="https://blog.encryptopia.dev"
          className="text-2xl font-courier">
          Blog
        </a>
        <Popover>
          <PopoverTrigger className="text-2xl font-courier">
            Newsletter
          </PopoverTrigger>
          <PopoverContent>The newsletter isn't available yet.</PopoverContent>
        </Popover>
        <a
          href="https://github.com/Paranoia8972"
          className="text-2xl font-courier">
          GitHub
        </a>
        <a href="/projects" className="text-2xl font-courier">
          Projects
        </a>
        <a
          href="https://twitter.com/@Paranoia8972"
          className="text-2xl font-courier">
          Twitter
        </a>
        <a href="https://onthepixel.net" className="text-2xl font-courier">
          OnThePixel
        </a>
        <div>
          <a href="/impressum" className="text-sm">
            Impressum
          </a>{" "}
          &middot;{" "}
          <a href="/dsgvo" className="text-xs">
            DSGVO
          </a>
        </div>
      </div>
    </div>
  );
}
