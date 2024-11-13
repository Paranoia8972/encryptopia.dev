import Image from "next/image";
import Link from "next/link";
import { metaData } from "@/config";

export default function Header() {
  return (
    <header className="mb-8 flex items-center justify-between md:mb-16">
      <Link href="/" className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-emerald-500 text-center font-mono text-sm leading-8 text-black">
          <Image
            src="/favicon.ico"
            alt=""
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
        <span className="text-lg font-semibold tracking-wide text-gray-100">
          {metaData.name.toUpperCase()}
        </span>
      </Link>
    </header>
  );
}
