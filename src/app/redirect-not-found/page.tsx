import Link from "next/link";

export default function ErrorComponent() {
  return (
    <div>
      <p>
        It seems you've hit a dead end. {""}
        <Link
          href={"/"}
          className="underline decoration-gray-600 decoration-2 transition hover:decoration-current"
        >
          Let's get you back on track!
        </Link>
      </p>
    </div>
  );
}
