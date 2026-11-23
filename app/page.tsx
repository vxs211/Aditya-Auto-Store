import type { Metadata } from "next";
import { Suspense } from "react";

import { GoogleReviews } from "@/components/home/google-reviews";
import {
  BestSellers,
  BlogSection,
  HomeContactBand,
  HomeHero,
  PartsTour,
  ShopByBrand,
  VehicleLineup,
  WhyAditya,
} from "@/components/home/sections";
import { Page } from "@/components/ui/page";
import { shopConfig } from "@/lib/config";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const DESCRIPTION = shopConfig.site.description;

export const metadata: Metadata = {
  title: "Scooter accessories made to fit",
  description: DESCRIPTION,
  alternates: buildAlternates({ pathname: "/" }),
  openGraph: buildOpenGraph({
    description: DESCRIPTION,
    title: shopConfig.site.name,
    type: "website",
    url: "/",
  }),
};

export default function HomePage() {
  return (
    <Page className="relative gap-0 pt-0 before:pointer-events-none before:absolute before:inset-x-0 before:-top-18 before:h-18 before:bg-[#F66101] lg:before:-top-20 lg:before:h-20">
      <Suspense fallback={null}>
        <HomeHero />
      </Suspense>
      <ShopByBrand />
      <Suspense fallback={null}>
        <VehicleLineup />
      </Suspense>
      <Suspense fallback={null}>
        <PartsTour />
      </Suspense>
      <Suspense fallback={null}>
        <BestSellers />
      </Suspense>
      <Suspense fallback={null}>
        <WhyAditya />
      </Suspense>
      <GoogleReviews />
      <Suspense fallback={null}>
        <BlogSection />
      </Suspense>
      <HomeContactBand />
    </Page>
  );
}
