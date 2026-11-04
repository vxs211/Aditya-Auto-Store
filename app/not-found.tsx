import { createShopifyRequestContext, handleShopifyRedirects } from "@shopify/hydrogen";
import { headers } from "next/headers";
import { permanentRedirect, redirect } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { brandDisplayName } from "@/lib/collections";
import { getFitmentBrands } from "@/lib/collections/server";
import { shopConfig } from "@/lib/config";
import { SHOPIFY_ROUTE_TEMPLATES } from "@/lib/shopify/routing";
import { createRequestStorefrontClient } from "@/lib/shopify/storefront/server";

export default function NotFoundError() {
  return (
    <Page className="flex flex-1 flex-col pt-0 md:pt-0">
      {shopConfig.redirects.shopifyNotFound.isEnabled ? (
        <Suspense fallback={null}>
          <ShopifyNotFoundRedirect />
        </Suspense>
      ) : null}
      <section className="bg-foreground text-background">
        <Container className="grid gap-5 py-16 md:py-28">
          <p aria-hidden className="font-heading text-display leading-none text-primary">
            404
          </p>
          <h1 className="text-h1 max-w-2xl">This page is not here</h1>
          <p className="max-w-xl text-silver">
            The link may be wrong, or the page has been moved. Find your scooter and see what fits.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button render={<Link href="/collections" />}>Shop by model</Button>
            <Button render={<Link href="/search" />} variant="inverse">
              Search
            </Button>
          </div>
        </Container>
      </section>
      <Container className="py-16 md:py-24">
        <Suspense fallback={null}>
          <PopularBrands />
        </Suspense>
      </Container>
    </Page>
  );
}

async function PopularBrands() {
  const brands = await getFitmentBrands();
  if (brands.length === 0) return null;
  return (
    <section className="grid gap-5">
      <h2 className="font-heading text-h3">Shop by brand</h2>
      <ul className="flex flex-wrap gap-3">
        {brands.map((brand) => (
          <li key={brand.handle}>
            <Button render={<Link href={`/collections/${brand.handle}`} />} variant="outline">
              {brandDisplayName(brand.title)}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}

async function ShopifyNotFoundRedirect() {
  const requestHeaders = await headers();
  const url = requestHeaders.get("x-storefront-url");
  if (!url) return null;

  const request = new Request(url, { headers: requestHeaders });
  const requestContext = createShopifyRequestContext({
    i18n: shopConfig.localization,
    request,
  });
  const response = await handleShopifyRedirects({
    request,
    routeTemplates: SHOPIFY_ROUTE_TEMPLATES,
    storefrontClient: createRequestStorefrontClient(requestContext),
  });
  if (!response) return null;
  const location = response.headers.get("location");
  if (!location) return null;

  if (response.status === 301 || response.status === 308) permanentRedirect(location);
  redirect(location);
}
