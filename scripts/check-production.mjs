import { spawn } from "node:child_process";
import assert from "node:assert/strict";
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "--port", "3001"],
  {
    env: { ...process.env, VERCEL: "1", VERCEL_ENV: "production" },
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
try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      if ((await fetch("http://127.0.0.1:3001/en")).ok) {
        ready = true;
        break;
      }
    } catch {
      /* startup */
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  assert(ready, `Production server did not start: ${output}`);
  const base = "http://127.0.0.1:3001";
  const home = await fetch(`${base}/en`);
  const html = await home.text();
  assert(html.includes("Our guidance is awaiting editorial approval."));
  assert(html.includes("noindex"));
  assert(!html.includes("How can we help you?"));
  for (const locale of [
    "en",
    "hi",
    "bn",
    "mr",
    "te",
    "ta",
    "gu",
    "kn",
    "or",
    "ml",
  ]) {
    assert.equal(
      (await fetch(`${base}/${locale}/articles/avoid-upi-scams`)).status,
      404,
    );
    const index = await fetch(`${base}/search/${locale}.json`);
    assert.equal(index.status, 200);
    assert.deepEqual(await index.json(), []);
    if (locale !== "en")
      assert.equal((await fetch(`${base}/${locale}`)).status, 404);
  }
  assert(
    !(await (await fetch(`${base}/sitemap.xml`)).text()).includes("<url>"),
  );
  assert(
    (await (await fetch(`${base}/robots.txt`)).text()).includes("Disallow: /"),
  );
  assert.deepEqual(
    await (await fetch(`${base}/api/language-suggestion`)).json(),
    { locale: null },
  );
  console.log(
    "PASS: production holds all 100 draft articles and unapproved locale shells; 10 empty search indexes; noindex maintenance page; empty sitemap; robots disallow; no unapproved geo suggestion.",
  );
} finally {
  server.kill();
}
