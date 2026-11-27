"use client";

import { useEffect, useState } from "react";

// Types each phrase out letter by letter, holds it, deletes it, then moves to the next.
// Returns the first phrase untouched when `enabled` is false or the user prefers reduced motion.
export function useTypewriter(phrases: readonly string[], enabled = true) {
  const [text, setText] = useState(phrases[0] ?? "");

  useEffect(() => {
    if (!enabled || phrases.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let phrase = 0;
    let length = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = phrases[phrase];
      length += deleting ? -1 : 1;
      setText(current.slice(0, length));
      let delay = deleting ? 28 : 60;
      if (!deleting && length === current.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && length === 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [enabled, phrases]);

  return enabled ? text || " " : (phrases[0] ?? "");
}
