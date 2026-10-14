"use client";
import { useState } from "react";
import Link from "next/link";
import { search, type SearchEntry } from "@/lib/search";
import type { Locale } from "@/lib/locales";
import type { Copy } from "@/lib/copy";
export function SearchBox({ locale, c }: { locale: Locale; c: Copy }) {
  const [query, setQuery] = useState(""),
    [entries, setEntries] = useState<SearchEntry[] | null>(null),
    [loading, setLoading] = useState(false),
    [failed, setFailed] = useState(false);
  async function load() {
    if (entries || loading) return;
    setLoading(true);
    setFailed(false);
    try {
      const response = await fetch(`/search/${locale}.json`);
      if (!response.ok) throw new Error("index");
      const data: unknown = await response.json();
      if (
        !Array.isArray(data) ||
        !data.every(
          (e) =>
            typeof e.title === "string" &&
            typeof e.slug === "string" &&
            typeof e.summary === "string" &&
            typeof e.text === "string" &&
            Array.isArray(e.tags),
        )
      )
        throw new Error("index");
      setEntries(data as SearchEntry[]);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }
  const results = search(entries ?? [], query);
  return (
    <div className="search-box">
      <div className="search-input">
        <span aria-hidden="true">⌕</span>
        <label className="sr-only" htmlFor="help-search">
          {c.search}
        </label>
        <input
          id="help-search"
          type="search"
          maxLength={160}
          autoComplete="off"
          placeholder={c.searchHint}
          value={query}
          onFocus={() => void load()}
          onChange={(e) => {
            setQuery(e.target.value);
            void load();
          }}
        />
      </div>
      <div aria-live="polite" aria-atomic="true" className="search-status">
        {loading
          ? c.loading
          : failed
            ? c.searchError
            : query.trim()
              ? `${c.results}: ${results.length}`
              : ""}
      </div>
      {failed && (
        <button className="button secondary" onClick={() => void load()}>
          {c.retry}
        </button>
      )}
      {query.trim() && !loading && !failed && entries && (
        <div className="search-results">
          {results.length ? (
            results.map((a) => (
              <Link
                prefetch={false}
                className="result"
                key={a.id}
                href={`/${locale}/articles/${a.slug}`}
              >
                <strong>
                  {a.title}
                  <span aria-hidden="true"> ↗</span>
                </strong>
                <p>{a.summary}</p>
                {a.draft && <small>{c.review}</small>}
              </Link>
            ))
          ) : (
            <p>
              {c.empty} <Link href={`/${locale}/topics`}>{c.topics}</Link> ·{" "}
              <Link href={`/${locale}/contact`}>{c.contact}</Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
