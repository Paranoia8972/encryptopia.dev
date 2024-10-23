"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { metaData, socialLinks } from "@/config";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetTitle>
          <MobileLink
            onOpenChange={setOpen}
            href="/"
            className="flex items-center"
          >
            <span className="font-bold">{metaData.title}</span>
          </MobileLink>
        </SheetTitle>
        <div className="mt-3 flex flex-col gap-3">
          <MobileLink onOpenChange={setOpen} href="/blog">
            Blog
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/projects">
            Projects
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/gallery">
            Gallery
          </MobileLink>
          <Link target="_blank" rel="noreferrer" href={socialLinks.github}>
            GitHub
          </Link>
          <Link target="_blank" rel="noreferrer" href={socialLinks.twitter}>
            Twitter
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
