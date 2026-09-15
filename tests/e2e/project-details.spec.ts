import { expect, test } from "@playwright/test";

test.describe("project details page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects/project-alpha");
  });

  test("shows breadcrumbs back to the projects list", async ({ page }) => {
    const breadcrumb = page.getByRole("navigation", { name: /breadcrumb/i });

    await expect(breadcrumb.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "/projects"
    );
  });

  test("renders the project body blocks", async ({ page }) => {
    await expect(page.locator("main")).toContainText("About Project Alpha.");
  });

  test("shows the project tags", async ({ page }) => {
    const main = page.locator("main");

    await expect(main).toContainText("typescript");
    await expect(main).toContainText("astro");
  });

  test("opens the preview link in a new tab with a safe rel", async ({ page }) => {
    const preview = page.getByRole("link", { name: /Preview Project Alpha project/ });

    await expect(preview).toHaveAttribute("href", "https://example.com/alpha");
    await expect(preview).toHaveAttribute("target", "_blank");
    await expect(preview).toHaveAttribute("rel", /noopener/);
  });

  test("shows related projects excluding the current one", async ({ page }) => {
    await expect(page.locator('a[href="/projects/project-alpha"]')).toHaveCount(0);
    await expect(page.locator('a[href="/projects/project-beta"]').first()).toBeAttached();
  });
});
