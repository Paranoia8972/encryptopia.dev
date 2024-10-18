import { Button, ButtonProps } from "./ui/button";
import Link from "next/link";

export interface Link extends ButtonProps {
  title: string;
  url: string;
  icon?: any;
}

export function LinkItem({ link }: { link: Link }) {
  return (
    <Button
      asChild
      variant={link.variant ?? "outline"}
      size={link.size ?? "lg"}
      className={link.className}
    >
      <Link href={link.url}>
        {link.icon && <link.icon className="mr-2 h-4 w-4" />}
        {link.title}
      </Link>
    </Button>
  );
}
