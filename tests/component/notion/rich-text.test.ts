import { describe, expect, test } from "vitest";
import RichText from "../../../src/modules/core/libs/notion/blocks/rich-text.astro";
import { richText } from "../../fixtures/notion-blocks";
import { renderComponent } from "./render";

describe("rich-text block", () => {
  test("renders bare text without a wrapper element", async () => {
    const html = await renderComponent(RichText, { block: richText("Plain text") });

    expect(html).toContain("Plain text");
    expect(html).not.toContain("<span");
  });

  test("renders nothing for empty text", async () => {
    const html = await renderComponent(RichText, { block: richText("") });

    expect(html.trim()).toBe("");
  });

  test.each([
    ["bold", "font-semibold"],
    ["italic", "italic"],
    ["strikethrough", "line-through"],
    ["underline", "underline"],
  ])("wraps %s text in a span with the %s class", async (annotation, expectedClass) => {
    const html = await renderComponent(RichText, {
      block: richText("Formatted", { annotations: { [annotation]: true } }),
    });

    expect(html).toContain("<span");
    expect(html).toContain(expectedClass);
    expect(html).toContain("Formatted");
  });

  test("combines multiple annotations on a single span", async () => {
    const html = await renderComponent(RichText, {
      block: richText("Loud", { annotations: { bold: true, italic: true } }),
    });

    expect(html).toContain("font-semibold");
    expect(html).toContain("italic");
  });

  test("renders links as external anchors with rel=noreferrer", async () => {
    const html = await renderComponent(RichText, {
      block: richText("Visit site", { href: "https://suryadarmaputra.com" }),
    });

    expect(html).toContain('href="https://suryadarmaputra.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noreferrer"');
    expect(html).toContain("link link-primary");
    expect(html).not.toContain("undefined");
  });

  test("renders a code element inside links annotated as code", async () => {
    const html = await renderComponent(RichText, {
      block: richText("npm i", { annotations: { code: true }, href: "https://example.com" }),
    });

    expect(html).toContain("<a");
    expect(html).toContain("<code>npm i</code>");
  });

  test("renders inline code as a highlighted code element", async () => {
    const html = await renderComponent(RichText, {
      block: richText("const x = 1", { annotations: { code: true } }),
    });

    expect(html).toContain("<code");
    expect(html).toContain("const x = 1");
  });
});
