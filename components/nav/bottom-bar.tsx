import { PredictiveSearchProvider } from "@shopify/hydrogen/react";
import { Suspense } from "react";

import { shopConfig } from "@/lib/config";
import type { MenuItem } from "@/lib/menu/types";

import { BarLink } from "./bar-link";
import { BarMotion } from "./bar-motion";
import { BAR_ITEM_CLASS } from "./bar-styles";
import { CartIcon, CartIconFallback } from "./cart";
import { MobileMenu } from "./mobile-menu";
import { SearchModal } from "./search-modal";

// Phones up to tablets: the main actions float at the bottom, within thumb reach. Desktop keeps the top bar.
export function BottomBar({ items }: { items: MenuItem[] }) {
  return (
    <div className="pointer-events-none fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] z-50 lg:hidden">
      <BarMotion className="pointer-events-auto relative mx-auto flex max-w-md items-center justify-between rounded-full bg-foreground p-1.5 shadow-xl">
        <BarLink href="/" icon="home" label="Home" />
        <BarLink href="/collections" icon="shop" label="Shop" />
        {shopConfig.search.isEnabled && (
          <PredictiveSearchProvider
            debounceInMs={300}
            limit={3}
            types={["PRODUCT", "COLLECTION", "QUERY"]}
          >
            <SearchModal label="Search" shortcut={false} triggerClassName={BAR_ITEM_CLASS} />
          </PredictiveSearchProvider>
        )}
        <Suspense fallback={<CartIconFallback />}>
          <CartIcon className={BAR_ITEM_CLASS} label="Cart" />
        </Suspense>
        <MobileMenu items={items} label="Menu" triggerClassName={BAR_ITEM_CLASS} />
      </BarMotion>
    </div>
  );
}
