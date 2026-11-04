import { HandbagIcon } from "lucide-react";

import { getCart } from "@/lib/cart/server";
import { withFallback } from "@/lib/shopify/errors/server";

import { CartIconClient } from "./cart-client";

export async function CartIcon({ className, label }: { className?: string; label?: string }) {
  const cart = await withFallback(getCart(), undefined);
  return (
    <CartIconClient
      cartLabel="Cart"
      className={className}
      initialCart={cart ?? null}
      showLabel={Boolean(label)}
    />
  );
}

export function CartIconFallback() {
  return (
    <span className="flex items-center justify-center gap-1.5 text-foreground">
      <HandbagIcon className="size-5" />
      <span className="sr-only">Cart</span>
    </span>
  );
}
