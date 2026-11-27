import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyWhatsAppSignature(
  body: Uint8Array,
  signature: string | null,
  secret: string,
): boolean {
  if (!secret || !signature || !/^sha256=[a-f0-9]{64}$/i.test(signature)) return false;

  const expected = createHmac("sha256", secret).update(body).digest();
  const received = Buffer.from(signature.slice(7), "hex");
  return timingSafeEqual(expected, received);
}
