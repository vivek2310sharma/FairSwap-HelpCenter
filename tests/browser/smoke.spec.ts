import { test, expect, devices } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { locales, articleIds, categories } from "../../src/lib/locales";
import { copy } from "../../src/lib/copy";
test("root always redirects to English regardless of language or region", async ({
  request,
}) => {
  const fixtures: Record<string, string>[] = [
    {
      "Accept-Language": "hi",
      "x-vercel-ip-country": "IN",
      "x-vercel-ip-country-region": "GJ",
    },
    { "Accept-Language": "ta" },
  ];
  for (const headers of fixtures) {
    const r = await request.get("/", { headers, maxRedirects: 0 });
    expect(r.status()).toBe(307);
    expect(r.headers().location).toBe("/en");
  }
});
for (const locale of locales)
  test(`${locale}: home, search and all unavailable offerings`, async ({
    page,
  }) => {
    const c = copy(locale);
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.getByRole("heading", { name: c.hero })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    await expect(page.locator(".topic-card")).toHaveCount(7);
    await expect(page.getByRole("combobox")).toHaveValue(locale);
    expect(await page.locator("select option").count()).toBe(10);
    await page.getByRole("searchbox").fill("UPI");
    await expect(page.locator(".result").first()).toBeVisible();
    await page.locator(".result").first().click();
    await expect(page.locator(".draft-badge")).toHaveText(c.review);
    await expect(page.locator(".prose ol li")).toHaveCount(3);
    for (const path of [
      "business",
      "business/boost",
      "business/banner-advertising",
      "careers",
    ]) {
      await page.goto(`/${locale}/${path}`);
      await expect(
        page.getByRole("heading", { name: c.soon, exact: true }),
      ).toBeVisible();
      await expect(page.locator(".coming-soon .status-badge")).toHaveText(
        c.development,
      );
      await expect(page.locator(".coming-soon")).toContainText(c.unavailable);
      await expect(
        page.locator('form,input[type="file"],input[type="email"]'),
      ).toHaveCount(0);
    }
  });
test("all 260 locale routes and all internal links resolve", async ({
  request,
}) => {
  const checked = new Set<string>();
  for (const locale of locales) {
    const paths = [
      "",
      "/topics",
      "/search",
      "/safety",
      "/contact",
      "/business",
      "/business/boost",
      "/business/banner-advertising",
      "/careers",
      ...categories.map((c) => `/topics/${c}`),
      ...articleIds.map((a) => `/articles/${a}`),
    ];
    for (const path of paths) {
      const url = `/${locale}${path}`;
      const response = await request.get(url);
      expect(response.status(), url).toBe(200);
      const html = await response.text();
      for (const match of html.matchAll(/href="(\/[^"#?]*)"/g)) {
        const target = match[1];
        if (
          target.startsWith("/_next/") ||
          target === "/icon.svg" ||
          checked.has(target)
        )
          continue;
        checked.add(target);
        expect(
          (await request.get(target)).status(),
          `${url} links to ${target}`,
        ).toBe(200);
      }
    }
  }
});
test("language selection preserves article and topic; unknown paths show localized 404", async ({
  page,
  request,
}) => {
  await page.goto("/en/articles/avoid-upi-scams");
  await page.getByRole("combobox").selectOption("gu");
  await expect(page).toHaveURL(/\/gu\/articles\/avoid-upi-scams$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "gu");
  await page.goto("/ta/topics/safety-scams");
  await page.getByRole("combobox").selectOption("or");
  await expect(page).toHaveURL(/\/or\/topics\/safety-scams$/);
  await page.goto("/hi/no-such-page");
  await expect(
    page.getByRole("heading", { name: copy("hi").notFound }),
  ).toBeVisible();
  expect((await request.get("/hi/articles/unknown")).status()).toBe(404);
  expect((await request.get("/ur")).status()).toBe(404);
});
test("mobile widths, keyboard and non-Latin accessibility", async ({
  page,
}) => {
  for (const width of [320, 360, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of [
      "/en",
      "/ta",
      "/or/articles/avoid-upi-scams",
      "/hi/contact",
      "/ml/business/boost",
    ]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${width}: ${path}`,
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/hi");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
test("search focus is quiet; only hovered result heading underlines", async ({
  page,
}) => {
  // Make the first fetch slow to verify the delayed status treatment.
  await page.route("**/search/en.json", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    await route.continue();
  });
  await page.goto("/en");
  const input = page.getByRole("searchbox");
  await input.focus();
  await expect(page.locator(".search-status")).toBeEmpty();
  await input.fill("UPI");
  await expect(page.locator(".search-status")).toHaveText(copy("en").loading);
  const first = page.locator(".result").first();
  await expect(first).toBeVisible();
  await first.hover();
  await expect(first).toHaveCSS("text-decoration-line", "none");
  await expect(first.locator("strong")).toHaveCSS(
    "text-decoration-line",
    "underline",
  );
  await expect(first.locator("p")).toHaveCSS("text-decoration-line", "none");
});
test("search stays local and fails gracefully", async ({ page }) => {
  await page.goto("/bn/search");
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.getByRole("searchbox").fill("UPI QR");
  await expect(page.locator(".result").first()).toBeVisible();
  expect(
    requests.every((url) => !url.includes("UPI") && !url.includes("query=")),
  ).toBe(true);
  await page.getByRole("searchbox").fill("unlikelynonmatchingterm");
  await expect(page.locator(".search-results")).toContainText(copy("bn").empty);
  await page.route("**/search/ta.json", (route) => route.abort());
  await page.goto("/ta/search");
  await page.getByRole("searchbox").fill("UPI");
  await expect(
    page.getByRole("button", { name: copy("ta").retry }),
  ).toBeVisible();
  await expect(page.locator(".search-status")).toHaveText(
    copy("ta").searchError,
  );
});
test("Android-style Tamil navigation has no browser errors or accessibility violations", async ({
  browser,
}) => {
  const context = await browser.newContext({ ...devices["Pixel 5"] });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:3000/ta");
  await expect(page.locator("html")).toHaveAttribute("lang", "ta");
  await expect(page.getByRole("combobox")).toBeVisible();
  await page.getByRole("searchbox").fill("UPI");
  await expect(page.locator(".result").first()).toBeVisible();
  await page.locator(".result").first().click();
  await expect(page.locator(".prose")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  expect(errors).toEqual([]);
  await context.close();
});
test("hint can only switch after a click and is session-dismissable", async ({
  page,
}) => {
  await page.route("**/api/language-suggestion", (route) =>
    route.fulfill({ json: { locale: "gu", label: "ગુજરાતી" } }),
  );
  await page.goto("/en");
  await expect(page.locator(".suggestion")).toBeVisible();
  await expect(page).toHaveURL(/\/en$/);
  await page
    .getByRole("button", { name: "Dismiss language suggestion" })
    .click();
  await expect(page.locator(".suggestion")).toHaveCount(0);
  await page.reload();
  await expect(page.locator(".suggestion")).toHaveCount(0);
  await page.evaluate(() => sessionStorage.clear());
  await page.reload();
  await page.locator(".suggestion a").click();
  await expect(page).toHaveURL(/\/gu$/);
  await expect(page.locator(".suggestion")).toHaveCount(0);
});
test("headers, hint null and preview SEO", async ({ request }) => {
  const r = await request.get("/en");
  expect(r.headers()["x-frame-options"]).toBe("DENY");
  expect(r.headers()["x-content-type-options"]).toBe("nosniff");
  expect(r.headers()["permissions-policy"]).toContain("geolocation=()");
  expect(r.headers()["x-robots-tag"]).toContain("noindex");
  const html = await r.text();
  expect(html).toContain("https://help.fairswap.in/en");
  for (const l of locales) expect(html).toContain(`hrefLang="${l}"`);
  const hint = await request.get("/api/language-suggestion", {
    headers: {
      "x-vercel-ip-country": "IN",
      "x-vercel-ip-country-region": "GJ",
    },
  });
  expect(await hint.json()).toEqual({ locale: null });
  expect(hint.headers()["cache-control"]).toBe("private, no-store");
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain(
    "<url>",
  );
});
