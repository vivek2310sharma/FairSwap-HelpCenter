import { describe, it, expect } from "vitest";
import { suggest } from "../src/lib/geo";
import { locales } from "../src/lib/locales";
import { GET } from "../src/app/api/language-suggestion/route";
describe("optional state suggestion", () => {
  for (const [state, locale] of Object.entries({
    GJ: "gu",
    MH: "mr",
    WB: "bn",
    AP: "te",
    TS: "te",
    TG: "te",
    TN: "ta",
    KA: "kn",
    OD: "or",
    OR: "or",
    KL: "ml",
    UP: "hi",
    MP: "hi",
    RJ: "hi",
    BR: "hi",
    JH: "hi",
    HR: "hi",
    DL: "hi",
    HP: "hi",
    CG: "hi",
    CT: "hi",
    UK: "hi",
    UT: "hi",
  }))
    it(`${state} suggests ${locale} only if approved`, () => {
      expect(suggest("IN", state, locales)).toBe(locale);
      expect(suggest("IN", state, [])).toBe(null);
    });
  it("fails closed for absent, foreign, ambiguous or invalid headers", () => {
    for (const [country, region] of [
      [null, null],
      ["US", "GJ"],
      ["IN", null],
      ["IN", "PB"],
      ["IN", "IN-GJ"],
      ["IN", "gj"],
      ["IN", "__proto__"],
      ["in", "GJ"],
    ])
      expect(suggest(country, region, locales)).toBe(null);
  });
  it("suggests an approved locale without leaking IP or state", async () => {
    const response = GET(
      new Request("https://test/api/language-suggestion", {
        headers: {
          "x-vercel-ip-country": "IN",
          "x-vercel-ip-country-region": "GJ",
          "x-forwarded-for": "127.0.0.1",
        },
      }),
    );
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(await response.json()).toEqual({
      locale: "gu",
      label: "ગુજરાતી",
    });
    expect(response.headers.get("set-cookie")).toBe(null);
  });
});
