import { describe, it, expect } from "vitest";
import {
  articleSchema,
  loadAll,
  validateCollection,
  isPublished,
} from "../src/lib/content";
import { copy } from "../src/lib/copy";
import { topics } from "../src/lib/topics";
import { articleIds, locales, categories } from "../src/lib/locales";
const all = loadAll();
describe("editorial contract", () => {
  it("validates 100 original locale-matched articles and all related links", () => {
    expect(all).toHaveLength(100);
    expect(() => validateCollection(all)).not.toThrow();
  });
  for (const locale of locales) {
    it(`${locale}: has translated UI, taxonomy and all ten drafts`, () => {
      expect(Object.values(copy(locale)).every((v) => v.length > 0)).toBe(true);
      expect(topics(locale).map((t) => t.slug)).toEqual([...categories]);
      const set = all.filter((a) => a.locale === locale);
      expect(set.map((a) => a.id).sort()).toEqual([...articleIds].sort());
      expect(
        set.every(
          (a) => a.editorialStatus === "draft" && a.reviewedAt === null,
        ),
      ).toBe(true);
      if (locale !== "en") {
        expect(
          set.every(
            (a) =>
              a.body !==
              all.find((e) => e.locale === "en" && e.id === a.id)?.body,
          ),
        ).toBe(true);
      }
    });
  }
  it("rejects invalid locale, category, date, status, id and metadata", () => {
    const base = articleSchema.parse(
      Object.fromEntries(
        Object.entries(all[0]).filter(([key]) => key !== "body"),
      ),
    );
    for (const invalid of [
      { locale: "ur" },
      { category: "unknown" },
      { reviewedAt: "yesterday" },
      { editorialStatus: "approved" },
      { id: "no-id" },
      { sourceRefs: ["javascript:alert(1)"] },
      { editorialStatus: "reviewed", reviewedAt: null },
      { reviewedAt: "2026-10-14" },
    ])
      expect(articleSchema.safeParse({ ...base, ...invalid }).success).toBe(
        false,
      );
  });
  it("accepts valid metadata without the body", () => {
    const { body, ...metadata } = all[0];
    expect(body.length).toBeGreaterThan(200);
    expect(articleSchema.safeParse(metadata).success).toBe(true);
  });
  it("rejects duplicate slugs and orphan/self relations", () => {
    expect(() => validateCollection([...all, all[0]])).toThrow();
    expect(() =>
      validateCollection(
        all.map((a, i) => (i === 0 ? { ...a, relatedIds: [a.id] } : a)),
      ),
    ).toThrow();
  });
  it("never publishes a partially reviewed collection", () => {
    const changed = all.map((a) =>
      a.locale === "en"
        ? {
            ...a,
            editorialStatus: "reviewed" as const,
            reviewedAt: "2026-10-14",
          }
        : a,
    );
    expect(changed.every((a) => !isPublished(a, changed))).toBe(true);
  });
  it("requires approval of every translation before an article set is public", () => {
    const approved = all.map((a) =>
      a.id === "create-account"
        ? {
            ...a,
            editorialStatus: "reviewed" as const,
            reviewedAt: "2026-10-14",
          }
        : a,
    );
    expect(approved.filter((a) => isPublished(a, approved))).toHaveLength(10);
    expect(all.filter((a) => isPublished(a, all))).toHaveLength(0);
  });
});
