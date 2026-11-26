"use client";

import { useEffect, useRef, useState } from "react";

import { MessageCircleIcon as MessageCircle } from "@/components/ui/icon";

import { AgentPanel } from "./client";
import type { ShoppingBrand } from "./shopping-questions";

export function AgentButton({ brands }: { brands: ShoppingBrand[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const [vehicleSelected, setVehicleSelected] = useState(false);
  const engaged = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const show = window.setTimeout(() => {
      if (!engaged.current) setGreeting(true);
    }, 3000);
    const hide = window.setTimeout(() => setGreeting(false), 12_000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);
  useEffect(() => {
    if (!vehicleSelected) return;
    const timer = window.setTimeout(() => setVehicleSelected(false), 6000);
    return () => window.clearTimeout(timer);
  }, [vehicleSelected]);
  const mount = () => setMounted(true);
  const toggle = () => {
    engaged.current = true;
    setGreeting(false);
    setVehicleSelected(false);
    setMounted(true);
    setOpen((previous) => !previous);
  };
  return (
    <>
      {vehicleSelected && (
        <p
          className="absolute right-full mr-3 w-max max-w-56 rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground shadow-md"
          role="status"
        >
          Choose your accessories on this page.
        </p>
      )}
      {greeting && !vehicleSelected && (
        <button
          className="absolute right-full mr-3 w-max max-w-56 cursor-pointer rounded-xl border bg-background px-4 py-2.5 text-left text-sm text-foreground shadow-md"
          onClick={toggle}
          type="button"
        >
          Hi! Need help finding parts for your vehicle?
        </button>
      )}
      <button
        ref={triggerRef}
        aria-expanded={open}
        className="bar-round flex size-14 cursor-pointer items-center justify-center bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={toggle}
        onFocus={mount}
        onPointerEnter={mount}
        onTouchStart={mount}
        type="button"
      >
        <MessageCircle className="size-6" />
        <span className="sr-only">Chat with shopping assistant</span>
      </button>
      {mounted && (
        <AgentPanel
          brands={brands}
          onOpenChange={setOpen}
          onVehicleSelect={() => {
            setOpen(false);
            setVehicleSelected(true);
          }}
          open={open}
          triggerRef={triggerRef}
        />
      )}
    </>
  );
}
