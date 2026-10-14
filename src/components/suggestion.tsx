"use client";
import { useEffect, useState } from "react";
import { isLocale, type Locale } from "@/lib/locales";
export function Suggestion() {
  const [hint, setHint] = useState<{ locale: Locale; label: string } | null>(
    null,
  );
  useEffect(() => {
    const controller = new AbortController();
    try {
      if (sessionStorage.getItem("fairswap-hint-seen")) return;
    } catch {
      /* Optional session storage can be unavailable. */
    }
    function markSeen() {
      try {
        sessionStorage.setItem("fairswap-hint-seen", "1");
      } catch {
        /* Optional session flag. */
      }
    }
    fetch("/api/language-suggestion", {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((value: unknown) => {
        if (controller.signal.aborted) return;
        markSeen();
        if (
          value &&
          typeof value === "object" &&
          "locale" in value &&
          typeof value.locale === "string" &&
          isLocale(value.locale) &&
          value.locale !== "en" &&
          "label" in value &&
          typeof value.label === "string"
        )
          setHint({ locale: value.locale, label: value.label });
      })
      .catch(() => {
        if (!controller.signal.aborted) markSeen();
      });
    return () => controller.abort();
  }, []);
  return hint ? (
    <aside className="suggestion">
      <span>
        <span lang={hint.locale}>{hint.label}</span> is available. Would you
        like to switch?
      </span>
      <a href={`/${hint.locale}`}>
        Switch to <span lang={hint.locale}>{hint.label}</span>
      </a>
      <button
        aria-label="Dismiss language suggestion"
        onClick={() => setHint(null)}
      >
        ×
      </button>
    </aside>
  ) : null;
}
