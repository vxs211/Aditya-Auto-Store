"use client";

import type { RefObject } from "react";

import { XIcon } from "@/components/ui/icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

import { ShoppingQuestions, type ShoppingBrand } from "./shopping-questions";

interface AgentPanelProps {
  brands: ShoppingBrand[];
  onOpenChange: (open: boolean) => void;
  onVehicleSelect: () => void;
  open: boolean;
  triggerRef: RefObject<HTMLElement | null>;
}

export function AgentPanel({
  brands,
  onOpenChange,
  onVehicleSelect,
  open,
  triggerRef,
}: AgentPanelProps) {
  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent
        className="inset-y-auto right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] h-auto max-h-[min(26rem,calc(100dvh-2rem-env(safe-area-inset-bottom,0px)))] w-[calc(100%-2rem)] max-w-xs gap-0 overflow-hidden rounded-3xl border p-0"
        closeButton={false}
        finalFocus={triggerRef}
        keepMounted
        overlay={false}
        side="right"
      >
        <div className="flex min-h-12 shrink-0 items-center justify-between gap-2 border-b px-3">
          <SheetTitle className="font-sans text-base font-semibold">
            Aditya shopping assistant
          </SheetTitle>
          <SheetClose
            aria-label="Close shopping assistant"
            className="grid size-8 cursor-pointer place-items-center text-muted-foreground hover:text-foreground"
          >
            <XIcon className="size-5" />
          </SheetClose>
        </div>
        <SheetDescription className="sr-only">
          Choose your brand and vehicle to find accessories.
        </SheetDescription>
        <div className="min-h-0 overflow-y-auto overscroll-contain p-2.5">
          <ShoppingQuestions brands={brands} onVehicleSelect={onVehicleSelect} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
