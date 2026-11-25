"use client";

import { useEffect, useRef, useState } from "react";

import { MessageCircleIcon as MessageCircle } from "@/components/ui/icon";
import { readStoredChat } from "@/lib/agent/chat/client";

import { AgentPanel } from "./client";

export function AgentButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // The panel is most of the agent's JavaScript, so it loads on intent; a turn interrupted by navigation mounts it at idle so its cart writes reconcile.
  useEffect(() => {
    if (!readStoredChat().turnActive) return;
    const idle =
      window.requestIdleCallback ?? ((callback: () => void) => setTimeout(callback, 200));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const handle = idle(() => setMounted(true));
    return () => cancel(handle as number);
  }, []);
  const mount = () => setMounted(true);
  return (
    <>
      <button
        ref={triggerRef}
        aria-expanded={open}
        className="bar-round flex size-14 cursor-pointer items-center justify-center bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => {
          setMounted(true);
          setOpen((previous) => !previous);
        }}
        onFocus={mount}
        onPointerEnter={mount}
        onTouchStart={mount}
        type="button"
      >
        <MessageCircle className="size-6" />
        <span className="sr-only">Chat with shopping assistant</span>
      </button>
      {mounted && <AgentPanel onOpenChange={setOpen} open={open} triggerRef={triggerRef} />}
    </>
  );
}
