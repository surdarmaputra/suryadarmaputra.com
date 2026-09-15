import { describe, expect, test } from "vitest";
import Heading from "../../../src/modules/core/libs/notion/blocks/heading.astro";
import { headingBlock, IMAGE_BASE_PATH } from "../../fixtures/notion-blocks";
import { renderComponent } from "./render";

describe("heading block", () => {
  test.each([
    [1, "h1", "text-4xl md:text-5xl font-bold"],
    [2, "h2", "text-3xl md:text-4xl font-bold"],
    [3, "h3", "text-2xl md:text-3xl font-semibold"],
  ] as const)("renders heading_%i as <%s>", async (level, tag, expectedClasses) => {
    const html = await renderComponent(Heading, {
      block: headingBlock(level),
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html).toContain(`<${tag}`);
    expect(html).toContain(`</${tag}>`);
    expect(html).toContain(expectedClasses);
    expect(html).toContain(`Heading level ${level}`);
  });

  test("renders nothing when the heading has no rich text", async () => {
    const html = await renderComponent(Heading, {
      block: { id: "h", type: "heading_2", heading_2: { rich_text: [] } },
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html.trim()).toBe("");
  });

  test("renders nothing for a non-heading block", async () => {
    const html = await renderComponent(Heading, {
      block: { id: "p", type: "paragraph", paragraph: { rich_text: [] } },
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html.trim()).toBe("");
  });
});
