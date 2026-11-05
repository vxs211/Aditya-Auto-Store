import { cn } from "cn";
import { ChevronDown } from "lucide-react";

import type { MenuItem } from "@/lib/menu/types";

import { MegaPanel, type MegaDetail } from "./mega-panel";
import { MenuLink } from "./menu-link";

export interface MegaMenu {
  defaultId: string;
  details: Record<string, MegaDetail>;
}

// A mega menu is keyed by the id of the nav item whose dropdown shows it.
export function QuickLinks({
  items,
  mega = {},
}: {
  items: MenuItem[];
  mega?: Record<string, MegaMenu>;
}) {
  return (
    <ul className="hidden lg:flex items-center gap-4 xl:gap-8">
      {items.map((item) => (
        <NavItem key={item.id} item={item} mega={mega[item.id]} />
      ))}
    </ul>
  );
}

// Origin Regular, to match the links inside the shop menu.
const TRIGGER_CLASS =
  "flex items-center gap-1 font-heading text-sm font-normal uppercase tracking-[0.04em] hover:opacity-70 xl:text-base transition-opacity";

function NavItem({ item, mega }: { item: MenuItem; mega?: MegaMenu }) {
  if (item.items.length === 0) {
    return (
      <li className="flex items-center h-20">
        <MenuLink url={item.url} className={TRIGGER_CLASS}>
          {item.title}
        </MenuLink>
      </li>
    );
  }

  // A short list of links opens as a small card under its trigger; only Shop has the wide picture menu.
  if (!mega) {
    return (
      <li className="group relative flex items-center h-20">
        <MenuLink url={item.url} className={TRIGGER_CLASS}>
          {item.title}
          <ChevronDown className="size-3" aria-hidden="true" />
        </MenuLink>
        <ul
          className={cn(
            "absolute top-full left-1/2 z-40 min-w-56 -translate-x-1/2 py-2",
            "invisible opacity-0",
            "group-hover:visible group-hover:opacity-100",
            "group-has-[:focus-visible]:visible group-has-[:focus-visible]:opacity-100",
            "transition-opacity duration-150",
            "bg-background border shadow-md",
          )}
        >
          {item.items.map((entry) => (
            <li key={entry.id}>
              <MenuLink
                url={entry.url}
                className="block px-6 py-3 font-heading text-[0.9375rem] font-normal uppercase tracking-[0.04em] transition-colors hover:text-link"
              >
                {entry.title}
              </MenuLink>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li className="group flex items-center h-20">
      <MenuLink url={item.url} className={TRIGGER_CLASS}>
        {item.title}
        <ChevronDown className="size-3" aria-hidden="true" />
      </MenuLink>
      <div
        className={cn(
          "absolute inset-x-0 top-full z-40",
          "invisible opacity-0",
          "group-hover:visible group-hover:opacity-100",
          // :focus-visible (not :focus-within) so post-click mouse focus doesn't pin the menu open.
          "group-has-[:focus-visible]:visible group-has-[:focus-visible]:opacity-100",
          "transition-opacity duration-150",
          "bg-background border-b shadow-md",
        )}
      >
        <MegaPanel defaultId={mega.defaultId} details={mega.details} entries={item.items} />
      </div>
    </li>
  );
}
