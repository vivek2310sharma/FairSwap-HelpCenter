"use client";
import { usePathname } from "next/navigation";
import { copy } from "@/lib/copy";
import { isLocale } from "@/lib/locales";
export default function ErrorPage({ reset }: { reset: () => void }) {
  const part = usePathname().split("/")[1];
  const c = copy(isLocale(part) ? part : "en");
  return (
    <section className="container page narrow">
      <h1>{c.searchError}</h1>
      <button className="button" onClick={reset}>
        {c.retry}
      </button>
    </section>
  );
}
