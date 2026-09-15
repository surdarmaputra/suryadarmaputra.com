import { expect, test } from "@playwright/test";

test.describe("articles list page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/articles");
  });

  test("lists all articles newest first", async ({ page }) => {
    const titles = await page.locator("article h3 a").allTextContents();

    expect(titles.map((title) => title.trim())).toEqual([
      "Block Showcase Article",
      "Second Test Article",
    ]);
  });

  test("shows reading time and publish date for each article", async ({ page }) => {
    const firstArticle = page.locator("article").first();

    await expect(firstArticle.locator("time")).toHaveAttribute("datetime", /^\d{4}-\d{2}-\d{2}/);
    await expect(firstArticle).toContainText("min read");
  });

  test("opens an article detail page", async ({ page }) => {
    await page.getByRole("link", { name: "Second Test Article" }).click();

    await expect(page).toHaveURL(/\/articles\/second-test-article\/?$/);
  });
});
