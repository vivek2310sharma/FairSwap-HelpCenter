import { describe, expect, it } from "vitest";
import {
  articleSchema,
  isPublished,
  loadAll,
  validateCollection,
} from "../src/lib/content";

const all = loadAll();
describe("English and Hindi Ratings technical and editorial checks", () => {
  it("validates metadata, internal links and owner-approved review status", () => {
    expect(() => validateCollection(all)).not.toThrow();
    for (const a of all.filter(
      (a) =>
        ["en", "hi"].includes(a.locale) &&
        ["how-ratings-work", "report-a-review"].includes(a.id),
    )) {
      expect(articleSchema.safeParse(a).success).toBe(false); // body is intentionally not metadata
      const { body, ...metadata } = a;
      expect(articleSchema.safeParse(metadata).success).toBe(true);
      expect(metadata.editorialStatus).toBe("reviewed");
      expect(metadata.reviewedAt).toBe("2026-10-28");
      expect(isPublished(a)).toBe(true);
      expect(body).toContain(a.locale === "en" ? "code points" : "कोड पॉइंट");
      expect(body).toContain("500");
      expect(body).not.toMatch(/[\u202a-\u202e\u2066-\u2069\ufffd]/u);
    }
  });
  it("distinguishes deferred buyer selection from terminal none and fixes the original clock", () => {
    const english = all.find(
      (a) => a.locale === "en" && a.id === "how-ratings-work",
    )!.body;
    expect(english).toContain("“Not now”");
    expect(english).toContain("“None”");
    expect(english).toContain("14 days start when the listing is marked sold");
    const hindi = all.find(
      (a) => a.locale === "hi" && a.id === "how-ratings-work",
    )!.body;
    expect(hindi).toContain("“अभी नहीं”");
    expect(hindi).toContain("“कोई नहीं”");
    expect(hindi).toContain("खरीदार चुनने से नहीं");
  });
  it("rejects fabricated review dates on drafts", () => {
    const a = all.find((a) => a.locale === "gu" && a.id === "report-a-review")!;
    const { body, ...metadata } = a;
    expect(body.length).toBeGreaterThan(200);
    expect(metadata.editorialStatus).toBe("draft");
    expect(
      articleSchema.safeParse({ ...metadata, reviewedAt: "2026-10-28" })
        .success,
    ).toBe(false);
  });
});
