import { describe, expect, test } from "vitest";
import Image from "../../../src/modules/core/libs/notion/blocks/image.astro";
import { IMAGE_BASE_PATH, imageBlock, richText } from "../../fixtures/notion-blocks";
import { renderComponent } from "./render";

describe("image block", () => {
  test("renders a figure with the locally generated image path", async () => {
    const html = await renderComponent(Image, {
      block: imageBlock(),
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html).toContain("<figure");
    expect(html).toContain(`src="${IMAGE_BASE_PATH}/block-image.png"`);
  });

  test("uses the caption as alt text", async () => {
    const html = await renderComponent(Image, {
      block: imageBlock([richText("A red bicycle leaning on a wall")]),
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html).toContain('alt="A red bicycle leaning on a wall"');
  });

  test('falls back to alt="Image" when there is no caption', async () => {
    const html = await renderComponent(Image, {
      block: imageBlock([]),
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html).toContain('alt="Image"');
    expect(html).not.toContain("<figcaption");
  });

  test("renders a figcaption when a caption is present", async () => {
    const html = await renderComponent(Image, {
      block: imageBlock([richText("Sample caption")]),
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html).toContain("<figcaption");
    expect(html).toContain("Sample caption");
  });

  test("resolves gif images to a .gif path", async () => {
    const block = imageBlock();
    block.image.file.url = "https://notion.example/block-image.gif?signature=x";
    const html = await renderComponent(Image, { block, imageBasePath: IMAGE_BASE_PATH });

    expect(html).toContain(`src="${IMAGE_BASE_PATH}/block-image.gif"`);
  });

  test("renders nothing when the image url has an unsupported extension", async () => {
    const block = imageBlock();
    block.image.file.url = "https://notion.example/block-image.webp";
    const html = await renderComponent(Image, { block, imageBasePath: IMAGE_BASE_PATH });

    expect(html.trim()).toBe("");
  });
});
