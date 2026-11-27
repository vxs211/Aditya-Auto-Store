import { BotIdClient } from "botid/client";
import type { Metadata, Viewport } from "next";
import { Geist, Inter, Michroma } from "next/font/google";

import "./globals.css";
import Script from "next/script";
import { Suspense, ViewTransition } from "react";

import { ActionBar } from "@/components/action-bar";
import { AgentButton } from "@/components/agent/agent-button";
import { AnalyticsComponents } from "@/components/analytics";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CartUI } from "@/components/cart/cart-ui";
import { CartProviderWrapper } from "@/components/cart/context";
import { CartStandardActionsScript } from "@/components/cart/standard-actions";
import { Footer } from "@/components/footer";
import { CursorFollower } from "@/components/motion/cursor-follower";
import { PageMotion } from "@/components/motion/page-motion";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Nav } from "@/components/nav";
import { PrivacyNotice } from "@/components/privacy-notice";
import { SiteSchema } from "@/components/schema/site-schema";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { botIdProtectedRoutes } from "@/lib/botid";
import { seedCartData } from "@/lib/cart/server";
import { brandDisplayName, modelDisplayName } from "@/lib/collections";
import { getFitmentBrands } from "@/lib/collections/server";
import { shopConfig } from "@/lib/config";

export const ensureStatic = "prefetch";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
});

async function StoreAssistant() {
  const brands = (await getFitmentBrands()).map(({ handle, models, title }) => ({
    handle,
    models: models
      .filter(
        ({ handle }) =>
          handle !== "chetak-black-accessories" && handle !== "chetak-c2501-black-accessories",
      )
      .map(({ handle, title }) => ({ handle, title: modelDisplayName(title, handle) })),
    title: brandDisplayName(title),
  }));
  return <AgentButton brands={brands} />;
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Un-awaited: the promise streams to the client provider; never block the shell on it.
  const cartData = seedCartData();
  return (
    <html lang={shopConfig.localization.locale} suppressHydrationWarning>
      <head>
        {/* Marks whether this visit began on the home page, so the nav and bottom bar only play their entrance then. */}
        <Script
          id="first-home"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.dataset.firstHome=location.pathname==='/'?'1':'0'",
          }}
        />
        {shopConfig.botid.isEnabled && <BotIdClient protect={botIdProtectedRoutes} />}
        <CartStandardActionsScript />
      </head>
      <body
        className={`${geist.variable} ${inter.variable} ${michroma.variable} flex min-h-dvh flex-col font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-background focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg focus:ring-2 focus:ring-foreground focus:outline-none"
        >
          Skip to content
        </a>
        <SiteSchema />

        <CartProviderWrapper cartData={cartData}>
          <AnnouncementBar />
          <Nav />
          <main id="main-content" className="flex flex-1 flex-col min-w-0">
            <ViewTransition default="page-fade">{children}</ViewTransition>
          </main>
          <Footer />
          <CursorFollower />
          <WhatsAppButton />
          <PrivacyNotice />
          <Suspense fallback={null}>
            <PageMotion />
          </Suspense>
          <SmoothScroll />
          <CartUI />
          <Suspense>
            <ActionBar>{shopConfig.agent.isEnabled && <StoreAssistant />}</ActionBar>
          </Suspense>
          <Suspense>
            <AnalyticsComponents />
          </Suspense>
        </CartProviderWrapper>
      </body>
    </html>
  );
}

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    description: shopConfig.site.description,
    generator: shopConfig.site.name,
    metadataBase: new URL(shopConfig.site.url),
    openGraph: {
      images: [{ url: "/og-default.png", width: 1200, height: 628 }],
    },
    title: {
      default: shopConfig.site.name,
      template: `%s | ${shopConfig.site.name}`,
    },
  };
};
