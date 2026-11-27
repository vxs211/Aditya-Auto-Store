import { createSign } from "node:crypto";

interface SheetOrder {
  credentials: { clientEmail: string; privateKey: string };
  message: {
    classification: string;
    details: string;
    id: string;
    rawText: string;
    sender: string;
    timestamp: string;
  };
  row: number;
  sheetName: string;
  spreadsheetId: string;
}

export async function writeWhatsAppOrderToSheet({
  credentials,
  message,
  row,
  sheetName,
  spreadsheetId,
}: SheetOrder): Promise<void> {
  if (!Number.isSafeInteger(row) || row < 2 || !sheetName || !spreadsheetId) {
    throw new Error("Invalid Google Sheets destination");
  }

  const now = Math.floor(Date.now() / 1000);
  const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const assertion = [
    encode({ alg: "RS256", typ: "JWT" }),
    encode({
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
      iss: credentials.clientEmail,
      scope: "https://www.googleapis.com/auth/spreadsheets",
    }),
  ].join(".");
  const signature = createSign("RSA-SHA256")
    .update(assertion)
    .sign(credentials.privateKey, "base64url");
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    body: new URLSearchParams({
      assertion: `${assertion}.${signature}`,
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
  });
  if (!tokenResponse.ok) throw new Error(`Google authorization failed (${tokenResponse.status})`);
  const token: unknown = await tokenResponse.json();
  if (
    !token ||
    typeof token !== "object" ||
    !("access_token" in token) ||
    typeof token.access_token !== "string" ||
    !token.access_token
  ) {
    throw new Error("Google authorization returned no access token");
  }

  const range = `'${sheetName.replaceAll("'", "''")}'!A${row}:F${row}`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}?valueInputOption=RAW`;
  const response = await fetch(url, {
    body: JSON.stringify({
      values: [[message.id, message.sender, message.timestamp, message.rawText, message.details, message.classification]],
    }),
    headers: { Authorization: `Bearer ${token.access_token}`, "Content-Type": "application/json" },
    method: "PUT",
  });
  if (!response.ok) throw new Error(`Google Sheets write failed (${response.status})`);
}
