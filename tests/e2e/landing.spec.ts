import { expect, test } from "@playwright/test";

test.describe("landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows the hero with the site owner name", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Surya Darma Putra");
  });

  test("lists the seeded articles with links to their detail pages", async ({ page }) => {
    const articlesSection = page.locator('section[aria-labelledby="articles-heading"]');

    await expect(
      articlesSection.getByRole("link", { name: "Block Showcase Article" })
    ).toHaveAttribute("href", "/articles/block-showcase-article");
    await expect(
      articlesSection.getByRole("link", { name: "Second Test Article" })
    ).toHaveAttribute("href", "/articles/second-test-article");
  });

  test("reveals article list items once they scroll into view", async ({ page }) => {
    const item = page.locator(".scroll-reveal").first();

    await item.scrollIntoViewIfNeeded();
    await expect(item).toHaveClass(/revealed/);
  });

  test("shows personal projects only in the projects carousel", async ({ page }) => {
    const carousel = page.locator('section[aria-labelledby="projects-heading"]');

    await expect(carousel.locator('a[href="/projects/project-alpha"]')).toHaveCount(1);
    await expect(carousel.locator('a[href="/projects/project-beta"]')).toHaveCount(0);
  });

  test("navigates to an article from the list", async ({ page }) => {
    await page.getByRole("link", { name: "Block Showcase Article" }).first().click();

    await expect(page).toHaveURL(/\/articles\/block-showcase-article\/?$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Block Showcase Article");
  });
});
