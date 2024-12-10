import Link from "next/link";

export default function Component() {
  return (
    <main className="prose prose-invert max-w-none flex-grow">
      <h2 className="text-lg font-medium text-gray-100">Misc</h2>

      <h2 className="mb-4 mt-8 text-xl font-semibold">Projects</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <Link
            href="https://onthepixel.net"
            className="text-emerald-500 hover:text-emerald-400"
          >
            OnThePixel.net
          </Link>{" "}
          - My Minecraft Server, June 2024 - Present
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-xl font-semibold">Writeups</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <Link href="#" className="text-emerald-500 hover:text-emerald-400">
            HackTheBox - Writeups
          </Link>{" "}
          - HackTheBox, May 2023 - Present (Coming Soon)
        </li>
      </ul>
    </main>
  );
}
