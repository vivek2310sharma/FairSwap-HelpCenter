import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
const browser = await chromium.launch();
const page = await browser.newPage();
mkdirSync("test-results/visual", { recursive: true });
await page.setViewportSize({ width: 320, height: 850 });
await page.goto("http://127.0.0.1:3000/ta");
console.log(
  await page.evaluate(() => ({
    width: innerWidth,
    scroll: document.documentElement.scrollWidth,
    overflow: [...document.querySelectorAll("body *")]
      .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
      .map((e) => ({
        tag: e.tagName,
        cls: e.className,
        right: e.getBoundingClientRect().right,
        text: e.textContent?.slice(0, 70),
      }))
      .slice(0, 20),
  })),
);
await page.screenshot({
  path: "test-results/visual/tamil-320.png",
  fullPage: true,
});
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto("http://127.0.0.1:3000/en");
await page.screenshot({
  path: "test-results/visual/english-desktop.png",
  fullPage: true,
});
await page.goto("http://127.0.0.1:3000/hi/no-such-page");
console.log("404:", await page.locator("h1").allTextContents());
await browser.close();
