import { describe, expect, test } from "vitest";
import Quote from "../../../src/modules/core/libs/notion/blocks/quote.astro";
import { IMAGE_BASE_PATH, quoteBlock } from "../../fixtures/notion-blocks";
import { renderComponent } from "./render";

describe("quote block", () => {
  test("renders a <blockquote> with the accent border", async () => {
    const html = await renderComponent(Quote, {
      block: quoteBlock("Less, but better."),
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html).toContain("<blockquote");
    expect(html).toContain("border-l-4 border-primary");
    expect(html).toContain("italic");
    expect(html).toContain("Less, but better.");
  });

  test("renders nothing for a non-quote block", async () => {
    const html = await renderComponent(Quote, {
      block: { id: "p", type: "paragraph", paragraph: { rich_text: [] } },
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html.trim()).toBe("");
  });
});
