"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "cn";
import { type PointerEvent, useRef } from "react";

import { XIcon } from "@/components/ui/icon";

const DISMISS_DISTANCE = 96;
const DISMISS_VELOCITY = 0.5;

// Past the edge a drag meets resistance (diminishing returns), and a release that does not dismiss springs back with overshoot.
function rubber(distance: number) {
  return distance < 0 ? -Math.sqrt(-distance) * 4 : distance;
}

function useDragToDismiss(
  side: "top" | "right" | "bottom" | "left" | "popup",
  onDismiss: () => void,
) {
  const start = useRef<{ axis: "x" | "y" | null; t: number; x: number; y: number } | null>(null);
  const horizontal = side === "left" || side === "right";
  const sign = side === "right" || side === "bottom" ? 1 : -1;

  const move = (e: PointerEvent<HTMLElement>) => {
    const s = start.current;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (!s.axis) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
      s.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if ((s.axis === "x") !== horizontal) {
        start.current = null;
        return;
      }
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    const d = rubber((horizontal ? dx : dy) * sign) * sign;
    e.currentTarget.style.transition = "none";
    e.currentTarget.style.transform = horizontal ? `translateX(${d}px)` : `translateY(${d}px)`;
  };

  const end = (e: PointerEvent<HTMLElement>) => {
    const s = start.current;
    start.current = null;
    if (!s?.axis) return;
    const d = (horizontal ? e.clientX - s.x : e.clientY - s.y) * sign;
    const velocity = d / Math.max(1, performance.now() - s.t);
    const el = e.currentTarget;
    el.style.transition = "";
    if (d > DISMISS_DISTANCE || velocity > DISMISS_VELOCITY) {
      el.style.transform = "";
      onDismiss();
    } else {
      el.style.transition = "transform 450ms var(--ease-spring)";
      el.style.transform = "";
    }
  };

  return {
    onPointerCancel: end,
    onPointerDown: (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType === "mouse") return;
      start.current = { axis: null, t: performance.now(), x: e.clientX, y: e.clientY };
    },
    onPointerMove: move,
    onPointerUp: end,
  };
}

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-60 bg-black/30 transition-opacity ease-out data-open:duration-500 data-closed:duration-300 data-starting-style:opacity-0 data-ending-style:opacity-0 data-[dim=false]:bg-transparent",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  closeButton = true,
  keepMounted = false,
  overlay = true,
  side = "right",
  ...props
}: SheetPrimitive.Popup.Props & {
  closeButton?: boolean;
  keepMounted?: boolean;
  overlay?: boolean;
  side?: "top" | "right" | "bottom" | "left" | "popup";
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const drag = useDragToDismiss(side, () => closeRef.current?.click());
  return (
    <SheetPortal keepMounted={keepMounted}>
      {/* Base UI's own modal backdrop has no z-index, so z-indexed page chrome such as the sticky header stays clickable; without a dimmed overlay, this transparent one takes the click-away. */}
      <SheetOverlay data-dim={overlay} />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "bg-card fixed z-60 flex flex-col gap-5 shadow-lg transition motion-reduce:transition-none data-open:duration-500 data-open:ease-(--ease-out-soft) data-closed:duration-300 data-closed:ease-in",
          side === "right" &&
            "touch-pan-y inset-y-0 right-0 h-full w-[calc(100%-2.5rem)] max-w-md border-l data-starting-style:translate-x-full data-ending-style:translate-x-full",
          side === "left" &&
            "touch-pan-y inset-y-0 left-0 h-full w-[calc(100%-2.5rem)] max-w-md border-r data-starting-style:-translate-x-full data-ending-style:-translate-x-full",
          side === "top" &&
            "inset-x-0 top-0 h-auto border-b data-starting-style:-translate-y-full data-ending-style:-translate-y-full",
          // A card above the bottom bar, scaled out of the button that opened it (set transformOrigin on it).
          side === "popup" &&
            "bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] left-1/2 h-auto overflow-hidden max-h-[min(34rem,calc(100dvh-7rem))] w-[min(26rem,calc(100vw-2rem))] -translate-x-1/2 rounded-3xl shadow-2xl data-starting-style:translate-y-6 data-starting-style:scale-x-75 data-starting-style:scale-y-0 data-starting-style:opacity-0 data-ending-style:translate-y-6 data-ending-style:scale-x-75 data-ending-style:scale-y-0 data-ending-style:opacity-0",
          side === "bottom" &&
            "inset-x-0 bottom-0 h-auto rounded-t-3xl border-t data-starting-style:translate-y-full data-ending-style:translate-y-full",
          className,
        )}
        {...(side === "left" || side === "right" ? drag : {})}
        {...props}
      >
        <SheetPrimitive.Close aria-hidden className="hidden" ref={closeRef} tabIndex={-1} />
        {children}
        {closeButton && (
          <SheetPrimitive.Close className="ring-offset-background focus-visible:ring-ring absolute top-3 right-2.5 flex size-10 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none">
            <XIcon className="size-5" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger };
