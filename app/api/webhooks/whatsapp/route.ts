import { createHash } from "node:crypto";

import { neon } from "@neondatabase/serverless";
import { z } from "zod";

import { verifyWhatsAppSignature } from "@/lib/whatsapp/server";

const messageSchema = z.looseObject({
  from: z.string().min(1),
  id: z.string().min(1),
  text: z.looseObject({ body: z.string() }).optional(),
  timestamp: z.string().min(1),
});
const payloadSchema = z.looseObject({
  entry: z.array(
    z.looseObject({
      changes: z.array(
        z.looseObject({
          value: z.looseObject({ messages: z.array(messageSchema).optional() }),
        }),
      ),
    }),
  ),
  object: z.literal("whatsapp_business_account"),
});

const MAX_BODY_BYTES = 1024 * 1024;

async function readBody(request: Request): Promise<Buffer | null> {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength && Number(declaredLength) > MAX_BODY_BYTES) return null;
  if (!request.body) return Buffer.alloc(0);

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks, size);
}

export async function GET(request: Request) {
  const token = process.env.WHATSAPP_VERIFY_TOKEN;
  if (process.env.WHATSAPP_INTAKE_ENABLED !== "1" || !token) {
    return new Response(null, { status: 503 });
  }
  const params = new URL(request.url).searchParams;
  const challenge = params.get("hub.challenge");
  if (
    params.get("hub.mode") !== "subscribe" ||
    params.get("hub.verify_token") !== token ||
    !challenge
  ) {
    return new Response(null, { status: 403 });
  }
  return new Response(challenge);
}

export async function POST(request: Request) {
  const secret = process.env.WHATSAPP_APP_SECRET;
  const databaseUrl = process.env.DATABASE_URL;
  if (process.env.WHATSAPP_INTAKE_ENABLED !== "1" || !secret || !databaseUrl) {
    return new Response(null, { status: 503 });
  }

  const body = await readBody(request);
  if (!body) return new Response(null, { status: 413 });
  if (!verifyWhatsAppSignature(body, request.headers.get("x-hub-signature-256"), secret)) {
    return new Response(null, { status: 401 });
  }

  let payload: z.infer<typeof payloadSchema>;
  try {
    const result = payloadSchema.safeParse(JSON.parse(body.toString("utf8")));
    if (!result.success) return new Response(null, { status: 400 });
    payload = result.data;
  } catch {
    return new Response(null, { status: 400 });
  }

  const messages = payload.entry.flatMap((entry) =>
    entry.changes.flatMap((change) => change.value.messages ?? []),
  );
  const bodyHash = createHash("sha256").update(body).digest("hex");
  const sql = neon(databaseUrl);
  try {
    await sql.transaction([
      sql`INSERT INTO whatsapp_webhook_deliveries (body_hash, payload)
          VALUES (${bodyHash}, ${JSON.stringify(payload)}::jsonb) ON CONFLICT DO NOTHING`,
      ...messages.map(
        (message) => sql`
        INSERT INTO whatsapp_inbound_messages (message_id, body_hash, sender, message_timestamp, message, raw_text)
        VALUES (${message.id}, ${bodyHash}, ${message.from}, ${message.timestamp}, ${JSON.stringify(message)}::jsonb, ${message.text?.body ?? null})
        ON CONFLICT DO NOTHING
      `,
      ),
    ]);
  } catch {
    console.error("WhatsApp webhook persistence failed");
    return new Response(null, { status: 503 });
  }

  return new Response(null, { status: 200 });
}
