import type { ReactNode } from "react";

// The key word in a headline, set in the Michroma label font. Michroma is wide and has one weight, so it is
// scaled down and kept at normal weight rather than being faux-bolded by the heading around it.
export function Highlight({ children }: { children: ReactNode }) {
  return <span className="font-label text-[0.8em] font-normal">{children}</span>;
}
