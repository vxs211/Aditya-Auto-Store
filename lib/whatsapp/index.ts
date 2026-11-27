import type { WhatsAppOrder, WhatsAppOrderItem } from "./types";

export function parseWhatsAppOrder(rawText: string): WhatsAppOrder | null {
  const lines = rawText.split(/\r\n|\n|\r/).filter((line) => line.trim());
  if (!lines.length || !/^\s*(?:\*ORDER\*|ORDER)\s*$/i.test(lines[0]!)) {
    return null;
  }

  const items: WhatsAppOrderItem[] = [];
  const unrecognizedLines: string[] = [];
  let customerNameCandidate: string | null = null;

  for (const [index, line] of lines.slice(1).entries()) {
    const match = /^\s*(\d+)\s+(pcs?|sets?)\s*:-\s*(\S(?:.*\S)?)\s*$/i.exec(line);
    if (match && /[1-9]/.test(match[1]!)) {
      items.push({ product: match[3]!, quantity: match[1]!, rawLine: line, unit: match[2]! });
    } else {
      unrecognizedLines.push(line);
      if (index === lines.length - 2 && items.length && !/^\s*\d/.test(line)) {
        customerNameCandidate = line.trim();
      }
    }
  }

  return {
    customerNameCandidate,
    items,
    needsReview: !items.length || unrecognizedLines.length > 0,
    rawText,
    unrecognizedLines,
  };
}
