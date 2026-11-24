import { cn } from "cn";
import Image from "next/image";

import { MenuLink } from "@/components/nav/menu-link";
import { Container } from "@/components/ui/container";
import {
  PhoneIcon as HeadphonesIcon,
  ShieldCheckIcon,
  WorkflowIcon as FactoryIcon,
} from "@/components/ui/icon";
import { shopConfig } from "@/lib/config";
import { getShopPolicies } from "@/lib/policies/server";

import { SocialLinks } from "./social-links";
import type { SocialLink } from "./social-links";

interface FooterLink {
  title: string;
  url: string;
}

const QUICK_LINKS: FooterLink[] = [
  { title: "Home", url: "/" },
  { title: "About us", url: "/about" },
  { title: "Manufacturing", url: "/about#manufacturing" },
  { title: "Shop by model", url: "/collections" },
  { title: "Blog", url: "/guides" },
  { title: "Contact us", url: "/contact" },
];

// Only claims we can back: parts are checked while they are made, in our own unit, with support in shop hours.
const TRUST = [
  { body: "Checked as it is made", icon: ShieldCheckIcon, title: "Quality assured" },
  { body: "Our own unit in Ahmedabad", icon: FactoryIcon, title: "Made in India" },
  { body: "Help when you need it", icon: HeadphonesIcon, title: "Customer support" },
];

const HEADING = "text-label font-medium text-black/55";

export async function Footer() {
  const { contact, social } = shopConfig;
  const socialLinks = (
    Object.entries(social) as [SocialLink["platform"], string | undefined][]
  ).flatMap(([platform, url]) => (url ? [{ platform, url }] : []));
  const policies = await getShopPolicies({}).catch(() => []);
  const helpLinks: FooterLink[] = [
    { title: "FAQ", url: "/faq" },
    { title: "Track your order", url: "/track-order" },
    { title: "My account", url: "/account" },
    { title: "Return and refund policy", url: "/return-policy" },
    { title: "Terms of service", url: "/terms" },
    // Terms, refund and shipping policies appear here on their own once they are written in Shopify admin.
    ...policies
      .filter((policy) => !/refund|return|terms/i.test(policy.handle))
      .map((policy) => ({ title: policy.title, url: `/policies/${policy.handle}` })),
  ];
  const phone2Href = contact.secondaryPhone
    ? `tel:${contact.secondaryPhone.replace(/[^\d+]/g, "")}`
    : null;
  const phoneHref = contact.phone ? `tel:${contact.phone.replace(/[^\d+]/g, "")}` : null;

  // Below lg the footer fills the screen and sits above the sticky header, so it slides over the logo bar.
  return (
    <footer className="relative z-40 flex min-h-dvh flex-col bg-[linear-gradient(180deg,#ffffff_0%,#F66101_100%)] pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] text-foreground lg:z-auto lg:min-h-0 lg:pb-0">
      {/* pb-22 clears the fixed agent ActionBar pill when it renders */}
      <Container
        className={cn(
          "flex-1 pt-12 pb-10 md:pt-20 lg:flex-none",
          shopConfig.agent.isEnabled && "pb-22",
        )}
      >
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr] lg:gap-12">
          <div className="grid content-start gap-6">
            <Image
              alt={shopConfig.site.name}
              className="h-12 w-auto self-start"
              height={48}
              sizes="100vw"
              src="/brand/aditya-logo-horizontal-orange-cropped.svg"
              unoptimized
              width={240}
            />
            <p className="max-w-md text-[1.125rem] leading-[1.55] text-muted-foreground">
              {shopConfig.site.description}
            </p>
            {socialLinks.length > 0 && (
              <div className="grid gap-4 border-t border-hairline pt-6">
                <h3 className={HEADING}>Follow Aditya</h3>
                <SocialLinks links={socialLinks} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6 lg:contents">
            <FooterList links={QUICK_LINKS} title="Quick links" />
            <FooterList links={helpLinks} title="Help" />
          </div>

          <div className="grid content-start gap-6 rounded-xl bg-muted p-6 md:col-span-2 md:p-8 lg:col-span-1">
            <div className="grid gap-3">
              <h3 className={HEADING}>Address</h3>
              <address className="text-muted-foreground not-italic">
                {contact.address ?? "Ahmedabad, Gujarat, India"}
              </address>
            </div>
          </div>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {TRUST.map(({ body, icon: Icon, title }) => (
            <li
              className="hidden items-center gap-4 rounded-xl border border-hairline p-5 md:flex"
              key={title}
            >
              <span className="hidden size-11 shrink-0 items-center justify-center rounded-lg bg-primary-tint text-primary-hover md:flex">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-small text-muted-foreground">{body}</p>
              </div>
            </li>
          ))}
          {contact.phone && phoneHref && (
            <li className="grid content-center gap-1 rounded-xl bg-primary p-5 text-primary-foreground">
              <p className="text-small">Need help? Call us</p>
              <a className="text-h4" href={phoneHref}>
                {contact.phone}
              </a>
              {contact.secondaryPhone && phone2Href && (
                <a className="text-h4" href={phone2Href}>
                  {contact.secondaryPhone}
                </a>
              )}
            </li>
          )}
        </ul>
      </Container>
      <div className="relative aspect-[1338/185] w-full overflow-hidden" aria-hidden="true">
        <Image
          alt=""
          className="absolute top-1/2 left-1/2 h-auto w-[224.22%] max-w-none -translate-x-1/2 -translate-y-[48.85%]"
          height={1000}
          sizes="100vw"
          src="/btmArtboard 1.png"
          unoptimized
          width={3000}
        />
      </div>
      <div className="border-t border-hairline text-muted-foreground">
        <Container className="flex min-h-12 items-center py-3 text-small">
          {/* shortcut: the year is typed in, change it each January */}
          &copy; 2026 {shopConfig.site.name}. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}

function FooterList({ links, title }: { links: FooterLink[]; title: string }) {
  return (
    <div className="grid content-start gap-4">
      <h3 className={HEADING}>{title}</h3>
      <ul className="grid gap-3">
        {links.map((link) => (
          <li key={link.url}>
            <MenuLink
              url={link.url}
              className="block text-ink-soft transition-colors hover:text-foreground hover:underline"
            >
              {link.title}
            </MenuLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
