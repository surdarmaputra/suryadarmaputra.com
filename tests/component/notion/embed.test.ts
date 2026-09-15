import { describe, expect, test } from "vitest";
import Embed from "../../../src/modules/core/libs/notion/blocks/embed.astro";
import { embedBlock } from "../../fixtures/notion-blocks";
import { renderComponent } from "./render";

describe("embed block", () => {
  test("renders a lazy-loaded titled iframe for the embed url", async () => {
    const html = await renderComponent(Embed, {
      block: embedBlock("https://www.youtube.com/embed/abc123"),
    });

    expect(html).toContain("<iframe");
    expect(html).toContain('src="https://www.youtube.com/embed/abc123"');
    expect(html).toContain('loading="lazy"');
    expect(html).toContain('title="Embedded content"');
  });

  test("renders nothing when the embed has no url", async () => {
    const html = await renderComponent(Embed, {
      block: { id: "e", type: "embed", embed: { url: "" } },
    });

    expect(html.trim()).toBe("");
  });

  test("renders nothing for a non-embed block", async () => {
    const html = await renderComponent(Embed, {
      block: { id: "p", type: "paragraph", paragraph: { rich_text: [] } },
    });

    expect(html.trim()).toBe("");
  });
});
