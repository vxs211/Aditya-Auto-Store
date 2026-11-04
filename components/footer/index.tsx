import { cn } from "cn";
import { CalendarDays, Factory, Ruler } from "lucide-react";
import Image from "next/image";

import { MenuLink } from "@/components/nav/menu-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Sections } from "@/components/ui/sections";
import { shopConfig } from "@/lib/config";
import type { MenuItem } from "@/lib/menu/types";
import { getShopPolicies } from "@/lib/policies/server";

import { SocialLinks } from "./social-links";
import type { SocialLink } from "./social-links";

const BADGES = [
  {
    body: "Footrests, bumpers, crash guards and fittings.",
    icon: Factory,
    title: "Made in our own factory",
  },
  { body: "Twenty years of honest dealing.", icon: CalendarDays, title: "Since 2006" },
  { body: "Accessories made for specific scooter models.", icon: Ruler, title: "Made to fit" },
];

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
        { id: "footer-models", items: [], title: "By scooter model", url: "/collections" },
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
    <footer className="bg-muted">
      {/* pb-22 clears the fixed agent ActionBar pill when it renders */}
      <Container className={cn("pt-20 pb-10", shopConfig.agent.isEnabled && "pb-22")}>
        <Sections className="gap-10">
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
              <Eyebrow>Made to fit your scooter. Since 2006.</Eyebrow>
              <p className="text-small text-muted-foreground">{shopConfig.site.description}</p>
              {hasContact && (
                <div className="grid gap-1 text-small text-muted-foreground">
                  {contact.address && <address className="not-italic">{contact.address}</address>}
                  {contact.phone && (
                    <a
                      className="transition-colors hover:text-foreground"
                      href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                    >
                      {contact.phone}
                    </a>
                  )}
                  {contact.email && (
                    <a
                      className="transition-colors hover:text-foreground"
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
          <ul className="grid gap-4 md:grid-cols-3">
            {BADGES.map(({ body, icon: Icon, title }) => (
              <li
                key={title}
                className="flex items-center gap-4 rounded-lg border bg-background p-4"
              >
                <Icon aria-hidden="true" className="size-8 shrink-0" />
                <div>
                  <p className="font-heading text-body font-semibold">{title}</p>
                  <p className="text-small text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Sections>
      </Container>
      <div className="bg-foreground text-silver">
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
                className="block text-small text-muted-foreground transition-colors hover:text-foreground"
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
