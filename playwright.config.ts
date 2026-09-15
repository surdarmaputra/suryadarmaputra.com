import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 4321);
const baseURL = `http://localhost:${PORT}`;

// Escape hatch for sandboxes that ship a pre-installed Chromium instead of the
// browsers `playwright install` downloads. Unset locally and in CI.
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH;
const chromium = {
  ...devices["Desktop Chrome"],
  ...(executablePath ? { channel: undefined, launchOptions: { executablePath } } : {}),
};

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "e2e",
      testMatch: /.*\.spec\.ts/,
      use: chromium,
    },
    {
      name: "screenshots",
      testMatch: /.*\.screenshot\.ts/,
      use: { ...chromium, viewport: { width: 900, height: 900 } },
    },
  ],
  webServer: {
    command: `bun run test:seed && ENABLE_TEST_ROUTES=true bun run build && bun run preview --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
