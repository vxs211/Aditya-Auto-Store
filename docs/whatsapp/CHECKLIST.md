# Verification checklist

- [x] Confirm the initial workflow: record incoming WhatsApp orders for staff review.
- [ ] Verify the deployed Apps Script version, access, and data handling; source inspection found order lookup and replies.
- [x] Identify the intended WhatsApp business account and phone number.
- [ ] Verify that number is associated with the Meta app and receives production events.
- [ ] Verify webhook challenge handling and authentic Meta webhook requests.
- [ ] Exercise incoming messages and delivery status events with an authorized test recipient.
- [ ] Verify duplicate and retry behavior, failures, and safe recovery without duplicate orders or messages.
- [ ] Verify opt-in, approved templates where required, and current Meta messaging rules.
- [ ] Verify production credentials, permissions, billing, business verification, and deployment before enabling live traffic.
- [ ] Record actual checks and results in the handover; never include secrets or customer messages.
