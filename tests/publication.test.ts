import { afterEach, describe, it, expect, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("deployment publication boundaries", () => {
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
