"use client";

import { HandbagIcon } from "lucide-react";

import { useCartDrawer } from "@/components/cart/context";
import { useCart } from "@/lib/cart/client";

interface CartIconClientProps {
  cartLabel: string;
  className?: string;
  initialCart: { totalQuantity: number } | null;
  showLabel?: boolean;
}

export function CartIconClient({
  cartLabel,
  className,
  initialCart,
  showLabel,
}: CartIconClientProps) {
  const quantity = useCart((state) =>
    state.loading
      ? (initialCart?.totalQuantity ?? state.data.totalQuantity)
      : state.data.totalQuantity,
  );
  const { openOverlay } = useCartDrawer();

  return (
    <button
      onClick={openOverlay}
      className={
        className ??
        "flex cursor-pointer items-center justify-center gap-1.5 text-foreground hover:text-foreground/80 transition-colors"
      }
      type="button"
    >
      <span className="relative">
        <HandbagIcon className="size-5" />
        {quantity > 0 && (
          <span className="absolute -top-2 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-xxs leading-none text-primary-foreground">
            {quantity}
          </span>
        )}
      </span>
      <span className={showLabel ? undefined : "sr-only"}>{cartLabel}</span>
    </button>
  );
}
