import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "Error 404",
};

export default function NotFound() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium tracking-tight">
        404 - Page not found
      </h1>
      <p className="mb-4">
        Oops! The page you&apos;re looking for doesn&apos;t seem to exist.
      </p>
    </section>
  );
}
