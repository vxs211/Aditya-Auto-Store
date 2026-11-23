"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "aditya-cookie-preferences";

export function PrivacyNotice() {
  const [visible, setVisible] = useState(false);
  const [customising, setCustomising] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      setVisible(!localStorage.getItem(STORAGE_KEY));
    } catch {
      setVisible(true);
    }
  }, []);

  function save(analyticsChoice: boolean, marketingChoice: boolean) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ analytics: analyticsChoice, marketing: marketingChoice }),
      );
    } catch {
      // The notice appears again when browser storage is unavailable.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <section
      aria-labelledby="privacy-notice-title"
      className="fixed right-4 bottom-[calc(9rem+env(safe-area-inset-bottom,0px))] left-4 z-50 grid max-h-[70dvh] gap-5 overflow-y-auto rounded-xl border border-black/10 bg-white p-6 text-black shadow-2xl sm:left-auto sm:w-[32rem] sm:p-8 lg:bottom-24"
    >
      <h2 id="privacy-notice-title" className="text-3xl font-semibold tracking-tight">
        We value your privacy
      </h2>
      <p className="text-sm leading-relaxed sm:text-base">
        We use necessary cookies to make our site work. You can choose whether to allow analytics
        and marketing cookies.
      </p>
      {customising && (
        <div className="grid gap-3 text-sm">
          <p>Necessary cookies are always enabled.</p>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
            />{" "}
            Analytics cookies
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(event) => setMarketing(event.target.checked)}
            />{" "}
            Marketing cookies
          </label>
        </div>
      )}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button
          className="cursor-pointer rounded-md bg-[#f66101] px-3 py-3 text-sm font-semibold text-white hover:bg-[#d95500]"
          onClick={() => save(true, true)}
          type="button"
        >
          Accept all
        </button>
        <button
          className="cursor-pointer rounded-md border border-black px-3 py-3 text-sm font-semibold hover:bg-black/5"
          onClick={() => save(false, false)}
          type="button"
        >
          Reject all
        </button>
        <button
          className="cursor-pointer rounded-md border border-black px-3 py-3 text-sm font-semibold hover:bg-black/5"
          onClick={() => (customising ? save(analytics, marketing) : setCustomising(true))}
          type="button"
        >
          {customising ? "Save choices" : "Customise"}
        </button>
      </div>
    </section>
  );
}
