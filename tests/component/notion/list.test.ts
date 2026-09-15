import { describe, expect, test } from "vitest";
import List from "../../../src/modules/core/libs/notion/blocks/list.astro";
import BlocksRenderer from "../../../src/modules/core/libs/notion/blocks-renderer.astro";
import { IMAGE_BASE_PATH, listBlock } from "../../fixtures/notion-blocks";
import { renderComponent } from "./render";

describe("list block", () => {
  test("renders a bulleted list as <ul> with disc markers", async () => {
    const { block, children } = listBlock(false, ["First item", "Second item"]);
    const html = await renderComponent(List, {
      block,
      children,
      imageBasePath: IMAGE_BASE_PATH,
      renderChildren: BlocksRenderer,
    });

    expect(html).toContain("<ul");
    expect(html).toContain("list-disc");
    expect(html).not.toContain("<ol");
    expect(html).toContain("First item");
    expect(html).toContain("Second item");
  });

  test("renders a numbered list as <ol> with decimal markers", async () => {
    const { block, children } = listBlock(true, ["Step one", "Step two"]);
    const html = await renderComponent(List, {
      block,
      children,
      imageBasePath: IMAGE_BASE_PATH,
      renderChildren: BlocksRenderer,
    });

    expect(html).toContain("<ol");
    expect(html).toContain("list-decimal");
    expect(html).not.toContain("<ul");
    expect(html).toContain("Step one");
  });

  test("renders an empty list container when there are no items", async () => {
    const html = await renderComponent(List, {
      block: { id: "l", type: "bulleted_list" },
      children: [],
      imageBasePath: IMAGE_BASE_PATH,
      renderChildren: BlocksRenderer,
    });

    expect(html).toContain("<ul");
    expect(html).not.toContain("<li");
  });

  test("renders nothing for a non-list block", async () => {
    const html = await renderComponent(List, {
      block: { id: "p", type: "paragraph", paragraph: { rich_text: [] } },
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html.trim()).toBe("");
  });
});
