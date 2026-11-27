# Dependencies

The existing Meta app uses WhatsApp Business Platform and a Google Apps Script callback. The local order parser uses no added packages and is not connected to the callback.

The storefront's installed packages are defined by `package.json` and its lockfile. The Neon database is provisioned and connected to the Vercel project; database access, schema, and a runtime Google Sheets identity are still needed.
