import type { ComponentProps, ComponentType, ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

export type CardIcon = ComponentType<ComponentProps<"svg">>;

export const PRIMARY_PILL =
  "h-12 rounded-full border border-primary-hover bg-linear-to-b from-primary from-65% to-[#ffae78] px-6 text-base text-white shadow-lg ring-1 ring-white/25 ring-inset hover:shadow-xl";
export const WHITE_PILL =
  "h-12 rounded-full bg-white px-6 text-base text-foreground shadow-card hover:bg-white hover:shadow-card-hover";

export function IconTile({ icon: Icon }: { icon: CardIcon }) {
  return (
    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#fff1e8]">
      <Icon aria-hidden="true" className="size-8 text-primary" />
    </span>
  );
}

export function InfoCard({ body, icon, title }: { body: string; icon: CardIcon; title: string }) {
  return (
    <li className="grid content-start gap-4 rounded-2xl bg-white p-5 shadow-card sm:p-6">
      <IconTile icon={icon} />
      <div className="grid gap-1.5">
        <h3 className="text-xl leading-[1.29] font-medium tracking-normal">{title}</h3>
        <p className="text-body text-pretty text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}

export function PageHero({
  children,
  eyebrow,
  title,
}: {
  children?: ReactNode;
  eyebrow?: string;
  title: string;
}) {
  return (
    <section className="bg-white pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-24 lg:pb-12">
      <Container className="grid justify-items-center gap-3 text-center">
        {eyebrow && (
          <p className="text-label font-medium tracking-[0.2em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
        )}
        <SectionHeading align="center" title={title} />
        {children && (
          <p className="max-w-xl text-body text-pretty text-muted-foreground">{children}</p>
        )}
      </Container>
    </section>
  );
}

// A white shadow card holding one policy section: an icon or number, a heading and its content.
export function PolicyCard({
  children,
  heading,
  icon: Icon,
  number,
}: {
  children: ReactNode;
  heading: string;
  icon?: CardIcon;
  number?: number;
}) {
  return (
    <section
      className="grid gap-4 rounded-2xl bg-white p-5 shadow-card sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-8"
      data-reveal
    >
      <span
        className={`font-sans grid size-14 shrink-0 place-items-center rounded-2xl bg-[#fff1e8] text-2xl font-semibold text-primary tabular-nums`}
      >
        {Icon ? <Icon aria-hidden="true" className="size-8 text-primary" /> : number}
      </span>
      <div className="grid min-w-0 gap-3">
        <h2 className="text-xl sm:text-2xl">{heading}</h2>
        {children}
      </div>
    </section>
  );
}

export function CheckList({ points }: { points: string[] }) {
  return (
    <ul className="grid gap-2.5 text-body text-pretty text-muted-foreground">
      {points.map((point) => (
        <li className="flex gap-3" key={point}>
          <span
            aria-hidden="true"
            className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-white"
          >
            <CheckIcon className="size-3.5" />
          </span>
          {point}
        </li>
      ))}
    </ul>
  );
}

// Closing card: a heading, a line of text and the call-to-action pills.
export function HelpBand({
  body,
  children,
  title,
}: {
  body: string;
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="grid gap-5 rounded-2xl bg-white p-6 shadow-card sm:p-10 md:flex md:items-center md:justify-between">
      <div className="grid gap-2">
        <h2 className="text-2xl">{title}</h2>
        <p className="text-body text-pretty text-muted-foreground">{body}</p>
      </div>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}
