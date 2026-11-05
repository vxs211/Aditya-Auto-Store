// Shared by every item in the bottom bar (home, shop, search, cart, menu). Inactive items are grey outlines; the
// active one turns white, bold and filled, under the light that slides to it.
export const BAR_ITEM_CLASS =
  "relative z-10 flex min-w-14 cursor-pointer flex-col items-center gap-1 px-2 pt-2.5 pb-2 text-[11px] leading-none text-background/55 transition-colors duration-300 hover:text-background/80 [&_svg]:size-5 [&_svg]:transition-[fill] data-[active=true]:font-semibold data-[active=true]:text-background data-[active=true]:[&_svg]:fill-current";
