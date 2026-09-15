import { describe, expect, test } from "vitest";
import Code from "../../../src/modules/core/libs/notion/blocks/code.astro";
import { codeBlock, richText } from "../../fixtures/notion-blocks";
import { renderComponent, textContent } from "./render";

describe("code block", () => {
  test("renders a syntax-highlighted <pre> with the block content", async () => {
    const html = await renderComponent(Code, {
      block: codeBlock("const answer = 42;", "typescript"),
    });

    expect(html).toContain("<pre");
    expect(html).toContain("border-4 border-neutral rounded-lg");
    expect(textContent(html)).toContain("const answer = 42;");
    expect(html).toContain('data-language="typescript"');
  });

  test("joins multiple rich text chunks into one code string", async () => {
    const block = codeBlock();
    block.code.rich_text = [richText("const a = 1;\n"), richText("const b = 2;")];
    const html = await renderComponent(Code, { block });

    expect(textContent(html)).toContain("const a = 1;");
    expect(textContent(html)).toContain("const b = 2;");
  });

  test("renders nothing for a non-code block", async () => {
    const html = await renderComponent(Code, {
      block: { id: "p", type: "paragraph", paragraph: { rich_text: [] } },
    });

    expect(html.trim()).toBe("");
  });
});
