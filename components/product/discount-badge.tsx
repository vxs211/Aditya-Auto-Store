import { cn } from "cn";
import type { ComponentProps } from "react";

interface DiscountBadgeProps extends ComponentProps<"span"> {
  percent: number;
}

export function DiscountBadge({ percent, className, ...props }: DiscountBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-semibold tabular-nums text-link",
        className,
      )}
      {...props}
    >
      {percent}% OFF
    </span>
  );
}
