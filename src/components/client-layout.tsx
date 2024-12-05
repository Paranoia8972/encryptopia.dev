"use client";
import { usePathname } from "next/navigation";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Nav from "@/components/nav";
import TableOfContents from "@/components/table-of-contents";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === "/links")
    return (
      <div className="text-gray-300 dark:bg-[#0d1117]">
        {children}
        <div className="mx-auto mb-12 max-w-5xl md:mb-24">
          <Footer />
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col text-gray-300 dark:bg-[#0d1117]">
      <div className="mx-auto mt-24 w-full max-w-5xl flex-grow px-4 py-8 md:px-6 lg:px-8">
        <div className="md:flex md:gap-8">
          <div className="-mt-20 md:sticky md:top-20 md:mt-0 md:h-max md:min-h-full md:w-48 md:flex-shrink-0">
            <Nav />
            <TableOfContents />
          </div>
          <div>
            <Header />
            <main className="flex-grow">{children}</main>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-12 w-full max-w-5xl md:mb-48">
        <Footer />
      </div>
    </div>
  );
}
