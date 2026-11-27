# Bugs and open issues

- **Open:** The intended production number's association with the Meta app and inbound delivery are unverified.
- **Open:** The existing webhook performs order lookup, not new order intake, and logs sender and message text. Review retention when replacing or extending it.
- **Open:** The new order sheet is not connected to WhatsApp or Shopify. The Shopify Flow draft has incomplete mappings and line-item handling.
- **Open:** Durable storage, runtime Google Sheets credentials, authenticated intake, retries, and reconciliation are not in place.
- **Open:** End-to-end delivery, duplicates, failures, recovery, and preservation of existing lookup behavior have not been tested.
- **Open:** The storefront Shopify webhook handler does not process order events; configuring order events against it would not write a sheet.
