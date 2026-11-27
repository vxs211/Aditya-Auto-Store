import { PredictiveSearchProvider } from "@shopify/hydrogen/react";
import Image from "next/image";
import { Suspense } from "react";

import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { brandDisplayName, HIDDEN_MODEL_HANDLES, modelDisplayName } from "@/lib/collections";
import { getFitmentBrands } from "@/lib/collections/server";
import { shopConfig } from "@/lib/config";
import type { MenuItem } from "@/lib/menu/types";

import { NavAccount, NavAccountFallback } from "./account";
import { BottomBar } from "./bottom-bar";
import { CartIcon, CartIconFallback } from "./cart";
import { FooterAvoidance } from "./footer-avoidance";
import { QuickLinks, type MegaMenu } from "./quick-links";
import { SearchModal } from "./search-modal";

export async function Nav() {
  const brands = (await getFitmentBrands()).map((brand) => ({
    ...brand,
    models: brand.models.filter(({ handle }) => !HIDDEN_MODEL_HANDLES.has(handle)),
  }));
  const items: MenuItem[] = [
    { id: "nav-home", items: [], title: "Home", url: "/" },
    {
      id: "nav-models",
      items: brands.map((brand) => ({
        id: `nav-brand-${brand.handle}`,
        items: brand.models.map((model) => ({
          id: `nav-model-${model.handle}`,
          items: [],
          title: modelDisplayName(model.title, model.handle),
          url: `/collections/${model.handle}`,
        })),
        title: brandDisplayName(brand.title),
        url: `/collections/${brand.handle}`,
      })),
      title: "Shop",
      url: "/collections",
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
                title: modelDisplayName(model.title, model.handle),
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
      caption: `${brand.models.length} ${brand.models.length === 1 ? "model" : "models"}`,
      cards,
      heading: brandDisplayName(brand.title),
    };
  }
  return (
    <>
      <FooterAvoidance />
      <nav className="sticky top-0 z-30 w-full pt-[env(safe-area-inset-top,0px)]" id="nav-outer">
        <Container className="nav-entrance relative flex h-18 lg:h-20 items-center justify-center gap-2.5 rounded-b-3xl bg-white text-black md:gap-4 lg:max-w-fit lg:justify-center lg:gap-8 lg:px-8 lg:before:pointer-events-none lg:before:absolute lg:before:top-0 lg:before:-left-8 lg:before:size-8 lg:before:bg-[radial-gradient(circle_at_bottom_left,transparent_32px,white_32.5px)] lg:before:content-[''] lg:after:pointer-events-none lg:after:absolute lg:after:top-0 lg:after:-right-8 lg:after:size-8 lg:after:bg-[radial-gradient(circle_at_bottom_right,transparent_32px,white_32.5px)] lg:after:content-[''] motion-safe:animate-[nav-reveal_1.2s_cubic-bezier(0.22,1,0.36,1)_backwards]">
          <Link className="flex items-center shrink-0" href="/">
            <Image
              alt={shopConfig.site.name}
              className="h-10 w-auto md:h-12 lg:h-12"
              height={48}
              priority
              sizes="100vw"
              src="/brand/aditya-logo-horizontal-orange-cropped.svg"
              unoptimized
              width={240}
            />
          </Link>

          <QuickLinks items={items} mega={{ "nav-models": mega }} />

          <div className="absolute right-4 flex items-center gap-5 text-black [&_button]:text-black lg:static lg:gap-5">
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
      <BottomBar />
    </>
  );
}
