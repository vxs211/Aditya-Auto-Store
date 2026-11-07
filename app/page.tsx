import type { Metadata } from "next";
import { Suspense } from "react";

import { GoogleReviews } from "@/components/home/google-reviews";
import {
  AboutIntro,
  BestSellers,
  BlogSection,
  BrandMosaic,
  HomeContactBand,
  HomeHero,
  InstagramFeed,
  ProofBand,
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
    <Page className="home-type pt-0">
      <HomeHero />
      <Sections className="gap-20 py-16 md:gap-32 md:py-24">
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
        <ProofBand />
        <Suspense fallback={null}>
          <InstagramFeed />
        </Suspense>
        <Suspense fallback={null}>
          <BlogSection />
        </Suspense>
        <GoogleReviews />
        <HomeContactBand />
      </Sections>
    </Page>
  );
}
