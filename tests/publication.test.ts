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
    expect(sitemap()).toHaveLength(260);
  });

  it("does not expose draft visibility for unknown Vercel environments", async () => {
    vi.stubEnv("VERCEL_ENV", "staging");
    vi.stubEnv("VERCEL", "1");
    vi.resetModules();
    expect((await import("../src/lib/publication")).preview).toBe(false);
  });
});
