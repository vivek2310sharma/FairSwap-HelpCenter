"use client";
import { usePathname } from "next/navigation";
import { labels, locales, type Locale } from "@/lib/locales";
export function LanguageSelector({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  return (
    <label className="language-control">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">◎</span>
      <select
        aria-label={label}
        value={locale}
        onChange={(e) => {
          const parts = pathname.split("/");
          parts[1] = e.target.value;
          window.location.assign(parts.join("/"));
        }}
      >
        {locales.map((l) => (
          <option key={l} value={l} lang={l}>
            {labels[l]}
          </option>
        ))}
      </select>
    </label>
  );
}
