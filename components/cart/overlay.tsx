"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { LoaderIcon as Loader2, XIcon } from "@/components/ui/icon";
import { PRIMARY_PILL } from "@/components/ui/page-cards";
import { PremiumBagIcon } from "@/components/ui/premium-icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart/client";

import { useCartDrawer } from "./context";
import { CartLineItems } from "./line-item";
import { CartSummary } from "./summary";
import { CartWarnings } from "./warnings";

function CartCountBadge() {
  const count = useCart((state) => state.data.totalQuantity);
  if (count === 0) return null;
  return (
    <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white tabular-nums">
      {count}
    </span>
  );
}

interface CartOverlayProps {
  description: string;
  title: string;
}

export function CartOverlay({ description, title }: CartOverlayProps) {
  const { isOverlayOpen, originX, setOverlayOpen } = useCartDrawer();
  // Below the lg breakpoint the bottom bar shows, and the cart grows out of it instead of sliding from the side.
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const popup = compact && originX !== undefined;

  return (
    <Sheet open={isOverlayOpen} onOpenChange={setOverlayOpen}>
      <SheetContent
        closeButton={false}
        side={popup ? "popup" : "right"}
        style={popup ? { transformOrigin: `${originX}px 100%` } : undefined}
        className="gap-0 p-0"
      >
        <div className="flex h-16 shrink-0 items-center justify-between gap-2 px-2.5">
          <div className="flex items-center gap-1.5">
            <SheetTitle className="font-heading text-xl leading-4 font-semibold">
              {title}
            </SheetTitle>
            <CartCountBadge />
          </div>
          <SheetClose
            aria-label="Close cart"
            className="-mr-2 flex size-11 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <XIcon className="size-5" />
          </SheetClose>
        </div>
        <SheetDescription className="sr-only">{description}</SheetDescription>
        <OverlayContent />
      </SheetContent>
    </Sheet>
  );
}

function OverlayContent() {
  const router = useRouter();
  const cart = useCart((state) => state.data);
  const isLoading = useCart((state) => state.loading);
  const { setOverlayOpen } = useCartDrawer();
  if (isLoading && cart.lines.nodes.length === 0) {
    return (
      <div className="flex h-full min-h-40 items-center justify-center gap-2.5" role="status">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        Loading cart…
      </div>
    );
  }
  if (cart.lines.nodes.length === 0) {
    return (
      <div className="flex h-full min-h-56 flex-col gap-5 px-2.5 pb-4">
        <CartWarnings />
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <span className="mb-4 grid size-20 place-items-center rounded-2xl bg-[#fff1e8]">
            <PremiumBagIcon className="size-12 text-primary" />
          </span>
          <h3 className="mb-6 font-heading text-2xl font-medium">Your cart is empty</h3>
          <Button
            onClick={() => {
              setOverlayOpen(false);
              router.push("/collections");
            }}
            className={PRIMARY_PILL}
            size="lg"
          >
            Continue shopping
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="scroll-fade-y grid flex-1 content-start gap-5 overflow-y-auto px-2.5 py-5">
        <CartWarnings />
        <CartLineItems lines={cart.lines.nodes} />
      </div>
      <footer className="px-2.5 pt-5 pb-2.5">
        <CartSummary cart={cart} />
      </footer>
    </div>
  );
}
