import { describe, it, expect } from "vitest";
import { search, normalize, type SearchEntry } from "../src/lib/search";
import { loadAll } from "../src/lib/content";
import { locales } from "../src/lib/locales";
const entries: SearchEntry[] = loadAll().map((a) => ({
  ...a,
  text: a.body,
  draft: true,
}));
describe("on-device multilingual search", () => {
  for (const locale of locales)
    it(`finds native titles in ${locale}`, () => {
      const set = entries.filter((a) => "locale" in a && a.locale === locale);
      expect(search(set, set[0].title)[0].id).toBe(set[0].id);
      expect(search(set, "UPI").length).toBeGreaterThan(0);
    });
  it("keeps combining characters and handles whitespace/case", () => {
    expect(normalize("  UPI!  QR ")).toBe("upi qr");
    expect(normalize("हिन्दी")).toBe("हिन्दी");
    expect(normalize("తెలుగు")).toBe("తెలుగు");
  });
  it("has deterministic relevance, AND matching and empty results", () => {
    const sample = [
      {
        id: "a",
        slug: "a",
        title: "UPI money",
        summary: "safe",
        tags: [],
        text: "",
        draft: true,
      },
      {
        id: "b",
        slug: "b",
        title: "Other",
        summary: "UPI money",
        tags: ["UPI"],
        text: "",
        draft: true,
      },
    ];
    expect(search(sample, "UPI")[0].id).toBe("a");
    expect(search(sample, "UPI nonmatching")).toEqual([]);
    expect(search(sample, "")).toEqual([]);
  });
});
