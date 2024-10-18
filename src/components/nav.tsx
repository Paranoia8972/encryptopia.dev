"use client";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { metaData } from "@/config";
import { usePathname } from "next/navigation";

const navItems = {
  "/blog": { name: "Blog" },
  "/projects": { name: "Projects" },
  "/gallery": { name: "Gallery" },
};

export function Navbar() {
  const pathname = usePathname();
  if (pathname === "/links") {
    return null;
  }

  return (
    <nav className="mb-12 py-5 lg:mb-16">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <div className="flex items-center">
          <Link href="/" className="text-3xl font-semibold tracking-tight">
            {metaData.title}
          </Link>
        </div>
        <div className="mt-6 flex flex-row items-center gap-4 md:ml-auto md:mt-0">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="relative flex align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
            >
              {name}
            </Link>
          ))}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
