import { describe, expect, test } from "vitest";
import Paragraph from "../../../src/modules/core/libs/notion/blocks/paragraph.astro";
import BlocksRenderer from "../../../src/modules/core/libs/notion/blocks-renderer.astro";
import { IMAGE_BASE_PATH, paragraphBlock, richText } from "../../fixtures/notion-blocks";
import { renderComponent } from "./render";

describe("paragraph block", () => {
  test("renders a <p> with body typography classes", async () => {
    const html = await renderComponent(Paragraph, {
      block: paragraphBlock([richText("Body copy.")]),
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html).toContain("<p");
    expect(html).toContain("Body copy.");
    expect(html).toContain("text-lg leading-[1.8] text-base-content");
  });

  test("uses default vertical spacing when not preceded by a heading", async () => {
    const html = await renderComponent(Paragraph, {
      block: paragraphBlock(),
      previousBlockType: "paragraph",
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html).toContain("my-6");
    expect(html).not.toContain("mt-4");
  });

  // biome-ignore format: local biome version differs from CI
  test.each([
    "heading_1",
    "heading_2",
    "heading_3",
  ])("tightens spacing when preceded by %s", async (previousBlockType) => {
    const html = await renderComponent(Paragraph, {
      block: paragraphBlock(),
      previousBlockType,
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html).toContain("mt-4");
    expect(html).not.toContain("my-6");
  });

  test("renders nothing when the paragraph has no rich text", async () => {
    const html = await renderComponent(Paragraph, {
      block: paragraphBlock([]),
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html.trim()).toBe("");
  });

  test("renders nested children inside the paragraph", async () => {
    const html = await renderComponent(Paragraph, {
      block: paragraphBlock([richText("Parent.")]),
      children: [{ block: paragraphBlock([richText("Nested child.")], "nested"), children: null }],
      imageBasePath: IMAGE_BASE_PATH,
      renderChildren: BlocksRenderer,
    });

    expect(html).toContain("Parent.");
    expect(html).toContain("Nested child.");
  });

  test("renders nothing for a non-paragraph block", async () => {
    const html = await renderComponent(Paragraph, {
      block: { id: "x", type: "quote", quote: { rich_text: [richText("nope")] } },
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html.trim()).toBe("");
  });
});
