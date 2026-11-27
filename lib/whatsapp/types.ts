export interface WhatsAppOrderItem {
  product: string;
  quantity: string;
  rawLine: string;
  unit: string;
}

export interface WhatsAppOrder {
  customerNameCandidate: string | null;
  items: WhatsAppOrderItem[];
  needsReview: boolean;
  rawText: string;
  unrecognizedLines: string[];
}
