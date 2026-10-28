import { spawn } from "node:child_process";
import assert from "node:assert/strict";

const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "--port", "3001"],
  {
    env: {
      ...process.env,
      VERCEL: "1",
      VERCEL_ENV: "production",
      SHOW_DRAFTS: "true",
    },
    stdio: "pipe",
    windowsHide: true,
  },
);
let output = "";
server.stdout.on("data", (chunk) => {
  output += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  output += chunk.toString();
});

const locales = ["en", "hi", "bn", "mr", "te", "ta", "gu", "kn", "or", "ml"];
const articleIds = [
  "create-account",
  "post-a-listing",
  "safe-meetup",
  "contact-a-seller",
  "avoid-upi-scams",
  "fake-army-officer-scam",
  "fake-courier-scam",
  "report-a-listing",
  "submit-support-ticket",
  "grievance-redressal",
];
const ratingsIds = ["how-ratings-work", "report-a-review"];
const ratingsLocales = ["en", "hi"];
const ratingsPaths = ratingsLocales.flatMap((locale) =>
  ratingsIds.map((id) => `/${locale}/articles/${id}`),
);
const draftPaths = locales
  .filter((locale) => !ratingsLocales.includes(locale))
  .flatMap((locale) => ratingsIds.map((id) => `/${locale}/articles/${id}`));
const publishedPaths = locales
  .flatMap((locale) => articleIds.map((id) => `/${locale}/articles/${id}`))
  .concat(ratingsPaths);
const base = "http://127.0.0.1:3001";

try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      if ((await fetch(`${base}/en`)).ok) {
        ready = true;
        break;
      }
    } catch {
      /* startup */
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  assert(ready, `Production server did not start: ${output}`);

  const root = await fetch(`${base}/`, { redirect: "manual" });
  assert.equal(root.status, 307);
  assert.equal(root.headers.get("location"), "/en");

  const home = await fetch(`${base}/en`);
  assert.equal(home.status, 200);
  const homeHtml = await home.text();
  assert(homeHtml.includes("How can we help you?"));
  assert(homeHtml.includes('href="mailto:support@fairswap.in"'));
  assert(!homeHtml.includes("Our guidance is awaiting editorial approval."));
  assert(!homeHtml.includes('class="draft-badge"'));
  assert(!homeHtml.includes('content="noindex'));

  let publishedCount = 0;
  for (const locale of locales) {
    const ratingsApproved = ratingsLocales.includes(locale);
    const publishedIds = ratingsApproved
      ? [...articleIds, ...ratingsIds]
      : articleIds;
    const homepage = await fetch(`${base}/${locale}`);
    assert.equal(homepage.status, 200);
    assert((await homepage.text()).includes(`lang="${locale}"`));
    const index = await fetch(`${base}/search/${locale}.json`);
    assert.equal(index.status, 200);
    const entries = await index.json();
    assert.equal(entries.length, ratingsApproved ? 12 : 10);
    publishedCount += entries.length;
    assert(entries.every((entry) => entry.draft === false));
    assert.deepEqual(
      entries.map((entry) => entry.id).sort(),
      [...publishedIds].sort(),
    );
    for (const id of ratingsIds) {
      for (const suffix of ["", "?SHOW_DRAFTS=true", "?preview=true"]) {
        assert.equal(
          (await fetch(`${base}/${locale}/articles/${id}${suffix}`)).status,
          ratingsApproved ? 200 : 404,
          `${locale}/articles/${id}${suffix}`,
        );
      }
    }
    for (const id of publishedIds) {
      const article = await fetch(`${base}/${locale}/articles/${id}`);
      assert.equal(article.status, 200, `${locale}/articles/${id}`);
      const html = await article.text();
      const reviewedAt = ratingsIds.includes(id) ? "2026-10-28" : "2026-10-14";
      assert(
        html.includes(`dateTime="${reviewedAt}"`) ||
          html.includes(`datetime="${reviewedAt}"`),
      );
      assert(!html.includes('class="draft-badge"'));
      assert(!html.includes('content="noindex'));
      if (ratingsIds.includes(id)) {
        assert(
          html.includes(
            `rel="canonical" href="https://help.fairswap.in/${locale}/articles/${id}"`,
          ),
        );
        const alternates = [
          ...html.matchAll(/<link\b[^>]*rel="alternate"[^>]*>/g),
        ].map(([link]) => {
          const language = /hrefLang="([^"]+)"/i.exec(link)?.[1];
          const href = /href="([^"]+)"/.exec(link)?.[1];
          return [language, href];
        });
        assert.deepEqual(
          alternates.sort(),
          [
            ["en", `https://help.fairswap.in/en/articles/${id}`],
            ["hi", `https://help.fairswap.in/hi/articles/${id}`],
            ["x-default", `https://help.fairswap.in/en/articles/${id}`],
          ].sort(),
        );
      }
    }
    for (const path of [
      "business",
      "business/boost",
      "business/banner-advertising",
      "careers",
    ]) {
      assert.equal(
        (await fetch(`${base}/${locale}/${path}`)).status,
        200,
        `${locale}/${path}`,
      );
    }
  }
  assert.equal(publishedCount, 104);

  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.equal((sitemap.match(/<loc>/g) || []).length, 264);
  const sitemapArticlePaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(([, url]) => new URL(url).pathname)
    .filter((path) => path.includes("/articles/"));
  assert.equal(sitemapArticlePaths.length, 104);
  assert.deepEqual(sitemapArticlePaths.sort(), [...publishedPaths].sort());
  assert(draftPaths.every((path) => !sitemap.includes(path)));
  // Crawl the published sitemap, including topic navigation and related links.
  const internalLinks = new Set();
  for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const path = new URL(url).pathname;
    const response = await fetch(`${base}${path}`);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert(
      draftPaths.every((path) => !html.includes(path)),
      path,
    );
    for (const [, target] of html.matchAll(/href="(\/[^"#?]*)"/g)) {
      if (!target.startsWith("/_next/")) internalLinks.add(target);
    }
  }
  for (const target of internalLinks) {
    assert.equal((await fetch(`${base}${target}`)).status, 200, target);
  }
  assert(
    sitemap.includes("https://help.fairswap.in/gu/articles/avoid-upi-scams"),
  );
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  assert(robots.includes("Allow: /"));
  assert(robots.includes("Sitemap: https://help.fairswap.in/sitemap.xml"));

  const guHint = await fetch(`${base}/api/language-suggestion`, {
    headers: {
      "x-vercel-ip-country": "IN",
      "x-vercel-ip-country-region": "GJ",
    },
  });
  assert.equal(guHint.headers.get("cache-control"), "private, no-store");
  assert.deepEqual(await guHint.json(), {
    locale: "gu",
    label: "ગુજરાતી",
  });
  assert.deepEqual(
    await (
      await fetch(`${base}/api/language-suggestion`, {
        headers: {
          "x-vercel-ip-country": "US",
          "x-vercel-ip-country-region": "GJ",
        },
      })
    ).json(),
    { locale: null },
  );

  console.log(
    "PASS: production exposes ten owner-approved locales, 104 guides, 264 sitemap entries, four approved EN/HI Ratings guides, full search indexes, support email, Coming Soon pages, locale suggestions and English default. Sixteen unapproved Ratings drafts remain gated.",
  );
} finally {
  server.kill();
}
