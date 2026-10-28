import { afterEach, describe, it, expect, vi } from "vitest";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("deployment publication boundaries", () => {
  it("exposes only independently approved English/Hindi Ratings translations and SEO links", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    vi.resetModules();
    const { metadata } = await import("../src/lib/seo");
    const sitemap = (await import("../src/app/(entry)/sitemap")).default();
    const ids = ["how-ratings-work", "report-a-review"];
    for (const id of ids) {
      for (const locale of ["en", "hi"] as const) {
        const seo = metadata(
          locale,
          `/articles/${id}`,
          "Ratings",
          "Ratings guidance",
        );
        expect(seo.alternates!.canonical).toBe(
          `https://help.fairswap.in/${locale}/articles/${id}`,
        );
        expect(seo.alternates!.languages).toEqual({
          en: `https://help.fairswap.in/en/articles/${id}`,
          hi: `https://help.fairswap.in/hi/articles/${id}`,
          "x-default": `https://help.fairswap.in/en/articles/${id}`,
        });
      }
      const ratings = sitemap.filter((entry) =>
        entry.url.endsWith(`/articles/${id}`),
      );
      expect(ratings.map((entry) => entry.url)).toEqual([
        `https://help.fairswap.in/en/articles/${id}`,
        `https://help.fairswap.in/hi/articles/${id}`,
      ]);
      for (const entry of ratings)
        expect(entry.alternates!.languages).toEqual({
          en: `https://help.fairswap.in/en/articles/${id}`,
          hi: `https://help.fairswap.in/hi/articles/${id}`,
        });
    }
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
      ).toEqual(
        ["en", "hi"].includes(locale)
          ? []
          : ["how-ratings-work", "report-a-review"],
      );
    }
  });

  it("publishes reviewed articles, not arbitrary drafts, in production", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("SHOW_DRAFTS", "true");
    vi.resetModules();
    expect((await import("../src/lib/publication")).preview).toBe(false);
    const { visibleArticles } = await import("../src/lib/content");
    const { locales } = await import("../src/lib/locales");
    for (const locale of locales) {
      const articles = visibleArticles(locale);
      expect(articles).toHaveLength(["en", "hi"].includes(locale) ? 12 : 10);
      expect(articles.every((a) => a.editorialStatus === "reviewed")).toBe(
        true,
      );
      expect(
        articles
          .filter((a) => ["how-ratings-work", "report-a-review"].includes(a.id))
          .map((a) => a.id)
          .sort(),
      ).toEqual(
        ["en", "hi"].includes(locale)
          ? ["how-ratings-work", "report-a-review"]
          : [],
      );
    }
    const sitemap = (await import("../src/app/(entry)/sitemap")).default;
    const urls = sitemap();
    expect(urls).toHaveLength(264);
    const ratings = urls.filter((entry) =>
      /\/articles\/(how-ratings-work|report-a-review)$/.test(entry.url),
    );
    expect(ratings).toHaveLength(4);
    expect(
      ratings.every((entry) => /\/(en|hi)\/articles\//.test(entry.url)),
    ).toBe(true);
  });

  it("does not expose draft visibility for unknown Vercel environments", async () => {
    vi.stubEnv("VERCEL_ENV", "staging");
    vi.stubEnv("VERCEL", "1");
    vi.resetModules();
    expect((await import("../src/lib/publication")).preview).toBe(false);
  });
});
