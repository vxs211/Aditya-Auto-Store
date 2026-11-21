import type { ReactNode } from "react";

// DESIGN.md allows no third typeface and no accent-colored text, so the key word is simply part of the headline.
export function Highlight({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
