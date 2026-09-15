import { expect, test } from "@playwright/test";
import { PAGE_ROUTES, SITE_NAME } from "./routes";

test.describe("every page", () => {
  for (const route of PAGE_ROUTES) {
    test.describe(route.path, () => {
      test("responds 200 with the expected document title", async ({ page }) => {
        const response = await page.goto(route.path);

        expect(response?.status()).toBe(200);
        await expect(page).toHaveTitle(`${route.title} - ${SITE_NAME}`);
      });

      test("renders exactly one h1", async ({ page }) => {
        await page.goto(route.path);

        const headings = page.locator("h1");
        await expect(headings).toHaveCount(1);
        await expect(headings.first()).toContainText(route.heading);
      });

      test("renders header navigation, main and footer landmarks", async ({ page }) => {
        await page.goto(route.path);

        await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
        await expect(page.locator("main")).toBeAttached();
        await expect(page.locator("footer")).toBeAttached();
      });

      test("loads without console errors or failed first-party requests", async ({
        page,
        baseURL,
      }) => {
        // Third-party assets (web fonts, analytics) are out of scope here and
        // are unreachable in sandboxed/offline environments.
        const isFirstParty = (url: string) => url.startsWith(baseURL as string);
        const problems: string[] = [];

        page.on("console", (message) => {
          if (message.type() !== "error") return;
          if (!isFirstParty(message.location().url || (baseURL as string))) return;
          problems.push(`console: ${message.text()}`);
        });
        page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));
        page.on("response", (response) => {
          if (response.status() >= 400 && isFirstParty(response.url())) {
            problems.push(`${response.status()} ${response.url()}`);
          }
        });

        await page.goto(route.path);
        await page.waitForLoadState("domcontentloaded");

        expect(problems).toEqual([]);
      });

      test("has a meta description", async ({ page }) => {
        await page.goto(route.path);

        const description = await page.locator('meta[name="description"]').getAttribute("content");
        expect(description?.length ?? 0).toBeGreaterThan(0);
      });
    });
  }
});

test.describe("main navigation", () => {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Articles", path: "/articles" },
    { label: "Projects", path: "/projects" },
    { label: "About", path: "/about" },
  ];

  for (const item of navItems) {
    test(`navigates to ${item.label}`, async ({ page }) => {
      await page.goto("/");
      await page
        .locator("#desktop-nav")
        .getByRole("link", { name: item.label, exact: true })
        .click();

      await expect(page).toHaveURL(new RegExp(`${item.path.replace(/\/$/, "")}/?$`));
    });

    test(`marks ${item.label} as the current page on ${item.path}`, async ({ page }) => {
      await page.goto(item.path);

      const link = page
        .locator("#desktop-nav")
        .getByRole("link", { name: item.label, exact: true });
      await expect(link).toHaveAttribute("aria-current", "page");
    });
  }
});
