import { afterEach, describe, it, expect, vi } from "vitest";
import * as fs from "node:fs";
vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof fs>();
  return { ...actual, readFileSync: vi.fn(actual.readFileSync) };
});

afterEach(() => {
  vi.mocked(fs.readFileSync).mockReset();
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("deployment publication boundaries", () => {
  it("exposes only independently approved English/Hindi Ratings translations and SEO links", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    vi.resetModules();
    const read = (await vi.importActual<typeof fs>("node:fs")).readFileSync;
    vi.mocked(fs.readFileSync).mockImplementation(
      (...args: Parameters<typeof read>) => {
        const result = read(...args);
        if (
          typeof result === "string" &&
          /content[\\/](en|hi)[\\/]how-ratings-work\.md$/.test(String(args[0]))
        ) {
          return result
            .replace(
              '"editorialStatus": "draft"',
              '"editorialStatus": "reviewed"',
            )
            .replace('"reviewedAt": null', 'reviewedAt: "2026-10-26"');
        }
        return result;
      },
    );
    const { visibleArticles } = await import("../src/lib/content");
    const { locales } = await import("../src/lib/locales");
    for (const locale of locales) {
      expect(
        visibleArticles(locale).some((a) => a.id === "how-ratings-work"),
      ).toBe(["en", "hi"].includes(locale));
    }
    const { metadata } = await import("../src/lib/seo");
    const seo = metadata(
      "hi",
      "/articles/how-ratings-work",
      "Ratings",
      "Ratings guidance",
    );
    expect(Object.keys(seo.alternates!.languages!)).toEqual([
      "en",
      "hi",
      "x-default",
    ]);
    const sitemap = (await import("../src/app/(entry)/sitemap")).default();
    const ratings = sitemap.filter((entry) =>
      entry.url.endsWith("/articles/how-ratings-work"),
    );
    expect(ratings).toHaveLength(2);
    for (const entry of ratings)
      expect(Object.keys(entry.alternates!.languages!)).toEqual(["en", "hi"]);
  });
  it("allows a protected preview with noindex", async () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("VERCEL", "1");
    vi.resetModules();
    expect((await import("../src/lib/publication")).preview).toBe(true);
    const { visibleArticles } = await import("../src/lib/content");
    const { locales } = await import("../src/lib/locales");
    for (const locale of locales) {
      const articles = visibleArticles(locale);
      expect(articles).toHaveLength(12);
      expect(
        articles
          .filter((a) => a.editorialStatus === "draft")
          .map((a) => a.id)
          .sort(),
      ).toEqual(["how-ratings-work", "report-a-review"]);
    }
  });

  it("publishes reviewed articles, not arbitrary drafts, in production", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("SHOW_DRAFTS", "true");
    vi.resetModules();
    expect((await import("../src/lib/publication")).preview).toBe(false);
    const { visibleArticles } = await import("../src/lib/content");
    expect(visibleArticles("en")).toHaveLength(10);
    expect(visibleArticles("gu")).toHaveLength(10);
    expect(
      visibleArticles("en").every((a) => a.editorialStatus === "reviewed"),
    ).toBe(true);
    const sitemap = (await import("../src/app/(entry)/sitemap")).default;
    const urls = sitemap();
    expect(urls).toHaveLength(260);
    expect(JSON.stringify(urls)).not.toMatch(
      /how-ratings-work|report-a-review/,
    );
  });

  it("does not expose draft visibility for unknown Vercel environments", async () => {
    vi.stubEnv("VERCEL_ENV", "staging");
    vi.stubEnv("VERCEL", "1");
    vi.resetModules();
    expect((await import("../src/lib/publication")).preview).toBe(false);
  });
});
