# Environment and secrets

No bot environment variables have been established in this repository. The existing Google Apps Script configuration is separate from the storefront; deployed credentials have not been verified.

A WhatsApp integration may need a Meta access token, webhook verification token, and app secret for request verification, as well as a phone number ID. Confirm the actual implementation and Meta requirements before defining names or values. Store secrets in the deployment's secret manager, never in documentation, source control, or chat. If the bot is implemented in this repository, document each actual `process.env` read in `.env.example` and `turbo.json` as required by `AGENTS.md`.
