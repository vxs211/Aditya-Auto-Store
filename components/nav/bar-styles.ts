// Inactive items are dark outlines on the white pill; the active one sits on the orange capsule that slides to it.
export const BAR_ITEM_CLASS =
  "relative z-10 flex min-w-16 cursor-pointer flex-col items-center gap-1 px-3 pt-2 pb-1.5 text-[11px] font-medium leading-none text-foreground/60 transition-colors duration-300 hover:text-foreground [&_svg]:size-5 data-[active=true]:font-semibold data-[active=true]:text-primary-foreground";

// The search button stands apart from the pill, as a white circle.
export const BAR_SEARCH_CLASS =
  "bar-round relative flex size-[3.8rem] shrink-0 cursor-pointer items-center justify-center bg-background text-foreground shadow-[0_8px_28px_rgba(0,0,0,0.18)] transition-colors hover:bg-muted [&_svg:not([data-accent])]:size-6";
