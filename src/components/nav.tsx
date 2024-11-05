import Link from "next/link";

export function DesktopNav() {
  return (
    <nav className="hidden md:block">
      <div className="sticky top-16">
        <Link href="/" className="mb-8 block">
          <div className="h-8 w-8 rounded-full bg-primary" />
        </Link>
        <ul className="space-y-4 text-sm text-muted-foreground">
          <li>
            <Link href="/blog" className="hover:text-foreground">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:text-foreground">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="hover:text-foreground">
              Gallery
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export function MobileNav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 bg-background md:hidden">
      <div className="mx-auto max-w-[640px] px-6 py-4">
        <ul className="flex justify-center space-x-6 text-sm text-muted-foreground">
          <li>
            <Link href="/blog" className="hover:text-foreground">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:text-foreground">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="hover:text-foreground">
              Gallery
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
