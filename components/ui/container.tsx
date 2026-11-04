import { cn } from "cn";
import type { ComponentPropsWithRef } from "react";

export function Container({ children, className, ...props }: ComponentPropsWithRef<"section">) {
  return (
    <section className={cn("mx-auto w-full max-w-312 px-4 lg:px-6", className)} {...props}>
      {children}
    </section>
  );
}
