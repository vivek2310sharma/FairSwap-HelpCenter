"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { isLocale } from "@/lib/locales";
import { copy } from "@/lib/copy";
export function LocalNotFound() {
  const part = usePathname().split("/")[1];
  const locale = isLocale(part) ? part : "en";
  const c = copy(locale);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `${c.notFound} · FairSwap`;
  }, [locale, c.notFound]);
  return (
    <div className="container page narrow">
      <span className="eyebrow">404</span>
      <h1>{c.notFound}</h1>
      <p>{c.notFoundText}</p>
      <Link className="button" href={`/${locale}`}>
        {c.back}
      </Link>
    </div>
  );
}
