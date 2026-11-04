"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// There is no public order lookup, so the number is sent to us on WhatsApp and we reply with the status.
export function TrackOrderForm({ siteName, whatsapp }: { siteName: string; whatsapp: string }) {
  const [orderNumber, setOrderNumber] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const number = orderNumber.replace(/[^\w-]/g, "");
    if (!number) return;
    const message = `Hello ${siteName}, I would like an update on my order #${number}.`;
    window.open(
      `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <form className="grid max-w-md gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="order-number">Order number</Label>
        <Input
          autoComplete="off"
          className="h-12"
          id="order-number"
          inputMode="numeric"
          onChange={(event) => setOrderNumber(event.target.value)}
          placeholder="For example 1001"
          required
          value={orderNumber}
        />
      </div>
      <Button className="w-fit" type="submit">
        Ask us on WhatsApp
      </Button>
    </form>
  );
}
