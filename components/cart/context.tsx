"use client";

import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { CartProvider } from "@/lib/cart/client";

interface CartDrawerContextValue {
  isOverlayOpen: boolean;
  /** The bottom-bar Menu popup; kept here so the bar can turn into a Close button for it. */
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  /** Horizontal centre of the bottom-bar cart button, relative to a centred 26rem popup; undefined without a bottom bar. */
  originX: number | undefined;
  openOverlay: () => void;
  setOverlayOpen: (open: boolean) => void;
}

const CartDrawerContext = createContext<CartDrawerContextValue | null>(null);

function CartDrawerProvider({ children }: { children: ReactNode }) {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [originX, setOriginX] = useState<number>();
  const [menuOpen, setMenuOpen] = useState(false);
  const openOverlay = useCallback(() => {
    // Remember where the bottom-bar cart button is, so the popup can grow out of it.
    const trigger = document.querySelector<HTMLElement>("#bottom-bar [data-cart-trigger]");
    if (trigger && trigger.offsetParent !== null) {
      const rect = trigger.getBoundingClientRect();
      const width = Math.min(416, window.innerWidth - 32);
      setOriginX(rect.left + rect.width / 2 - (window.innerWidth - width) / 2);
    } else {
      setOriginX(undefined);
    }
    setOverlayOpen(true);
  }, []);

  return (
    <CartDrawerContext.Provider
      value={{ isOverlayOpen, menuOpen, openOverlay, originX, setMenuOpen, setOverlayOpen }}
    >
      {children}
    </CartDrawerContext.Provider>
  );
}

export function useCartDrawer() {
  const context = useContext(CartDrawerContext);
  if (!context) throw new Error("useCartDrawer must be used within CartDrawerProvider");
  return context;
}

interface CartProviderWrapperProps {
  cartData: ComponentProps<typeof CartProvider>["initialData"];
  children: ReactNode;
}

export function CartProviderWrapper({ cartData, children }: CartProviderWrapperProps) {
  return (
    <CartProvider initialData={cartData}>
      <CartDrawerProvider>{children}</CartDrawerProvider>
    </CartProvider>
  );
}
