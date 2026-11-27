import { PredictiveSearchProvider } from "@shopify/hydrogen/react";
import { Suspense } from "react";

import { SparklesIcon } from "@/components/ui/icon";
import { shopConfig } from "@/lib/config";

import { BarLink } from "./bar-link";
import { BarMotion, BarRise } from "./bar-motion";
import { BAR_ITEM_CLASS, BAR_SEARCH_CLASS } from "./bar-styles";
import { CartIcon, CartIconFallback } from "./cart";
import { MobileMenu } from "./mobile-menu";
import { SearchModal } from "./search-modal";

// Phones up to tablets: a light pill with the main links, and a round search button beside it, floating at the
// bottom within thumb reach. Desktop keeps the top bar.
export function BottomBar() {
  return (
    <div
      id="bottom-bar"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] z-50 flex items-center justify-center gap-2 lg:hidden"
    >
      <Suspense fallback={null}>
        <BarMotion className="bar-round pointer-events-auto relative flex items-stretch bg-background p-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.18)]">
          <BarLink href="/" icon="home" label="Home" />
          <BarLink href="/collections" icon="shop" label="Shop" />
          <Suspense fallback={<CartIconFallback />}>
            <CartIcon className={BAR_ITEM_CLASS} label="Cart" />
          </Suspense>
          <MobileMenu label="Menu" triggerClassName={BAR_ITEM_CLASS} />
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
              accent={
                <SparklesIcon
                  className="absolute top-2.5 right-2.5 size-3.5 text-primary [&_circle]:hidden [&_path:first-child]:fill-current [&_path:not(:first-child)]:hidden"
                  data-accent
                />
              }
              shortcut={false}
              triggerClassName={BAR_SEARCH_CLASS}
            />
          </PredictiveSearchProvider>
        </BarRise>
      )}
    </div>
  );
}
