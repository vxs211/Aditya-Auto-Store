"use client";

import { activeTurn, idle, openInteractions } from "eve/events";
import { useEveAgent } from "eve/react";
import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

import { TrashIcon as Trash2Icon, XIcon } from "@/components/ui/icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { readStoredChat, writeStoredChat } from "@/lib/agent/chat/client";

import { AgentCartBridge } from "./cart-bridge";
import { ChatMessage } from "./chat-message";
import { AgentComposer } from "./composer";
import { AgentThinking } from "./thinking";

const CANCEL_TIMEOUT_MS = 10_000;

function prepareAgentSession() {
  return fetch("/api/agent/session", {
    credentials: "same-origin",
    method: "POST",
    redirect: "error",
  }).then((response) => {
    if (!response.ok) throw new Error("Could not prepare the assistant. Please try again.");
  });
}

export interface AgentPanelProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  triggerRef: RefObject<HTMLElement | null>;
}

export function AgentPanel({ onOpenChange, open, triggerRef }: AgentPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [stored] = useState(readStoredChat);
  // Idle stored sessions replay on first open; an interrupted turn resumes at once so its cart writes reconcile.
  const [resumePending, setResumePending] = useState(Boolean(stored.session && !stored.turnActive));
  const [input, setInput] = useState(stored.input);
  const snapshot = useRef(stored);
  const [clearing, setClearing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const sessionPrep = useRef<Promise<void> | null>(null);
  // The cart cookie outlives each turn, so prepare it once and keep sends off the network.
  const prepareSession = useCallback(() => {
    if (sessionPrep.current) return sessionPrep.current;
    const promise = prepareAgentSession();
    sessionPrep.current = promise;
    promise.catch(() => {
      if (sessionPrep.current === promise) sessionPrep.current = null;
    });
    return promise;
  }, []);
  const agent = useEveAgent({
    // Follow only while work runs, so an idle panel holds no open stream.
    followWhile: (view) => !idle(view),
    initialSession: stored.session,
    onSessionChange(session) {
      snapshot.current.session = session ? { ...session, streamIndex: 0 } : undefined;
      writeStoredChat(snapshot.current);
    },
    async prepareSend(turn) {
      await prepareSession();
      const clientContext = { pathname: location.pathname, search: location.search };
      return turn.answers
        ? { ...turn, clientContext }
        : { ...turn, clientContext, turnPolicy: "queue" };
    },
    resume: Boolean(stored.session && stored.turnActive),
  });
  const { messages, status, view } = agent;
  // A budget prompt holds its turn open; Shop Agent never offers to continue past the limit.
  const hasReachedLimit = openInteractions(view, { kind: "budget" }).length > 0;
  const restoring = resumePending || status === "resuming";
  const busy = !hasReachedLimit && status === "busy";
  const awaitingReply = busy && messages.at(-1)?.role === "user";
  useEffect(() => {
    if (open) void prepareSession().catch(() => {});
  }, [open, prepareSession]);
  useEffect(() => {
    snapshot.current.turnActive = busy;
    writeStoredChat(snapshot.current);
  }, [busy]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true);
  const userScrollRef = useRef(false);
  const pointerDownRef = useRef(false);
  const scrollToBottom = useCallback(() => {
    const element = scrollRef.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, []);
  const markUserScroll = useCallback(() => {
    userScrollRef.current = true;
  }, []);
  // Programmatic scrolls also fire scroll events; only user input may unpin from the bottom.
  const handleScroll = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;
    const atBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 48;
    if (atBottom) pinnedRef.current = true;
    else if (userScrollRef.current || pointerDownRef.current) pinnedRef.current = false;
    userScrollRef.current = false;
  }, []);
  // The sheet renders its content after the panel mounts, so observe the node when it attaches.
  const observeContent = useCallback(
    (content: HTMLDivElement | null) => {
      const scroller = content?.parentElement;
      if (!content || !scroller) return;
      const observer = new ResizeObserver(() => {
        if (pinnedRef.current) scrollToBottom();
      });
      observer.observe(content);
      observer.observe(scroller);
      return () => observer.disconnect();
    },
    [scrollToBottom],
  );
  useEffect(() => {
    if (open) scrollToBottom();
  }, [open, scrollToBottom]);
  const [restoreDelayElapsed, setRestoreDelayElapsed] = useState(false);
  useEffect(() => {
    if (status !== "resuming") return;
    const timer = setTimeout(() => setRestoreDelayElapsed(true), 400);
    return () => clearTimeout(timer);
  }, [status]);
  const showRestoring = status === "resuming" && restoreDelayElapsed;
  useEffect(() => {
    snapshot.current.input = input;
    const timer = setTimeout(() => writeStoredChat(snapshot.current), 400);
    return () => clearTimeout(timer);
  }, [input]);
  useEffect(() => {
    const flush = () => writeStoredChat(snapshot.current);
    window.addEventListener("pagehide", flush);
    return () => {
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, []);
  const handleStop = () => {
    setNotice(null);
    void agent.cancel().catch(() => {
      setNotice("Could not stop the response. Please try again.");
    });
  };
  const handleSend = (text: string) => {
    if (busy || restoring || clearing || hasReachedLimit) return;
    pinnedRef.current = true;
    snapshot.current.turnActive = true;
    writeStoredChat(snapshot.current);
    setNotice(null);
    void agent.send(text).catch(() => {
      setNotice("Could not send your message. Try again, or clear an expired conversation.");
    });
    setInput("");
  };
  const handleClear = async () => {
    if (clearing) return;
    setClearing(true);
    setNotice(null);
    const interrupted = busy || activeTurn(view) !== undefined;
    try {
      if (interrupted) {
        const delivery = await agent.cancel();
        await delivery.result({ signal: AbortSignal.timeout(CANCEL_TIMEOUT_MS) });
      }
      agent.newSession();
      setResumePending(false);
      setInput("");
      snapshot.current = { input: "" };
      writeStoredChat(snapshot.current);
      if (interrupted)
        setNotice("Started a new chat. Check your cart before repeating an interrupted change.");
    } catch {
      setNotice(
        "Could not confirm the response stopped. Your conversation was kept. Try Stop or Clear again.",
      );
    } finally {
      setClearing(false);
    }
  };
  return (
    <Sheet
      onOpenChange={(next) => onOpenChange(next)}
      onOpenChangeComplete={(opened) => {
        if (!opened) return;
        scrollToBottom();
        if (!resumePending) return;
        setResumePending(false);
        void agent.resume().catch(() => {});
      }}
      open={open}
    >
      <SheetContent
        ref={panelRef}
        className="inset-y-auto right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] h-[min(36rem,calc(100dvh-2rem-env(safe-area-inset-bottom,0px)))] w-[calc(100%-2rem)] max-w-md gap-0 overflow-hidden rounded-3xl border p-0"
        closeButton={false}
        finalFocus={triggerRef}
        initialFocus={() => panelRef.current?.querySelector("textarea") ?? true}
        keepMounted
        overlay={false}
        side="right"
      >
        <div className="flex min-h-16 shrink-0 items-center justify-between gap-3 border-b px-5">
          <div className="grid gap-1 py-3">
            <SheetTitle className="font-sans text-lg font-semibold">
              Aditya shopping assistant
            </SheetTitle>
            <p className="text-xs text-muted-foreground">Products, fitment and store questions</p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              aria-label="Clear chat"
              className="flex cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
              disabled={clearing || (!messages.length && !input.trim() && !agent.session && !busy)}
              onClick={handleClear}
              type="button"
            >
              <Trash2Icon className="size-5" />
            </button>
            <SheetClose
              aria-label="Close Shop Agent"
              className="flex cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <XIcon className="size-5" />
            </SheetClose>
          </div>
        </div>
        <SheetDescription className="sr-only">
          Find products, ask store questions, and manage your cart.
        </SheetDescription>
        <div
          ref={scrollRef}
          data-slot="agent-messages"
          onKeyDown={markUserScroll}
          onPointerDown={() => {
            pointerDownRef.current = true;
          }}
          onPointerUp={() => {
            pointerDownRef.current = false;
          }}
          onScroll={handleScroll}
          onTouchMove={markUserScroll}
          onWheel={markUserScroll}
          className="min-h-0 flex-auto overflow-x-hidden overflow-y-auto overscroll-contain"
        >
          <div
            ref={observeContent}
            aria-busy={busy}
            aria-label="Conversation"
            className="flex min-h-full flex-col justify-end gap-6 px-2.5 py-5 [&>*]:shrink-0"
            role="log"
          >
            {messages.length === 0
              ? restoring
                ? showRestoring && (
                    <p className="text-muted-foreground text-sm">Restoring your conversation…</p>
                  )
                : !awaitingReply && (
                    <div className="grid gap-4 rounded-2xl bg-muted p-5">
                      <div className="grid gap-1">
                        <p className="font-semibold">What are you looking for?</p>
                        <p className="text-sm text-muted-foreground">
                          Tell us your scooter model and what you need, or choose a question.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          {
                            label: "Find accessories",
                            message: "Help me find accessories for my scooter.",
                          },
                          {
                            label: "Check fitment",
                            message: "Help me check whether an accessory fits my scooter.",
                          },
                          {
                            label: "Shipping & returns",
                            message: "What are the shipping and return policies?",
                          },
                        ].map(({ label, message }) => (
                          <button
                            key={label}
                            type="button"
                            disabled={clearing || hasReachedLimit}
                            onClick={() => handleSend(message)}
                            className="cursor-pointer rounded-full border border-border bg-background px-3 py-2 text-sm transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
              : messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    isLatest={index === messages.length - 1}
                    isStreaming={!hasReachedLimit && message.metadata?.status === "streaming"}
                    message={message}
                  />
                ))}
            {awaitingReply && <AgentThinking active />}
          </div>
        </div>
        {(clearing || (showRestoring && messages.length > 0)) && (
          <p role="status" className="px-2.5 py-2 text-muted-foreground text-xs">
            {clearing
              ? "Waiting for the response to stop…"
              : "Restoring your conversation… Clear chat to start fresh."}
          </p>
        )}
        {hasReachedLimit && (
          <p role="alert" className="px-2.5 py-2 text-muted-foreground text-xs">
            This conversation has reached its limit. Clear chat to start a new conversation.
          </p>
        )}
        <AgentCartBridge messages={messages} restoring={restoring} />
        <AgentComposer
          disabled={!busy && (clearing || hasReachedLimit)}
          onChange={(value) => {
            setInput(value);
            void prepareSession().catch(() => {});
          }}
          onStop={handleStop}
          onSubmit={handleSend}
          placeholder="Ask about products or your scooter…"
          status={restoring ? "resuming" : busy ? "busy" : "idle"}
          value={input}
        />
        {(agent.error || notice) && (
          <p role="alert" className="px-2.5 pb-2 text-red-500 text-xs">
            {notice ?? "The assistant is unavailable. Try again, or clear an expired conversation."}
          </p>
        )}
      </SheetContent>
    </Sheet>
  );
}
