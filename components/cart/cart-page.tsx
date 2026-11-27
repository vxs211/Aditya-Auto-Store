"use client";

import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { PageHero, PRIMARY_PILL } from "@/components/ui/page-cards";
import { PremiumBagIcon } from "@/components/ui/premium-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { useSuspenseCart } from "@/lib/cart/client";

import { CartLineItems } from "./line-item";
import { CartSummary } from "./summary";
import { CartWarnings } from "./warnings";

export function CartPageContent() {
  const cart = useSuspenseCart((state) => state.data);

  if (cart.totalQuantity === 0) {
    return (
      <Page className="bg-white pt-0 md:pt-0">
        <PageHero title="Your cart" />
        <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
          <Container className="grid max-w-xl justify-items-center gap-5 rounded-2xl bg-white p-8 text-center shadow-card sm:p-12">
            <span className="grid size-20 place-items-center rounded-2xl bg-[#fff1e8]">
              <PremiumBagIcon className="size-12 text-primary" />
            </span>
            <div className="grid gap-1">
              <h2 className="font-heading text-2xl">Your cart is empty</h2>
              <p className="text-body text-muted-foreground">
                Pick your scooter and see the parts made for it.
              </p>
            </div>
            <Button className={PRIMARY_PILL} render={<Link href="/collections" />} size="lg">
              Continue shopping
            </Button>
          </Container>
        </section>
      </Page>
    );
  }

  return (
    <CartPageLayout
      count={
        <span className="flex size-8 items-center justify-center rounded-full bg-primary text-base font-semibold text-white tabular-nums">
          {cart.totalQuantity}
        </span>
      }
      summary={<CartSummary cart={cart} />}
      warnings={<CartWarnings />}
    >
      <CartLineItems cards lines={cart.lines.nodes} />
    </CartPageLayout>
  );
}

export function CartPageSkeleton() {
  return (
    <CartPageLayout
      aria-busy="true"
      count={<Skeleton className="size-7 rounded-full" />}
      summary={
        <div className="grid gap-5">
          <div className="grid gap-2.5">
            <div className="flex gap-2.5">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 w-18 rounded-lg" />
            </div>
            <div className="grid gap-1">
              <div className="flex h-7 items-center justify-between">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <Skeleton className="h-12 rounded-lg" />
        </div>
      }
    >
      <ul className="grid gap-5">
        {[0, 1, 2].map((index) => (
          <li key={index} className="flex gap-2.5">
            <Skeleton className="size-18 shrink-0 rounded-none" />
            <div className="grid min-h-18 flex-1 gap-2.5 pt-0.5">
              <div className="grid gap-1">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <Skeleton className="h-6 w-20 self-end rounded-full" />
            </div>
            <Skeleton className="h-5 w-16" />
          </li>
        ))}
      </ul>
    </CartPageLayout>
  );
}

interface CartPageLayoutProps extends ComponentProps<"div"> {
  count: ReactNode;
  summary: ReactNode;
  warnings?: ReactNode;
}

function CartPageLayout({ children, count, summary, warnings, ...props }: CartPageLayoutProps) {
  return (
    <Page className="bg-white pt-0 md:pt-0" {...props}>
      <section className="bg-white pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-24 lg:pb-12">
        <Container className="flex items-center justify-center gap-3">
          <SectionHeading align="center" title="Your cart" />
          {count}
        </Container>
      </section>
      <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
        <Container className="grid gap-5">
          {warnings}
          <div className="grid items-start gap-3 lg:grid-cols-12">
            <div className="lg:col-span-8">{children}</div>
            <aside className="lg:sticky lg:top-24 lg:col-span-4">
              <div className="rounded-2xl bg-white p-5 shadow-card sm:p-6">{summary}</div>
            </aside>
          </div>
        </Container>
      </section>
    </Page>
  );
}
