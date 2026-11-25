"use client";

import { Popover } from "@base-ui/react/popover";
import { useState } from "react";

import {
  ArrowRIcon,
  MenuIcon as Menu,
  MessageCircleIcon,
  TruckIcon,
  XIcon,
} from "@/components/ui/icon";
import { Link } from "@/components/ui/link";

export function MobileMenu({
  label,
  triggerClassName,
}: {
  label?: string;
  triggerClassName: string;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        render={
          <button type="button" className={triggerClassName}>
            {open ? <XIcon className="size-5" /> : <Menu className="size-5" />}
            <span className={label ? undefined : "sr-only"}>
              {open ? "Close" : (label ?? "Menu")}
            </span>
          </button>
        }
      />
      <Popover.Portal>
        <Popover.Positioner
          align="end"
          side="top"
          sideOffset={8}
          className="z-40 !fixed !top-auto !bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] !left-1/2 ![transform:translateX(-50%)]"
        >
          <Popover.Popup className="w-[min(17rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-3xl bg-background font-sans shadow-[0_8px_28px_rgba(0,0,0,0.18)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-starting-style:translate-y-6 data-starting-style:scale-x-75 data-starting-style:scale-y-0 data-starting-style:opacity-0 data-ending-style:translate-y-6 data-ending-style:scale-x-75 data-ending-style:scale-y-0 data-ending-style:opacity-0 motion-reduce:transition-none [&_h3]:font-sans">
            <div className="grid gap-1 px-5 pt-5 pb-4">
              <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                Aditya Auto
              </p>
              <Popover.Title className="font-sans text-lg font-semibold">
                Here to help
              </Popover.Title>
              <p className="text-sm text-muted-foreground">Questions or looking for an order?</p>
            </div>
            <nav aria-label="Help" className="grid gap-2 px-3 pb-3">
              {[
                {
                  href: "/contact",
                  icon: MessageCircleIcon,
                  title: "Contact us",
                  detail: "Talk to our team",
                },
                {
                  href: "/track-order",
                  icon: TruckIcon,
                  title: "Track order",
                  detail: "Check your order status",
                },
              ].map(({ detail, href, icon: Icon, title }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={close}
                  className="flex items-center gap-3 rounded-2xl bg-muted p-3 transition-colors hover:bg-primary/10"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-background text-primary">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="grid flex-1 gap-0.5">
                    <span className="text-sm font-semibold">{title}</span>
                    <span className="text-xs text-muted-foreground">{detail}</span>
                  </span>
                  <ArrowRIcon aria-hidden className="size-4 text-muted-foreground" />
                </Link>
              ))}
            </nav>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
