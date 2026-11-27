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
        className="inset-y-auto right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] h-auto max-h-[min(32rem,calc(100dvh-2rem-env(safe-area-inset-bottom,0px)))] w-[calc(100%-2rem)] max-w-sm gap-0 overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-card-hover"
        closeButton={false}
        finalFocus={triggerRef}
        keepMounted
        overlay={false}
        side="right"
      >
        <div className="flex shrink-0 items-center gap-3 bg-white px-4 py-3.5 shadow-card">
          <span className="relative grid size-11 shrink-0 place-items-center rounded-2xl bg-[#fff1e8] text-primary">
            <MessageSquareTextIcon className="size-6" />
            <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-white bg-emerald-500" />
          </span>
          <div className="min-w-0 flex-1">
            <SheetTitle className="font-heading text-base leading-tight font-semibold text-foreground">
              Aditya shopping assistant
            </SheetTitle>
            <p className="truncate text-xs text-muted-foreground">
              Find parts that fit your vehicle
            </p>
          </div>
          <SheetClose
            aria-label="Close shopping assistant"
            className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:bg-[#fff1e8] hover:text-foreground"
          >
            <XIcon className="size-5" />
          </SheetClose>
        </div>
        <SheetDescription className="sr-only">
          Choose your brand and vehicle to find accessories.
        </SheetDescription>
        <div className="scroll-fade-y min-h-0 overflow-y-auto overscroll-contain bg-white p-3.5">
          <ShoppingQuestions brands={brands} onVehicleSelect={onVehicleSelect} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
