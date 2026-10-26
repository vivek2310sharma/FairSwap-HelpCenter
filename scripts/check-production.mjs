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
const drafts = ["how-ratings-work", "report-a-review"];
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

  for (const locale of locales) {
    const homepage = await fetch(`${base}/${locale}`);
    assert.equal(homepage.status, 200);
    assert((await homepage.text()).includes(`lang="${locale}"`));
    const index = await fetch(`${base}/search/${locale}.json`);
    assert.equal(index.status, 200);
    const entries = await index.json();
    assert.equal(entries.length, 10);
    assert(entries.every((entry) => entry.draft === false));
    assert.deepEqual(
      entries.map((entry) => entry.id).sort(),
      [...articleIds].sort(),
    );
    for (const id of drafts) {
      for (const suffix of ["", "?SHOW_DRAFTS=true", "?preview=true"]) {
        assert.equal(
          (await fetch(`${base}/${locale}/articles/${id}${suffix}`)).status,
          404,
        );
      }
    }
    for (const id of articleIds) {
      const article = await fetch(`${base}/${locale}/articles/${id}`);
      assert.equal(article.status, 200, `${locale}/articles/${id}`);
      const html = await article.text();
      assert(/datetime="2026-10-14"/i.test(html));
      assert(!html.includes('class="draft-badge"'));
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

  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.equal((sitemap.match(/<loc>/g) || []).length, 260);
  assert(drafts.every((id) => !sitemap.includes(id)));
  // Crawl the published sitemap, including topic navigation and related links.
  const internalLinks = new Set();
  for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const path = new URL(url).pathname;
    const response = await fetch(`${base}${path}`);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert(
      drafts.every((id) => !html.includes(`/articles/${id}`)),
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
    "PASS: production exposes ten owner-approved locales, 100 guides, 260 sitemap entries, full search indexes, support email, Coming Soon pages, locale suggestions and English default. Unapproved drafts remain gated.",
  );
} finally {
  server.kill();
}
