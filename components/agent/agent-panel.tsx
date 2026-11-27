"use client";

import type { RefObject } from "react";

import { MessageSquareTextIcon, XIcon } from "@/components/ui/icon";
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
        className="inset-y-auto right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] h-auto max-h-[min(32rem,calc(100dvh-2rem-env(safe-area-inset-bottom,0px)))] w-[calc(100%-2rem)] max-w-sm gap-0 overflow-hidden rounded-3xl border-0 p-0 shadow-2xl"
        closeButton={false}
        finalFocus={triggerRef}
        keepMounted
        overlay={false}
        side="right"
      >
        <div className="flex shrink-0 items-center gap-3 bg-foreground px-4 py-3.5 text-white">
          <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-primary">
            <MessageSquareTextIcon className="size-5" />
            <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-foreground bg-emerald-400" />
          </span>
          <div className="min-w-0 flex-1">
            <SheetTitle className="font-heading text-base font-semibold text-white">
              Aditya shopping assistant
            </SheetTitle>
            <p className="truncate text-xs text-white/60">Find parts that fit your vehicle</p>
          </div>
          <SheetClose
            aria-label="Close shopping assistant"
            className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <XIcon className="size-5" />
          </SheetClose>
        </div>
        <SheetDescription className="sr-only">
          Choose your brand and vehicle to find accessories.
        </SheetDescription>
        <div className="scroll-fade-y min-h-0 overflow-y-auto overscroll-contain bg-muted p-3.5">
          <ShoppingQuestions brands={brands} onVehicleSelect={onVehicleSelect} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
