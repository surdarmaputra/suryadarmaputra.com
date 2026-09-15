import { describe, expect, test } from "vitest";
import ListItem from "../../../src/modules/core/libs/notion/blocks/list-item.astro";
import BlocksRenderer from "../../../src/modules/core/libs/notion/blocks-renderer.astro";
import { IMAGE_BASE_PATH, listBlock, listItemBlock } from "../../fixtures/notion-blocks";
import { renderComponent } from "./render";

describe("list item block", () => {
  test.each(["bulleted_list_item", "numbered_list_item"])("renders %s as <li>", async (type) => {
    const ordered = type === "numbered_list_item";
    const html = await renderComponent(ListItem, {
      block: listItemBlock(ordered, "An item"),
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html).toContain("<li");
    expect(html).toContain("</li>");
    expect(html).toContain("An item");
  });

  test("renders a nested list inside the item", async () => {
    const nested = listBlock(false, ["Nested item"]);
    const html = await renderComponent(ListItem, {
      block: listItemBlock(false, "Parent item"),
      children: [nested],
      imageBasePath: IMAGE_BASE_PATH,
      renderChildren: BlocksRenderer,
    });

    expect(html).toContain("Parent item");
    expect(html).toContain("<ul");
    expect(html).toContain("Nested item");
  });

  test("renders nothing for a non-list-item block", async () => {
    const html = await renderComponent(ListItem, {
      block: { id: "p", type: "paragraph", paragraph: { rich_text: [] } },
      imageBasePath: IMAGE_BASE_PATH,
    });

    expect(html.trim()).toBe("");
  });
});
