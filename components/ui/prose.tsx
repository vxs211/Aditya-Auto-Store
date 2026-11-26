import { cn } from "cn";
import type { ComponentProps } from "react";

export function Prose({ className, ...props }: ComponentProps<"article">) {
  return (
    <article
      className={cn(
        "prose prose-neutral wrap-anywhere prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-balance prose-p:text-pretty",
        className,
      )}
      {...props}
    />
  );
}
