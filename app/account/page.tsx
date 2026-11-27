import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { redirect } from "next/navigation";
import { type ComponentProps, type ComponentType, type ReactNode, Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import {
  PremiumHouseIcon,
  PremiumPackageIcon,
  PremiumTruckIcon,
  PremiumUserIcon,
} from "@/components/ui/premium-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Sections } from "@/components/ui/sections";
import { isCustomerLoggedIn } from "@/lib/auth/server";
import { shopConfig } from "@/lib/config";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "600"] });

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
    icon: PremiumPackageIcon,
    title: "Orders",
  },
  {
    body: "Update your name, email and phone",
    href: "/account/profile",
    icon: PremiumUserIcon,
    title: "Profile",
  },
  {
    body: "Add or edit saved delivery addresses",
    href: "/account/addresses",
    icon: PremiumHouseIcon,
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
      <section className="bg-white py-12 sm:py-16 lg:py-24">
        <Container className="grid justify-items-center gap-6 text-center">
          <div className="grid justify-items-center gap-3">
            <p className="text-label font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Your account
            </p>
            <SectionHeading align="center" title="Manage your account" />
            <p className="max-w-xl text-body text-pretty text-muted-foreground">
              View orders, update your profile, manage addresses, or track a recent order, all in
              one place.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <AuthButton enabled={enabled} primary>
              Sign in
            </AuthButton>
            <AuthButton enabled={enabled}>Create account</AuthButton>
          </div>
          {!enabled && (
            <p className="max-w-xl text-small text-muted-foreground">
              Online accounts are not switched on yet. You can still track an order below or message
              us.
            </p>
          )}
        </Container>
      </section>

      <section className="bg-white pb-12 sm:pb-16 lg:pb-24" data-reveal>
        <Container className="grid gap-8 sm:gap-10">
          <div className="grid justify-items-center gap-3 text-center">
            <SectionHeading align="center" title="What you can do" />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AREAS.map(({ body, href, icon, title }) => (
              <li key={title}>
                {enabled ? (
                  <a className={TILE} href={loginHref(href)}>
                    <TileText body={body} icon={icon} title={title} />
                  </a>
                ) : (
                  <div className={`${TILE} opacity-60`}>
                    <TileText body={body} icon={icon} title={title} />
                  </div>
                )}
              </li>
            ))}
            <li>
              <Link className={TILE} href="/track-order">
                <TileText
                  body="Ask us where a recent order is"
                  icon={PremiumTruckIcon}
                  title="Track order"
                />
              </Link>
            </li>
          </ul>

          <div className="grid gap-5 rounded-2xl bg-white p-6 shadow-card sm:p-10 md:flex md:items-center md:justify-between">
            <div className="grid max-w-2xl gap-2">
              <h2 className={`${interTight.className} text-2xl leading-tight font-semibold`}>
                New to {shopConfig.site.name}?
              </h2>
              <p className="text-body text-pretty text-muted-foreground">
                Create an account to see your orders and save your delivery addresses. Sign in with
                your email; if you are new, your account is created the first time.
              </p>
            </div>
            <AuthButton enabled={enabled} primary>
              Create account
            </AuthButton>
          </div>
        </Container>
      </section>
    </Page>
  );
}

const TILE =
  "group grid h-full content-start gap-4 rounded-2xl bg-white p-3 shadow-card transition-shadow hover:shadow-card-hover sm:p-4";

const PRIMARY_PILL =
  "h-12 rounded-full border border-primary-hover bg-linear-to-b from-primary from-65% to-[#ffae78] px-6 text-base text-white shadow-lg ring-1 ring-white/25 ring-inset hover:shadow-xl";
const SECONDARY_PILL =
  "h-12 rounded-full bg-white px-6 text-base text-foreground shadow-card hover:bg-white hover:shadow-card-hover";

// Sign-in is a plain link so it stays a full document navigation, see loginHref.
function AuthButton({
  children,
  enabled,
  primary,
}: {
  children: ReactNode;
  enabled: boolean;
  primary?: boolean;
}) {
  const className = primary ? PRIMARY_PILL : SECONDARY_PILL;
  const variant = primary ? "default" : "secondary";
  if (!enabled)
    return (
      <Button className={className} disabled size="lg" variant={variant}>
        {children}
      </Button>
    );
  return (
    <Button
      className={className}
      render={
        // oxlint-disable-next-line next/no-html-link-for-pages -- full document navigation, see loginHref.
        <a href={loginHref()} />
      }
      size="lg"
      variant={variant}
    >
      {children}
    </Button>
  );
}

function TileText({
  body,
  icon: Icon,
  title,
}: {
  body: string;
  icon: ComponentType<ComponentProps<"svg">>;
  title: string;
}) {
  return (
    <>
      <span className="grid aspect-[16/9] place-items-center rounded-2xl bg-[#fff1e8]">
        <Icon
          aria-hidden="true"
          className="size-12 text-primary transition-transform group-hover:scale-110 motion-reduce:transform-none"
        />
      </span>
      <span className="grid gap-1 px-1 pb-1">
        <h3
          className={`${interTight.className} text-lg leading-tight font-semibold text-foreground`}
        >
          {title}
        </h3>
        <p className="text-small text-pretty text-muted-foreground">{body}</p>
      </span>
    </>
  );
}

// Someone already signed in goes straight to their account.
async function SendSignedInCustomerOn() {
  if (await isCustomerLoggedIn()) redirect("/account/profile");
  return null;
}
