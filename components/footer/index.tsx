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
      ],
      title: "Shop",
      url: "",
    },
    {
      id: "footer-company",
      items: [
        { id: "footer-about", items: [], title: "About", url: "/about" },
        { id: "footer-contact", items: [], title: "Contact", url: "/contact" },
      ],
      title: "Company",
      url: "",
    },
  ];
  if (policies.length > 0) {
    items.push({
      id: "footer-help",
      items: policies.map((policy) => ({
        id: policy.handle,
        items: [],
        title: policy.title,
        url: `/policies/${policy.handle}`,
      })),
      title: "Help",
      url: "",
    });
  }
  const hasContact = Boolean(contact.address || contact.email || contact.phone);

  return (
    <footer className="bg-foreground text-background">
      {/* pb-22 clears the fixed agent ActionBar pill when it renders */}
      <Container className={cn("pt-20 pb-10", shopConfig.agent.isEnabled && "pb-22")}>
        <Sections className="gap-16">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="grid content-start gap-4">
              <Image
                alt={shopConfig.site.name}
                className="-ml-3.5 h-14 w-auto"
                height={60}
                sizes="100vw"
                src="/brand/aditya-logo-horizontal-orange.svg"
                unoptimized
                width={180}
              />
              <p className="font-heading text-h3">Made to fit your scooter. Since 2006.</p>
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
          {/* The name returns at full width: the close, not another row of cards. */}
          <p aria-hidden className="font-heading text-display leading-none whitespace-nowrap">
            Aditya Auto
          </p>
        </Sections>
      </Container>
      <div className="border-t border-white/15 text-silver">
        <Container className="flex min-h-12 items-center py-3 text-small">
          &copy; {shopConfig.site.name}. All rights reserved.
        </Container>
      </div>
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
                className="block text-small text-silver transition-colors hover:text-background"
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
