import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Highlight } from "@/components/ui/highlight";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { SectionHeading } from "@/components/ui/section-heading";
import { Sections } from "@/components/ui/sections";
import { isCustomerLoggedIn } from "@/lib/auth/server";
import { shopConfig } from "@/lib/config";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const TITLE = "My account";
const DESCRIPTION =
  "Sign in or create an account to see your orders, update your profile and manage saved delivery addresses.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: buildAlternates({ pathname: "/account" }),
  openGraph: buildOpenGraph({
    description: DESCRIPTION,
    title: TITLE,
    type: "website",
    url: "/account",
  }),
};

// Account pages sit behind Shopify sign-in; the sign-in step returns the customer to where they were headed.
const AREAS = [
  {
    body: "See order history, status and invoices",
    href: "/account/orders",
    title: "Orders",
  },
  {
    body: "Update your name, email and phone",
    href: "/account/profile",
    title: "Profile",
  },
  {
    body: "Add or edit saved delivery addresses",
    href: "/account/addresses",
    title: "Addresses",
  },
];

// Sign-in must be a full document navigation that is never prefetched, because the proxy starts OAuth.
function loginHref(returnTo?: string): string {
  return returnTo ? `/account/login?return_to=${encodeURIComponent(returnTo)}` : "/account/login";
}

export default function AccountLandingPage() {
  const enabled = shopConfig.auth.isEnabled;
  return (
    <Page className="pt-0 md:pt-0">
      {enabled && (
        <Suspense fallback={null}>
          <SendSignedInCustomerOn />
        </Suspense>
      )}
      <section className="bg-foreground text-background">
        <Container className="grid gap-5 py-12 md:py-20">
          <h1 className="text-display max-w-3xl">
            Manage your <Highlight>account</Highlight>
          </h1>
          <p className="max-w-2xl text-silver">
            View orders, update your profile, manage addresses, or track a recent order, all in one
            place.
          </p>
          <div className="flex flex-wrap gap-3">
            {enabled ? (
              <>
                <Button
                  render={
                    // oxlint-disable-next-line next/no-html-link-for-pages -- full document navigation, see loginHref.
                    <a href={loginHref()} />
                  }
                  size="lg"
                >
                  Sign in
                </Button>
                <Button
                  render={
                    // oxlint-disable-next-line next/no-html-link-for-pages -- full document navigation, see loginHref.
                    <a href={loginHref()} />
                  }
                  size="lg"
                  variant="inverse"
                >
                  Create account
                </Button>
              </>
            ) : (
              <>
                <Button disabled size="lg">
                  Sign in
                </Button>
                <Button disabled size="lg" variant="inverse">
                  Create account
                </Button>
              </>
            )}
          </div>
          {!enabled && (
            <p className="max-w-2xl text-small text-silver">
              Online accounts are not switched on yet. You can still track an order below or message
              us.
            </p>
          )}
        </Container>
      </section>

      <Container>
        <Sections className="gap-20 py-16 md:gap-28 md:py-20">
          <section className="grid gap-8" data-reveal>
            <SectionHeading title="What you can do" />
            <ul className="grid gap-4 sm:grid-cols-2">
              {AREAS.map(({ body, href, title }) => (
                <li key={title}>
                  {enabled ? (
                    <a className={TILE} href={loginHref(href)}>
                      <TileText body={body} title={title} />
                    </a>
                  ) : (
                    <div className={`${TILE} opacity-60`}>
                      <TileText body={body} title={title} />
                    </div>
                  )}
                </li>
              ))}
              <li>
                <Link className={TILE} href="/track-order">
                  <TileText body="Ask us where a recent order is" title="Track order" />
                </Link>
              </li>
            </ul>
          </section>

          <section
            className="grid gap-5 bg-muted p-8 md:flex md:items-center md:justify-between md:p-14"
            data-reveal
          >
            <div className="max-w-2xl">
              <h2 className="text-h3">New to {shopConfig.site.name}?</h2>
              <p className="text-muted-foreground">
                Create an account to see your orders and save your delivery addresses. Sign in with
                your email; if you are new, your account is created the first time.
              </p>
            </div>
            {enabled ? (
              <Button
                render={
                  // oxlint-disable-next-line next/no-html-link-for-pages -- full document navigation, see loginHref.
                  <a href={loginHref()} />
                }
                size="lg"
              >
                Create account
              </Button>
            ) : (
              <Button disabled size="lg">
                Create account
              </Button>
            )}
          </section>
        </Sections>
      </Container>
    </Page>
  );
}

const TILE = "grid h-full gap-2 bg-muted p-6 transition-colors hover:bg-accent md:p-8";

function TileText({ body, title }: { body: string; title: string }) {
  return (
    <>
      <h2 className="text-h3">{title}</h2>
      <p className="text-muted-foreground">{body}</p>
    </>
  );
}

// Someone already signed in goes straight to their account.
async function SendSignedInCustomerOn() {
  if (await isCustomerLoggedIn()) redirect("/account/profile");
  return null;
}
