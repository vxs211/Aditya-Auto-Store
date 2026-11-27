# Handover

Last checked: 2026-11-27.

- The intended number is +91 95583 94079 in the Aditya Auto Accessories WhatsApp Business account. Its association with Factory Order Bot and production message delivery remain unverified.
- Factory Order Bot has a `messages` webhook pointing to an existing Google Apps Script. The script handles order lookup commands and sends replies; it does not record new orders. Preserve the callback until a replacement has been verified.
- [Aditya Auto Orders](https://docs.google.com/spreadsheets/d/1gmRMBK19O4WX3gMob-85J4KjMtp4gIMS6xkdR8n3Gmo/edit) is the intended destination for WhatsApp and Shopify orders. Neither source has been verified writing to it.
- Shopify Flow has an inactive order-created draft; its mappings and line-item handling are incomplete. Do not activate it as-is.
- `lib/whatsapp/index.ts` parses the supplied `ORDER` format locally, preserving the original message and flagging ambiguous lines. It is not connected to the live webhook.
- The free Neon database `aditya-whatsapp-orders` is available and connected to the `aditya-auto-store` Vercel project. Its tables, application integration, and runtime connectivity have not yet been verified.
- Next: establish database access and runtime Google Sheets credentials, implement authenticated and retryable intake, test against the real number, then change the live webhook only after preserving the existing lookup behavior.
- Never put tokens, secrets, or customer messages into these documents.
