CREATE TABLE IF NOT EXISTS whatsapp_webhook_deliveries (
  body_hash text PRIMARY KEY,
  payload jsonb NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS whatsapp_inbound_messages (
  message_id text PRIMARY KEY,
  body_hash text NOT NULL REFERENCES whatsapp_webhook_deliveries (body_hash),
  sender text NOT NULL,
  message_timestamp text NOT NULL,
  message jsonb NOT NULL,
  raw_text text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'failed')),
  received_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS whatsapp_sheet_deliveries (
  message_id text PRIMARY KEY REFERENCES whatsapp_inbound_messages (message_id),
  sheet_row bigint GENERATED ALWAYS AS IDENTITY (START WITH 2) UNIQUE,
  status text NOT NULL CHECK (status IN ('pending', 'delivered', 'ignored')),
  attempts integer NOT NULL DEFAULT 0,
  last_error text,
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  delivered_at timestamptz
);
