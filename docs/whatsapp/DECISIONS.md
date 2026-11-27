# Decisions

- Preserve the existing Factory Order Bot callback and lookup behavior until a replacement is verified.
- Record incoming WhatsApp orders without a guided ordering conversation. Keep the original message and flag uncertain parsing rather than inventing details.
- Use Aditya Auto Orders as the intended record for both WhatsApp and Shopify orders. Shopify remains authoritative for its orders.
- Use durable message-ID deduplication and retryable sheet delivery before accepting live order traffic. Storage and runtime sheet credentials are not yet provisioned.
- Keep the Shopify Flow draft inactive until its mappings and line-item handling are verified.
