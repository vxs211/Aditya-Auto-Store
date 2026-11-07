import { cn } from "cn";
import { FactoryIcon, HeadphonesIcon, ShieldCheckIcon } from "lucide-react";
import Image from "next/image";

import { MenuLink } from "@/components/nav/menu-link";
import { Container } from "@/components/ui/container";
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

const HEADING = "font-heading text-body font-semibold uppercase tracking-[0.12em]";

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
    <footer className="relative z-40 flex min-h-dvh flex-col bg-foreground pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] text-background lg:z-auto lg:min-h-0 lg:pb-0">
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
            <p className="max-w-md text-silver">{shopConfig.site.description}</p>
            {socialLinks.length > 0 && (
              <div className="grid gap-4 border-t border-white/15 pt-6">
                <h3 className={HEADING}>Follow Aditya</h3>
                <SocialLinks links={socialLinks} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6 lg:contents">
            <FooterList links={QUICK_LINKS} title="Quick links" />
            <FooterList links={helpLinks} title="Help" />
          </div>

          <div className="grid content-start gap-6 bg-white/[0.06] p-6 md:col-span-2 md:p-8 lg:col-span-1">
            <div className="grid gap-3">
              <h3 className={HEADING}>Address</h3>
              <address className="text-silver not-italic">
                {contact.address ?? "Ahmedabad, Gujarat, India"}
              </address>
            </div>
          </div>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {TRUST.map(({ body, icon: Icon, title }) => (
            <li className="flex items-center gap-4 bg-white/[0.06] p-5" key={title}>
              <span className="flex size-11 shrink-0 items-center justify-center bg-primary/15 text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-heading font-semibold">{title}</p>
                <p className="text-small text-silver">{body}</p>
              </div>
            </li>
          ))}
          {contact.phone && phoneHref && (
            <li className="grid content-center gap-1 bg-primary p-5 text-primary-foreground">
              <p className="text-small">Need help? Call us</p>
              <a className="font-heading text-h4 font-semibold" href={phoneHref}>
                {contact.phone}
              </a>
              {contact.secondaryPhone && phone2Href && (
                <a className="font-heading text-h4 font-semibold" href={phone2Href}>
                  {contact.secondaryPhone}
                </a>
              )}
            </li>
          )}
        </ul>
      </Container>
      {/* Edge to edge on small screens; held to the content grid on wide ones. */}
      <Image
        alt=""
        aria-hidden
        className="mx-auto block h-auto w-full max-w-312 lg:px-6"
        height={226}
        sizes="100vw"
        src="/brand/footer-name.svg"
        unoptimized
        width={1610}
      />
      <div className="border-t border-white/15 text-silver">
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
              className="block text-silver transition-colors hover:text-background"
            >
              {link.title}
            </MenuLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
