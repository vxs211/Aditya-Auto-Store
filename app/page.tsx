import type { Metadata } from "next";
import { Suspense } from "react";

import {
  AboutIntro,
  BestSellers,
  BrandMosaic,
  HomeContactBand,
  HomeHero,
  Marquee,
  ModelStrip,
} from "@/components/home/sections";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
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
    <Page className="pt-0">
      <HomeHero />
      <Sections className="py-12 md:py-16">
        <Suspense fallback={null}>
          <ModelStrip />
        </Suspense>
        <Suspense fallback={null}>
          <BestSellers />
        </Suspense>
        <AboutIntro />
        <Suspense fallback={null}>
          <BrandMosaic />
        </Suspense>
        <Marquee />
        <HomeContactBand />
      </Sections>
    </Page>
  );
}
