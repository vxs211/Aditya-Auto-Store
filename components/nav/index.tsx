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
import { BottomBar } from "./bottom-bar";
import { CartIcon, CartIconFallback } from "./cart";
import { QuickLinks, type MegaMenu } from "./quick-links";
import { SearchModal } from "./search-modal";

export async function Nav() {
  const brands = await getFitmentBrands();
  const items: MenuItem[] = [
    { id: "nav-home", items: [], title: "Home", url: "/" },
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
      title: "Shop",
      url: "/collections",
    },
    { id: "nav-blog", items: [], title: "Blog", url: "/guides" },
    {
      id: "nav-connect",
      items: [
        { id: "nav-about", items: [], title: "About", url: "/about" },
        { id: "nav-contact", items: [], title: "Contact us", url: "/contact" },
        // The manufacturing story lives on the About page.
        { id: "nav-manufacturing", items: [], title: "Manufacturing", url: "/about#manufacturing" },
      ],
      title: "Connect",
      url: "/contact",
    },
    { id: "nav-account", items: [], title: "My account", url: "/account" },
    { id: "nav-track", items: [], title: "Track order", url: "/track-order" },
  ];
  // Each brand shows up to three of its models with pictures; the brand with the most models is shown first.
  const mega: MegaMenu = {
    defaultId: "",
    details: {},
  };
  const ranked = [...brands].sort((a, b) => b.models.length - a.models.length);
  for (const brand of ranked) {
    const cards = brand.models
      .flatMap((model) =>
        model.image
          ? [
              {
                image: model.image,
                title: modelDisplayName(model.title),
                url: `/collections/${model.handle}`,
              },
            ]
          : [],
      )
      .slice(0, 3);
    if (cards.length === 0) continue;
    const id = `nav-brand-${brand.handle}`;
    mega.defaultId ||= id;
    mega.details[id] = {
      caption: `${brand.models.length} models`,
      cards,
      heading: brandDisplayName(brand.title),
    };
  }
  return (
    <>
      <nav
        className="sticky top-0 z-30 w-full border-b bg-background pt-[env(safe-area-inset-top,0px)] transition-shadow duration-250"
        id="nav-outer"
      >
        <Container className="relative flex h-18 lg:h-20 items-center justify-center gap-2.5 md:gap-8 lg:static lg:justify-between">
          <Link className="flex items-center shrink-0" href="/">
            <Image
              alt={shopConfig.site.name}
              className="h-10 w-auto md:h-12 lg:h-14 xl:h-16"
              height={48}
              priority
              sizes="100vw"
              src="/brand/aditya-logo-horizontal-orange-cropped.svg"
              unoptimized
              width={240}
            />
          </Link>

          <QuickLinks items={items} mega={{ "nav-models": mega }} />

          <div className="absolute right-4 flex items-center gap-5 lg:static lg:gap-7">
            {shopConfig.search.isEnabled && (
              <div className="hidden lg:block">
                <PredictiveSearchProvider
                  debounceInMs={300}
                  limit={3}
                  types={["PRODUCT", "COLLECTION", "QUERY"]}
                >
                  <SearchModal />
                </PredictiveSearchProvider>
              </div>
            )}
            {shopConfig.auth.isEnabled && (
              <Suspense fallback={<NavAccountFallback />}>
                <NavAccount />
              </Suspense>
            )}
            <div className="hidden lg:block">
              <Suspense fallback={<CartIconFallback />}>
                <CartIcon />
              </Suspense>
            </div>
          </div>
        </Container>
      </nav>
      <BottomBar items={items} />
    </>
  );
}
