import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { metaData } from "@/config";

const navItems = {
  "/blog": { name: "Blog" },
  "/projects": { name: "Projects" },
  "/gallery": { name: "Gallery" },
};

export function Navbar() {
  return (
    <nav className="lg:mb-16 mb-12 py-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-3xl font-semibold tracking-tight">
            {metaData.title}
          </Link>
        </div>
        <div className="flex flex-row gap-4 mt-6 md:mt-0 md:ml-auto items-center">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative"
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
