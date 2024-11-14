import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import Link from "next/link";

export interface Links extends ButtonProps {
  title: string;
  url: string;
  icon?: React.ElementType;
}

export function LinkItem({ link }: { link: Links }) {
  return (
    <Button
      asChild
      variant={link.variant ?? "outline"}
      size={link.size ?? "lg"}
      className={link.className}
    >
      <Link href={link.url} target="_blank" rel="noopener noreferrer">
        {link.icon && <link.icon className="mr-2 h-4 w-4" />}
        {link.title}
      </Link>
    </Button>
  );
}
