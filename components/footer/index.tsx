import { cn } from "cn";
import Image from "next/image";

import { MenuLink } from "@/components/nav/menu-link";
import { Container } from "@/components/ui/container";
import { Sections } from "@/components/ui/sections";
import { shopConfig } from "@/lib/config";
import type { MenuItem } from "@/lib/menu/types";
import { getShopPolicies } from "@/lib/policies/server";

import { SocialLinks } from "./social-links";
import type { SocialLink } from "./social-links";

export async function Footer() {
  const { contact, social } = shopConfig;
  const socialLinks = (
    Object.entries(social) as [SocialLink["platform"], string | undefined][]
  ).flatMap(([platform, url]) => (url ? [{ platform, url }] : []));
  const policies = await getShopPolicies({}).catch(() => []);
  const items: MenuItem[] = [
    {
      id: "footer-shop",
      items: [
        { id: "footer-products", items: [], title: "Products", url: "/collections/all" },
        { id: "footer-models", items: [], title: "Shop by model", url: "/collections" },
        { id: "footer-guides", items: [], title: "Guides", url: "/guides" },
      ],
      title: "Shop",
      url: "",
    },
    {
      id: "footer-company",
      items: [
        { id: "footer-about", items: [], title: "About", url: "/about" },
        { id: "footer-contact", items: [], title: "Contact", url: "/contact" },
        // Shown only once Shopify customer accounts are switched on.
        ...(shopConfig.auth.isEnabled
          ? [{ id: "footer-account", items: [], title: "My account", url: "/account" }]
          : []),
      ],
      title: "Company",
      url: "",
    },
  ];
  items.push({
    id: "footer-help",
    items: [
      { id: "footer-faq", items: [], title: "FAQ", url: "/faq" },
      { id: "footer-track", items: [], title: "Track your order", url: "/track-order" },
      ...policies.map((policy) => ({
        id: policy.handle,
        items: [],
        title: policy.title,
        url: `/policies/${policy.handle}`,
      })),
    ],
    title: "Help",
    url: "",
  });
  const hasContact = Boolean(contact.address || contact.email || contact.phone);

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
        <Sections className="gap-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-10">
            <div className="col-span-2 grid content-start gap-4 md:col-span-1">
              <p className="font-heading text-h3 text-balance">
                Made to fit your scooter. Since 2006.
              </p>
              <p className="text-small text-silver">{shopConfig.site.description}</p>
              {hasContact && (
                <div className="grid gap-1 text-small text-silver">
                  {contact.address && <address className="not-italic">{contact.address}</address>}
                  {contact.phone && (
                    <a
                      className="transition-colors hover:text-background"
                      href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                    >
                      {contact.phone}
                    </a>
                  )}
                  {contact.email && (
                    <a
                      className="transition-colors hover:text-background"
                      href={`mailto:${contact.email}`}
                    >
                      {contact.email}
                    </a>
                  )}
                </div>
              )}
              {socialLinks.length > 0 && <SocialLinks links={socialLinks} />}
            </div>
            <FooterMenu items={items} />
          </div>
        </Sections>
      </Container>
      <div className="border-t border-white/15 text-silver">
        <Container className="flex min-h-12 items-center py-3 text-small">
          &copy; {shopConfig.site.name}. All rights reserved.
        </Container>
      </div>
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
    </footer>
  );
}

function FooterMenu({ items }: { items: MenuItem[] }) {
  return items.slice(0, 5).map((column) => (
    <div key={column.id} className="grid content-start gap-3">
      <h3 className="font-heading text-body font-semibold">{column.title}</h3>
      {column.items.length > 0 && (
        <ul className="grid gap-2">
          {column.items.map((leaf) => (
            <li key={leaf.id}>
              <MenuLink
                url={leaf.url}
                className="block py-0.5 text-small text-silver transition-colors hover:text-background"
              >
                {leaf.title}
              </MenuLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  ));
}
