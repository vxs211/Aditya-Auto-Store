import { PredictiveSearchProvider } from "@shopify/hydrogen/react";
import { Suspense } from "react";

import { shopConfig } from "@/lib/config";
import type { MenuItem } from "@/lib/menu/types";

import { BarLink } from "./bar-link";
import { BarMotion, BarRise } from "./bar-motion";
import { BAR_ITEM_CLASS, BAR_SEARCH_CLASS } from "./bar-styles";
import { CartIcon, CartIconFallback } from "./cart";
import { MobileMenu } from "./mobile-menu";
import { SearchModal } from "./search-modal";

// A small orange four-point star, the sparkle that sits on the search icon.
function Sparkle() {
  return (
    <svg
      aria-hidden
      className="absolute top-2.5 right-2.5 size-3.5 text-primary"
      data-accent
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0c.8 6.2 5.8 11.2 12 12-6.2.8-11.2 5.8-12 12-.8-6.2-5.8-11.2-12-12 6.2-.8 11.2-5.8 12-12z" />
    </svg>
  );
}

// Phones up to tablets: a light pill with the main links, and a round search button beside it, floating at the
// bottom within thumb reach. Desktop keeps the top bar.
export function BottomBar({ items }: { items: MenuItem[] }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] z-50 flex items-center justify-center gap-2 lg:hidden">
      <Suspense fallback={null}>
        <BarMotion className="bar-round pointer-events-auto relative flex items-stretch bg-background p-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.18)]">
          <BarLink href="/" icon="home" label="Home" />
          <BarLink href="/collections" icon="shop" label="Shop" />
          <Suspense fallback={<CartIconFallback />}>
            <CartIcon className={BAR_ITEM_CLASS} label="Cart" />
          </Suspense>
          <MobileMenu items={items} label="Menu" triggerClassName={BAR_ITEM_CLASS} />
        </BarMotion>
      </Suspense>
      {shopConfig.search.isEnabled && (
        <BarRise className="pointer-events-auto">
          <PredictiveSearchProvider
            debounceInMs={300}
            limit={3}
            types={["PRODUCT", "COLLECTION", "QUERY"]}
          >
            <SearchModal
              accent={<Sparkle />}
              shortcut={false}
              triggerClassName={BAR_SEARCH_CLASS}
            />
          </PredictiveSearchProvider>
        </BarRise>
      )}
    </div>
  );
}
