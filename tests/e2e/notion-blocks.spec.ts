import { expect, test } from "@playwright/test";
import { blockGallery } from "../fixtures/notion-blocks";

const GALLERY_PATH = "/__test/notion-blocks";

test.describe("notion block gallery", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(GALLERY_PATH);
  });

  test("renders a section for every block in the gallery fixture", async ({ page }) => {
    await expect(page.locator("section[data-block]")).toHaveCount(blockGallery.length);
  });

  test("renders headings at the right levels", async ({ page }) => {
    const section = page.locator('section[data-block="heading"]');

    await expect(section.locator("h1")).toHaveText("Heading level 1");
    await expect(section.locator("h2")).toHaveText("Heading level 2");
    await expect(section.locator("h3")).toHaveText("Heading level 3");
  });

  test("renders every paragraph annotation", async ({ page }) => {
    const section = page.locator('section[data-block="paragraph"]');

    await expect(section.locator("p .font-semibold")).toHaveText("bold");
    await expect(section.locator("p .italic")).toHaveText("italic");
    await expect(section.locator("p .line-through")).toHaveText("strikethrough");
    await expect(section.locator("p .underline")).toHaveText("underline");
    await expect(section.locator("p code")).toContainText("inline code");
  });

  test("renders links as external anchors", async ({ page }) => {
    const link = page.locator('section[data-block="paragraph"] a');

    await expect(link).toHaveAttribute("href", "https://suryadarmaputra.com");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noreferrer");
  });

  test("renders bulleted and numbered lists with the right markers", async ({ page }) => {
    const bulleted = page.locator('section[data-block="bulleted-list"] ul');
    const numbered = page.locator('section[data-block="numbered-list"] ol');

    await expect(bulleted.locator("li")).toHaveCount(2);
    await expect(bulleted).toHaveCSS("list-style-type", "disc");
    await expect(numbered.locator("li")).toHaveCount(2);
    await expect(numbered).toHaveCSS("list-style-type", "decimal");
  });

  test("renders the quote with a left accent border", async ({ page }) => {
    const quote = page.locator('section[data-block="quote"] blockquote');

    await expect(quote).toBeVisible();
    await expect(quote).toHaveCSS("border-left-width", "4px");
    await expect(quote).toHaveCSS("font-style", "italic");
  });

  test("renders the code block with syntax highlighting", async ({ page }) => {
    const code = page.locator('section[data-block="code"] pre.astro-code');

    await expect(code).toHaveAttribute("data-language", "typescript");
    await expect(code.locator("span.line")).toHaveCount(1);
  });

  test("renders the image with alt text, caption and a loadable source", async ({ page }) => {
    const figure = page.locator('section[data-block="image"] figure');

    await expect(figure.locator("img")).toHaveAttribute("alt", "A sample caption.");
    await expect(figure.locator("figcaption")).toContainText("A sample caption.");

    const source = await figure.locator("img").getAttribute("src");
    expect((await page.request.get(source as string)).status()).toBe(200);
  });

  test("renders the embed as a titled lazy iframe", async ({ page }) => {
    const iframe = page.locator('section[data-block="embed"] iframe');

    await expect(iframe).toHaveAttribute("loading", "lazy");
    await expect(iframe).toHaveAttribute("title", "Embedded content");
  });

  test("renders the table with a header row and body rows", async ({ page }) => {
    const table = page.locator('section[data-block="table"] table');

    await expect(table.locator("thead th")).toHaveText(["Framework", "Runtime"]);
    await expect(table.locator("tbody tr")).toHaveCount(2);
    await expect(table.locator("tbody tr").first().locator("td")).toHaveText(["Astro", "Node"]);
  });

  test("every block section is visible and non-empty", async ({ page }) => {
    for (const { name } of blockGallery) {
      const section = page.locator(`section[data-block="${name}"]`);

      await expect(section, `${name} section should exist`).toBeVisible();
      const box = await section.boundingBox();
      expect(box?.height ?? 0, `${name} section should render content`).toBeGreaterThan(0);
    }
  });
});
