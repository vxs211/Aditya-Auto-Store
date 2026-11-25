"use client";

import type { ReactNode } from "react";

interface ActionBarProps {
  children?: ReactNode;
}

export function ActionBar({ children }: ActionBarProps) {
  if (!children) return null;

  return (
    <div className="fixed right-5 bottom-[calc(9rem+env(safe-area-inset-bottom,0px))] z-40 lg:bottom-22 flex items-center">
      {children}
    </div>
  );
}
