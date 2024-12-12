import Balancer from "react-wrap-balancer";
import type { ReactNode } from "react";

export default function CaptionComponent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span className="my-3 block w-full text-center font-mono text-xs leading-normal text-zinc-700 dark:text-zinc-400">
      <Balancer>
        <span className="[&>a]:post-link">{children}</span>
      </Balancer>
    </span>
  );
}
