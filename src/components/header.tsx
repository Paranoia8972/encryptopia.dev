import Link from "next/link";
import { metaData } from "@/config";

export default function Header() {
  return (
    <header className="mb-8 flex items-center justify-between md:mb-16">
      <Link href="/" className="flex items-center gap-4">
        <span className="mt-[0.43rem] text-xl font-semibold tracking-tight text-gray-100">
          {metaData.name.toUpperCase()}
        </span>
      </Link>
    </header>
  );
}
