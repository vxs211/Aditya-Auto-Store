import { Link } from "@/components/ui/link";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

// Plain text with [label](/path) links, so posts can point at the exact part or page they talk about.
export function InlineText({ text }: { text: string }) {
  const parts: (string | { href: string; label: string })[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    parts.push(text.slice(last, match.index));
    parts.push({ href: match[2] ?? "", label: match[1] ?? "" });
    last = (match.index ?? 0) + match[0].length;
  }
  parts.push(text.slice(last));
  return (
    <>
      {parts.map((part, index) =>
        typeof part === "string" ? (
          part
        ) : (
          <Link
            className="text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-link"
            href={part.href}
            key={`${part.href}-${index}`}
          >
            {part.label}
          </Link>
        ),
      )}
    </>
  );
}
