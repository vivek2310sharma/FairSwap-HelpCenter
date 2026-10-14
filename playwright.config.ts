import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "tests/browser",
  timeout: 60000,
  expect: { timeout: 10000 },
  fullyParallel: false,
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    ...devices["Desktop Chrome"],
    trace: "retain-on-failure",
  },
  webServer: {
    command: "pnpm start",
    url: "http://127.0.0.1:3000/en",
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
  projects: [{ name: "chromium" }],
});
