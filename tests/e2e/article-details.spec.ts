import { expect, test } from "@playwright/test";

test.describe("article details page", () => {
  test("shows breadcrumbs back to the articles list", async ({ page }) => {
    await page.goto("/articles/block-showcase-article");

    const breadcrumb = page.getByRole("navigation", { name: /breadcrumb/i });
    await expect(breadcrumb.getByRole("link", { name: "Articles" })).toHaveAttribute(
      "href",
      "/articles"
    );
  });

  test("shows publish date and reading time", async ({ page }) => {
    await page.goto("/articles/block-showcase-article");

    await expect(page.locator("main time").first()).toHaveAttribute("datetime", /^2024-03-01/);
    await expect(page.locator("main")).toContainText("min read");
  });

  test("renders the article categories", async ({ page }) => {
    await page.goto("/articles/block-showcase-article");

    await expect(page.locator("main")).toContainText("Engineering");
  });

  test("renders every Notion block type in the article body", async ({ page }) => {
    await page.goto("/articles/block-showcase-article");
    const main = page.locator("main");

    await expect(main.locator("h2")).toContainText(["Heading level 2"]);
    await expect(main.locator("h3")).toContainText(["Heading level 3"]);
    await expect(main.locator("ul.list-disc > li")).toHaveCount(2);
    await expect(main.locator("ol.list-decimal > li")).toHaveCount(2);
    await expect(main.locator("blockquote")).toHaveCount(1);
    await expect(main.locator("pre.astro-code")).toHaveCount(1);
    await expect(main.locator("figure img")).toHaveCount(1);
    await expect(main.locator("iframe")).toHaveCount(1);
    await expect(main.locator("table")).toHaveCount(1);
  });

  test("serves the article images referenced by image blocks", async ({ page }) => {
    await page.goto("/articles/block-showcase-article");
    const source = await page.locator("main figure img").first().getAttribute("src");

    const response = await page.request.get(source as string);
    expect(response.status()).toBe(200);
  });

  test("links to the next older article and back", async ({ page }) => {
    await page.goto("/articles/block-showcase-article");

    await page.getByRole("link", { name: /Next article: Second Test Article/ }).click();
    await expect(page).toHaveURL(/\/articles\/second-test-article\/?$/);

    await page.getByRole("link", { name: /Previous article: Block Showcase Article/ }).click();
    await expect(page).toHaveURL(/\/articles\/block-showcase-article\/?$/);
  });

  test("omits the previous link on the newest article", async ({ page }) => {
    await page.goto("/articles/block-showcase-article");

    await expect(page.getByRole("link", { name: /Previous article:/ })).toHaveCount(0);
  });
});
