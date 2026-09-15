import { describe, expect, test } from "vitest";
import BlocksRenderer from "../../../src/modules/core/libs/notion/blocks-renderer.astro";
import {
  blockGallery,
  codeBlock,
  embedBlock,
  headingBlock,
  IMAGE_BASE_PATH,
  imageBlock,
  listBlock,
  paragraphBlock,
  quoteBlock,
  richText,
  tableBlock,
  unsupportedBlock,
} from "../../fixtures/notion-blocks";
import { renderComponent } from "./render";

function render(blocks: unknown[]) {
  return renderComponent(BlocksRenderer, { blocks, imageBasePath: IMAGE_BASE_PATH });
}

describe("blocks renderer", () => {
  test.each([
    ["paragraph", [{ block: paragraphBlock(), children: null }], "<p"],
    ["heading_1", [{ block: headingBlock(1), children: null }], "<h1"],
    ["heading_2", [{ block: headingBlock(2), children: null }], "<h2"],
    ["heading_3", [{ block: headingBlock(3), children: null }], "<h3"],
    ["bulleted_list", [listBlock(false, ["item"])], "<ul"],
    ["numbered_list", [listBlock(true, ["item"])], "<ol"],
    ["image", [{ block: imageBlock(), children: null }], "<figure"],
    ["code", [{ block: codeBlock(), children: null }], "<pre"],
    ["quote", [{ block: quoteBlock(), children: null }], "<blockquote"],
    ["embed", [{ block: embedBlock(), children: null }], "<iframe"],
    ["table", [tableBlock()], "<table"],
  ])("dispatches %s to its renderer", async (_type, blocks, expectedTag) => {
    const html = await render(blocks);

    expect(html).toContain(expectedTag);
  });

  test("renders blocks in document order", async () => {
    const html = await render([
      { block: headingBlock(2, "Section"), children: null },
      { block: paragraphBlock([richText("Body")]), children: null },
      { block: quoteBlock("Quoted"), children: null },
    ]);

    expect(html.indexOf("Section")).toBeLessThan(html.indexOf("Body"));
    expect(html.indexOf("Body")).toBeLessThan(html.indexOf("Quoted"));
  });

  test("passes the previous block type so paragraphs after headings tighten spacing", async () => {
    const html = await render([
      { block: headingBlock(2), children: null },
      { block: paragraphBlock([richText("Right after a heading")]), children: null },
    ]);

    expect(html).toContain("mt-4");
  });

  test("silently ignores unsupported block types", async () => {
    const html = await render([
      { block: unsupportedBlock(), children: null },
      { block: paragraphBlock([richText("Still rendered")]), children: null },
    ]);

    expect(html).toContain("Still rendered");
    expect(html).not.toContain("<hr");
  });

  test("renders nothing for an empty block list", async () => {
    const html = await render([]);

    expect(html.trim()).toBe("");
  });

  test("renders every block type covered by the gallery fixture", async () => {
    const html = await render(blockGallery.flatMap((entry) => entry.blocks));

    for (const tag of [
      "<h1",
      "<h2",
      "<h3",
      "<p",
      "<ul",
      "<ol",
      "<blockquote",
      "<pre",
      "<figure",
      "<iframe",
      "<table",
    ]) {
      expect(html, `expected gallery render to contain ${tag}`).toContain(tag);
    }
  });
});
