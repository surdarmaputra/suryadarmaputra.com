import { describe, expect, test } from "vitest";
import Table from "../../../src/modules/core/libs/notion/blocks/table.astro";
import { tableBlock } from "../../fixtures/notion-blocks";
import { renderComponent } from "./render";

describe("table block", () => {
  test("renders a scrollable table with a header row", async () => {
    const { block, children } = tableBlock({ hasColumnHeader: true });
    const html = await renderComponent(Table, { block, children });

    expect(html).toContain("overflow-x-auto");
    expect(html).toContain("<table");
    expect(html).toContain("<thead");
    expect(html).toContain("Framework");
    expect(html).toContain("Runtime");
    expect(html).toContain("<tbody");
    expect(html).toContain("Astro");
  });

  test("renders every row in the body when there is no column header", async () => {
    const { block, children } = tableBlock({ hasColumnHeader: false });
    const html = await renderComponent(Table, { block, children });

    expect(html).not.toContain("<thead");
    expect(html).toContain("Framework");
    expect((html.match(/<tr/g) ?? []).length).toBe(3);
  });

  test("renders the first column as <th> when the table has a row header", async () => {
    const { block, children } = tableBlock({ hasColumnHeader: false, hasRowHeader: true });
    const html = await renderComponent(Table, { block, children });

    expect(html).toContain('<th class="px-4 py-3 text-left font-semibold text-base-content"');
    expect(html).toContain("<td");
  });

  test("zebra-stripes alternating body rows", async () => {
    const { block, children } = tableBlock({
      hasColumnHeader: false,
      rows: [["a"], ["b"], ["c"], ["d"]],
    });
    const html = await renderComponent(Table, { block, children });

    expect((html.match(/bg-base-200\/30/g) ?? []).length).toBe(2);
  });

  test("renders nothing when the table has no rows", async () => {
    const { block } = tableBlock();
    const html = await renderComponent(Table, { block, children: [] });

    expect(html.trim()).toBe("");
  });

  test("ignores children that are not table rows", async () => {
    const { block, children } = tableBlock({ hasColumnHeader: false });
    const html = await renderComponent(Table, {
      block,
      children: [
        ...(children ?? []),
        { block: { id: "noise", type: "paragraph", paragraph: { rich_text: [] } }, children: null },
      ],
    });

    expect((html.match(/<tr/g) ?? []).length).toBe(3);
  });
});
