import { createHash, timingSafeEqual } from "node:crypto";

import { neon } from "@neondatabase/serverless";

import { parseWhatsAppOrder } from "@/lib/whatsapp";
import { writeWhatsAppOrderToSheet } from "@/lib/whatsapp/sheets";

export async function GET(request: Request) {
  const {
    CRON_SECRET: secret,
    DATABASE_URL: databaseUrl,
    GOOGLE_SERVICE_ACCOUNT_EMAIL: clientEmail,
    GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: privateKey,
    WHATSAPP_SHEETS_WORKER_ENABLED: enabled,
    WHATSAPP_SHEET_ID: spreadsheetId,
    WHATSAPP_SHEET_TAB: sheetName,
  } = process.env;
  if (
    enabled !== "1" ||
    !secret ||
    !databaseUrl ||
    !clientEmail ||
    !privateKey ||
    !spreadsheetId ||
    !sheetName
  ) {
    return new Response(null, { status: 503 });
  }
  const supplied = request.headers.get("authorization") ?? "";
  const digest = (value: string) => createHash("sha256").update(value).digest();
  if (!timingSafeEqual(digest(supplied), digest(`Bearer ${secret}`))) {
    return new Response(null, { status: 401 });
  }

  const sql = neon(databaseUrl);
  try {
    const messages = await sql`
      SELECT m.message_id, m.sender, m.message_timestamp, m.raw_text
      FROM whatsapp_inbound_messages m
      LEFT JOIN whatsapp_sheet_deliveries d ON d.message_id = m.message_id
      WHERE d.message_id IS NULL OR (d.status = 'pending' AND d.next_attempt_at <= now())
      ORDER BY m.received_at
      LIMIT 25
    `;
    let delivered = 0;
    let failed = 0;
    for (const message of messages) {
      const order = typeof message.raw_text === "string" && parseWhatsAppOrder(message.raw_text);
      const status =
        typeof message.raw_text === "string" && message.raw_text.trim() ? "pending" : "ignored";
      let [delivery] = await sql`
        SELECT sheet_row, status FROM whatsapp_sheet_deliveries WHERE message_id = ${message.message_id}
      `;
      if (!delivery) {
        await sql`
          INSERT INTO whatsapp_sheet_deliveries (message_id, status)
          VALUES (${message.message_id}, ${status}) ON CONFLICT (message_id) DO NOTHING
        `;
        [delivery] = await sql`
          SELECT sheet_row, status FROM whatsapp_sheet_deliveries WHERE message_id = ${message.message_id}
        `;
      }
      if (!delivery || status === "ignored" || delivery.status !== "pending") continue;

      await sql`
        UPDATE whatsapp_sheet_deliveries SET attempts = attempts + 1, next_attempt_at = now() + interval '5 minutes'
        WHERE message_id = ${message.message_id} AND status = 'pending'
      `;
      try {
        await writeWhatsAppOrderToSheet({
          credentials: { clientEmail, privateKey: privateKey.replaceAll("\\n", "\n") },
          message: {
            classification: order && !order.needsReview ? "Order" : "Needs review",
            details: order
              ? JSON.stringify({
                  customerNameCandidate: order.customerNameCandidate,
                  items: order.items,
                  unrecognizedLines: order.unrecognizedLines,
                })
              : "",
            id: message.message_id,
            rawText: message.raw_text,
            sender: message.sender,
            timestamp: message.message_timestamp,
          },
          row: Number(delivery.sheet_row),
          sheetName,
          spreadsheetId,
        });
        await sql`
          UPDATE whatsapp_sheet_deliveries SET status = 'delivered', delivered_at = now(), last_error = NULL
          WHERE message_id = ${message.message_id} AND status = 'pending'
        `;
        delivered++;
      } catch {
        await sql`
          UPDATE whatsapp_sheet_deliveries SET last_error = 'Sheet write failed'
          WHERE message_id = ${message.message_id} AND status = 'pending'
        `;
        failed++;
      }
    }
    return Response.json({ delivered, failed });
  } catch {
    console.error("WhatsApp Sheets worker failed");
    return new Response(null, { status: 503 });
  }
}
