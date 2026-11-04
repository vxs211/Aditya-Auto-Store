import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";

interface SectionHeadingProps extends Omit<ComponentProps<"div">, "title"> {
  align?: "center" | "left";
  title: ReactNode;
}

export function SectionHeading({
  align = "left",
  className,
  title,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={cn("grid gap-2", align === "center" && "text-center", className)} {...props}>
      <h2 className="font-heading text-h2">{title}</h2>
    </div>
  );
}
