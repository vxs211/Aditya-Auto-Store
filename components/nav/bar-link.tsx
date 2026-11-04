"use client";

import { HomeIcon, LayoutGridIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { Link } from "@/components/ui/link";

import { BAR_ITEM_CLASS } from "./bar-styles";

// Icons are picked by name here because components cannot be passed from a server file to a client one.
const ICONS = { home: HomeIcon, shop: LayoutGridIcon };

export function BarLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: keyof typeof ICONS;
  label: string;
}) {
  const Icon = ICONS[icon];
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={BAR_ITEM_CLASS}
      data-active={active}
      href={href}
    >
      <Icon className="size-5" />
      {label}
    </Link>
  );
}
