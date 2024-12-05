"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Nav() {
  const pathname = usePathname();
  return (
    <>
      <Link href="/" className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-emerald-500 text-center font-mono text-sm leading-8 text-black">
          <Image
            src="/profile.png"
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </Link>
      <nav className="mb-8 mt-14 md:mb-0 md:w-48 md:flex-shrink-0">
        <ul className="flex space-x-4 text-sm md:flex-col md:space-x-0 md:space-y-1">
          <li>
            <Link
              className={`relative hover:text-emerald-600 hover:underline ${
                pathname === "/"
                  ? "text-emerald-600 before:absolute before:-left-3 before:-top-[0.1rem] md:before:content-['•']"
                  : ""
              }`}
              href="/"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={`relative hover:text-emerald-600 hover:underline ${
                pathname.startsWith("/blog")
                  ? "text-emerald-600 before:absolute before:-left-3 before:-top-[0.1rem] md:before:content-['•']"
                  : ""
              }`}
              href="/blog"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              className={`relative hover:text-emerald-600 hover:underline ${
                pathname !== "/" && !pathname.startsWith("/blog")
                  ? "text-emerald-600 before:absolute before:-left-3 before:-top-[0.1rem] md:before:content-['•']"
                  : ""
              }`}
              href="/misc"
            >
              Misc
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
