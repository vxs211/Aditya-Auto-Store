import { formatMoney } from "@shopify/hydrogen";

import { shopConfig } from "@/lib/config";
import type { Money } from "@/lib/money/types";

export function formatCurrencySymbol(
  currencyCode: string,
  locale: string = shopConfig.localization.locale,
): string {
  return formatMoney({ amount: "0", currencyCode }, { locale }).currencySymbol;
}

export function formatPrice(money: Money, locale: string = shopConfig.localization.locale): string {
  const amount = Number(money.amount);
  return new Intl.NumberFormat(locale, {
    currency: money.currencyCode,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : undefined,
    style: "currency",
  }).format(amount);
}

// Shopify minor units follow each currency's ISO 4217 exponent, which Intl reports.
function currencyDigits(currencyCode: string): number {
  return (
    new Intl.NumberFormat("en", { currency: currencyCode, style: "currency" }).resolvedOptions()
      .maximumFractionDigits ?? 2
  );
}

export function fromMinorUnits(amount: number, currencyCode: string): Money {
  const digits = currencyDigits(currencyCode);
  return { amount: (amount / 10 ** digits).toFixed(digits), currencyCode };
}

export function toMinorUnits(amount: number, currencyCode: string): number {
  return Math.round(amount * 10 ** currencyDigits(currencyCode));
}
