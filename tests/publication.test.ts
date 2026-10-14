import { afterEach, describe, it, expect, vi } from "vitest";
afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});
describe("deployment publication boundaries", () => {
  it("permits labelled drafts locally and in a Vercel preview", async () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("VERCEL", "1");
    vi.resetModules();
    expect((await import("../src/lib/publication")).preview).toBe(true);
  });
  it("never lets an arbitrary draft flag override production", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("SHOW_DRAFTS", "true");
    vi.resetModules();
    expect((await import("../src/lib/publication")).preview).toBe(false);
    const { visibleArticles } = await import("../src/lib/content");
    expect(visibleArticles("en")).toEqual([]);
    const sitemap = (await import("../src/app/(entry)/sitemap")).default;
    expect(sitemap()).toEqual([]);
  });
  it("does not expose drafts for an unknown Vercel environment", async () => {
    vi.stubEnv("VERCEL_ENV", "staging");
    vi.stubEnv("VERCEL", "1");
    vi.resetModules();
    expect((await import("../src/lib/publication")).preview).toBe(false);
  });
});
