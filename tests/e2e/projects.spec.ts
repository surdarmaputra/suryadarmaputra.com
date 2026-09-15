import { expect, test } from "@playwright/test";

test.describe("projects list page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test("groups projects by company in the configured order", async ({ page }) => {
    const sectionHeadings = await page.locator("main section[id] > div > h3").allTextContents();

    expect(sectionHeadings.map((heading) => heading.trim())).toEqual([
      "Personal & Open Source",
      "Kargo Technologies",
    ]);
  });

  test("lists every seeded project", async ({ page }) => {
    await expect(page.getByRole("link", { name: /Project Alpha/ }).first()).toBeAttached();
    await expect(page.getByRole("link", { name: /Project Beta/ }).first()).toBeAttached();
  });

  test("shows a sidebar anchor per company section", async ({ page }) => {
    const sidebar = page.locator("#projects-sidebar-desktop");

    await expect(sidebar.locator('a[href="#personal"]')).toBeAttached();
    await expect(sidebar.locator('a[href="#kargo"]')).toBeAttached();
  });

  test("opens a project detail page", async ({ page }) => {
    await page.locator('a[href="/projects/project-alpha"]').first().click();

    await expect(page).toHaveURL(/\/projects\/project-alpha\/?$/);
  });
});
