"use client";

import type { KeyboardEvent } from "react";

import { CornerDownLeftIcon, SquareIcon } from "@/components/ui/icon";
import { InputGroup, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group";

type AgentStatus = "busy" | "idle" | "resuming";

interface AgentComposerProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onStop: () => void;
  onSubmit: (text: string) => void;
  placeholder?: string;
  status: AgentStatus;
  value: string;
}

export function AgentComposer({
  disabled = false,
  onChange,
  onStop,
  onSubmit,
  placeholder,
  status,
  value,
}: AgentComposerProps) {
  const isBusy = status === "busy";
  const submit = () => {
    if (disabled || status === "resuming") return;
    if (isBusy) {
      onStop();
      return;
    }
    const text = value.trim();
    if (!text) return;
    onSubmit(text);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter" || e.shiftKey || e.nativeEvent.isComposing) return;
    e.preventDefault();
    submit();
  };
  const icon = isBusy ? (
    <SquareIcon className="size-4" />
  ) : (
    <CornerDownLeftIcon className="size-4" />
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))]"
    >
      <InputGroup className="h-auto flex-row items-end rounded-2xl border-0 bg-white shadow-card has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-primary/40">
        <InputGroupTextarea
          aria-label="Message Shop Agent"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="field-sizing-content max-h-48 min-h-11 py-2.5"
        />
        <InputGroupButton
          type="submit"
          size="icon-sm"
          variant="default"
          aria-label={isBusy ? "Stop" : "Send"}
          disabled={disabled || status === "resuming" || (!value.trim() && !isBusy)}
          className="mr-1.5 mb-1.5 rounded-full"
        >
          {icon}
        </InputGroupButton>
      </InputGroup>
    </form>
  );
}
