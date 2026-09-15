import path from "node:path";
import { test } from "@playwright/test";
import { blockGallery } from "../fixtures/notion-blocks";

const OUTPUT_DIR = path.join(import.meta.dirname, "output");

/**
 * Captures one PNG per Notion block renderer into tests/screenshots/output/.
 * Run with `bun run test:screenshots` after adding or changing a block renderer.
 */
test.describe("notion block screenshots", () => {
  for (const { name } of blockGallery) {
    test(`captures the ${name} block`, async ({ page }) => {
      await page.goto("/__test/notion-blocks");

      const section = page.locator(`section[data-block="${name}"]`);
      await section.scrollIntoViewIfNeeded();
      await section.screenshot({ path: path.join(OUTPUT_DIR, `${name}.png`) });
    });
  }

  test("captures the full gallery", async ({ page }) => {
    await page.goto("/__test/notion-blocks");

    await page.screenshot({ path: path.join(OUTPUT_DIR, "_all-blocks.png"), fullPage: true });
  });
});
