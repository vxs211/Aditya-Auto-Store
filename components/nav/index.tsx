import { PredictiveSearchProvider } from "@shopify/hydrogen/react";
import Image from "next/image";
import { Suspense } from "react";

import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { brandDisplayName, modelDisplayName } from "@/lib/collections";
import { getFitmentBrands } from "@/lib/collections/server";
import { shopConfig } from "@/lib/config";
import type { MenuItem } from "@/lib/menu/types";

import { NavAccount, NavAccountFallback } from "./account";
import { CartIcon, CartIconFallback } from "./cart";
import { MobileMenu } from "./mobile-menu";
import { QuickLinks } from "./quick-links";
import { SearchModal } from "./search-modal";

export async function Nav() {
  const brands = await getFitmentBrands();
  const items: MenuItem[] = [
    {
      id: "nav-models",
      items: brands.map((brand) => ({
        id: `nav-brand-${brand.handle}`,
        items: brand.models.map((model) => ({
          id: `nav-model-${model.handle}`,
          items: [],
          title: modelDisplayName(model.title),
          url: `/collections/${model.handle}`,
        })),
        title: brandDisplayName(brand.title),
        url: `/collections/${brand.handle}`,
      })),
      title: "Shop by model",
      url: "/collections",
    },
    { id: "nav-products", items: [], title: "All products", url: "/collections/all" },
    { id: "nav-about", items: [], title: "About", url: "/about" },
    { id: "nav-contact", items: [], title: "Contact", url: "/contact" },
  ];
  return (
    <nav
      className="sticky top-0 z-30 w-full border-b bg-background pt-[env(safe-area-inset-top,0px)] transition-shadow duration-250"
      id="nav-outer"
    >
      <Container className="flex h-18 items-center gap-2.5 md:gap-8">
        <MobileMenu items={items} />

        <Link className="flex items-center shrink-0" href="/">
          <Image
            alt={shopConfig.site.name}
            className="h-10 w-auto md:h-12"
            height={40}
            priority
            sizes="100vw"
            src="/brand/aditya-logo-horizontal-no-tagline.svg"
            unoptimized
            width={120}
          />
        </Link>

        <QuickLinks items={items} />

        <div className="flex items-center gap-5 ml-auto">
          {shopConfig.search.isEnabled && (
            <PredictiveSearchProvider
              debounceInMs={300}
              limit={3}
              types={["PRODUCT", "COLLECTION", "QUERY"]}
            >
              <SearchModal />
            </PredictiveSearchProvider>
          )}
          {shopConfig.auth.isEnabled && (
            <Suspense fallback={<NavAccountFallback />}>
              <NavAccount />
            </Suspense>
          )}
          <Suspense fallback={<CartIconFallback />}>
            <CartIcon />
          </Suspense>
        </div>
      </Container>
    </nav>
  );
}
