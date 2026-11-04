import { cn } from "cn";
import type { ComponentProps } from "react";

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("font-label text-label text-muted-foreground uppercase", className)}
      {...props}
    />
  );
}
