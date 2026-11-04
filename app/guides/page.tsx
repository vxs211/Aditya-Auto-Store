import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { GUIDES } from "@/lib/guides";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const TITLE = "Scooter accessory guides";
const DESCRIPTION =
  "Plain guides to choosing scooter accessories: fitment, stainless steel and what each guard does, from Aditya Auto Accessories.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: buildAlternates({ pathname: "/guides" }),
  openGraph: buildOpenGraph({
    description: DESCRIPTION,
    title: TITLE,
    type: "website",
    url: "/guides",
  }),
};

export default function GuidesPage() {
  return (
    <Page className="pt-0 md:pt-0">
      <section className="bg-foreground text-background">
        <Container className="grid gap-4 py-12 md:py-20">
          <h1 className="text-display max-w-3xl">Guides</h1>
          <p className="max-w-2xl text-silver">
            How to pick the right parts for your scooter, from the people who make them.
          </p>
        </Container>
      </section>

      <Container>
        <Sections className="gap-20 py-16 md:gap-28 md:py-20">
          <ul className="grid gap-10 md:gap-14" data-reveal>
            {GUIDES.map((guide) => (
              <li key={guide.slug}>
                <Link className="group grid max-w-3xl gap-3" href={`/guides/${guide.slug}`}>
                  <h2 className="font-heading text-h2 group-hover:text-link">{guide.title}</h2>
                  <p className="text-muted-foreground">{guide.summary}</p>
                  <span className="text-link">Read the guide</span>
                </Link>
              </li>
            ))}
          </ul>
        </Sections>
      </Container>
    </Page>
  );
}
