"use client";

import { Inter_Tight } from "next/font/google";
import { useRef } from "react";

import { ChevronDownIcon as ChevronDown } from "@/components/ui/icon";
import type { MenuItem } from "@/lib/menu/types";

// The site's display face, so the nav links read with the homepage cards and section titles.
const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600"] });

import { DropdownPanel } from "./dropdown-panel";
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
    <ul className="hidden lg:flex items-center gap-1 xl:gap-3">
      {items.map((item) => (
        <NavItem key={item.id} item={item} mega={mega[item.id]} />
      ))}
    </ul>
  );
}

// The trigger text matches the links inside the shop menu; Inter Tight keeps the nav in the site's display voice.
const TRIGGER_CLASS = `${interTight.className} flex items-center gap-1 rounded-sm px-2.5 py-1 text-[15px] font-medium tracking-[0.01em] text-black/70 transition-colors hover:bg-black/5 hover:text-black`;

function NavItem({ item, mega }: { item: MenuItem; mega?: MegaMenu }) {
  const host = useRef<HTMLLIElement>(null);

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
      <li className="group relative flex items-center h-20" ref={host}>
        <MenuLink url={item.url} className={TRIGGER_CLASS}>
          {item.title}
          <ChevronDown
            className="size-3 transition-transform group-hover:rotate-180"
            aria-hidden="true"
          />
        </MenuLink>
        <DropdownPanel
          className="absolute left-0 right-0 top-full z-40 mx-auto mt-2 w-fit"
          host={host}
        >
          <ul className="min-w-56 rounded-3xl border border-black/10 bg-white p-2 shadow-xl">
            {item.items.map((entry) => (
              <li key={entry.id}>
                <MenuLink
                  url={entry.url}
                  className={`block rounded-2xl px-6 py-3 text-base font-normal text-foreground transition-colors hover:bg-primary-tint hover:text-primary-hover ${interTight.className}`}
                >
                  {entry.title}
                </MenuLink>
              </li>
            ))}
          </ul>
        </DropdownPanel>
      </li>
    );
  }

  // No `relative` on this li: the panel's inset-x-0 then spans the whole nav bar, not just the trigger.
  return (
    <li className="group flex items-center h-20" ref={host}>
      <MenuLink url={item.url} className={TRIGGER_CLASS}>
        {item.title}
        <ChevronDown
          className="size-3 transition-transform group-hover:rotate-180"
          aria-hidden="true"
        />
      </MenuLink>
      <DropdownPanel className="absolute inset-x-0 top-full z-40 mt-2" host={host}>
        <div className="rounded-3xl border border-black/10 bg-white shadow-xl">
          <MegaPanel defaultId={mega.defaultId} details={mega.details} entries={item.items} />
        </div>
      </DropdownPanel>
    </li>
  );
}
