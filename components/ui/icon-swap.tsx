import { cn } from "cn";
import type { ReactNode } from "react";

interface IconSwapProps {
  /** true shows `to`, false shows `from`. */
  active: boolean;
  className?: string;
  from: ReactNode;
  to: ReactNode;
}

const layer =
  "col-start-1 row-start-1 transition-[opacity,filter,scale] duration-200 ease-out motion-reduce:transition-none data-[hidden=true]:scale-50 data-[hidden=true]:opacity-0 data-[hidden=true]:blur-[4px]";

// Two icons stacked in one grid cell: the outgoing one blurs and shrinks while the incoming one sharpens, so it reads as a morph.
export function IconSwap({ active, className, from, to }: IconSwapProps) {
  return (
    <span aria-hidden="true" className={cn("inline-grid place-items-center", className)}>
      <span className={layer} data-hidden={active}>
        {from}
      </span>
      <span className={layer} data-hidden={!active}>
        {to}
      </span>
    </span>
  );
}
