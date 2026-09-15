import type { BlockWithChildren, RichTextBlock } from "../../src/modules/core/libs/notion/types";

type Annotations = RichTextBlock["annotations"];

const defaultAnnotations: Annotations = {
  bold: false,
  italic: false,
  strikethrough: false,
  underline: false,
  code: false,
  color: "default",
};

export function richText(
  content: string,
  options: { annotations?: Partial<Annotations>; href?: string | null } = {}
): RichTextBlock {
  const { annotations = {}, href = null } = options;

  return {
    type: "text",
    text: { content, link: href ? { url: href } : null },
    annotations: { ...defaultAnnotations, ...annotations },
    plain_text: content,
    href,
  };
}

// biome-ignore lint/suspicious/noExplicitAny: fixtures mirror raw Notion payloads
type AnyBlock = any;

export function paragraphBlock(
  texts: RichTextBlock[] = [richText("A plain paragraph of body copy.")],
  id = "block-paragraph"
): AnyBlock {
  return { id, type: "paragraph", paragraph: { rich_text: texts } };
}

export function headingBlock(level: 1 | 2 | 3, text = `Heading level ${level}`): AnyBlock {
  const type = `heading_${level}` as const;
  return { id: `block-${type}`, type, [type]: { rich_text: [richText(text)] } };
}

export function listItemBlock(
  ordered: boolean,
  text: string,
  id = `block-list-item-${text}`
): AnyBlock {
  const type = ordered ? "numbered_list_item" : "bulleted_list_item";
  return { id, type, [type]: { rich_text: [richText(text)] } };
}

export function listBlock(ordered: boolean, items: string[]): BlockWithChildren {
  const type = ordered ? "numbered_list" : "bulleted_list";
  const children = items.map((text, index) => ({
    block: listItemBlock(ordered, text, `block-${type}-item-${index}`),
    children: null,
  }));

  // Mirrors the shape produced by regroupListItems(): a wrapper block plus item children.
  return {
    block: { id: `block-${type}`, type } as AnyBlock,
    children,
  };
}

export function imageBlock(caption: RichTextBlock[] = [richText("A sample caption.")]): AnyBlock {
  return {
    id: "block-image",
    type: "image",
    image: {
      type: "file",
      file: { url: "https://notion.example/block-image.png?signature=x" },
      caption,
    },
  };
}

export function codeBlock(
  code = "const greet = (name: string) => name.toUpperCase();",
  language = "typescript"
): AnyBlock {
  return {
    id: "block-code",
    type: "code",
    code: { language, rich_text: [richText(code)], caption: [] },
  };
}

export function quoteBlock(text = "Simplicity is the ultimate sophistication."): AnyBlock {
  return { id: "block-quote", type: "quote", quote: { rich_text: [richText(text)] } };
}

export function embedBlock(url = "https://www.youtube.com/embed/dQw4w9WgXcQ"): AnyBlock {
  return { id: "block-embed", type: "embed", embed: { url, caption: [] } };
}

export function tableRowBlock(cells: string[][], id: string): AnyBlock {
  return {
    id,
    type: "table_row",
    table_row: { cells: cells.map((cell) => cell.map((text) => richText(text))) },
  };
}

export function tableBlock(
  options: { hasColumnHeader?: boolean; hasRowHeader?: boolean; rows?: string[][] } = {}
): BlockWithChildren {
  const {
    hasColumnHeader = true,
    hasRowHeader = false,
    rows = [
      ["Framework", "Runtime"],
      ["Astro", "Node"],
      ["TanStack Start", "Bun"],
    ],
  } = options;

  const children = rows.map((row, index) => ({
    block: tableRowBlock(
      row.map((cell) => [cell]),
      `block-table-row-${index}`
    ),
    children: null,
  }));

  return {
    block: {
      id: "block-table",
      type: "table",
      table: {
        table_width: rows[0]?.length ?? 0,
        has_column_header: hasColumnHeader,
        has_row_header: hasRowHeader,
      },
    } as AnyBlock,
    children,
  };
}

export function unsupportedBlock(): AnyBlock {
  return { id: "block-divider", type: "divider", divider: {} };
}

export const IMAGE_BASE_PATH = "/images/articles";

/**
 * Every block type the renderer supports, in the order the gallery renders them.
 * Adding a new block renderer means adding an entry here.
 */
export const blockGallery: Array<{ name: string; blocks: BlockWithChildren[] }> = [
  {
    name: "heading",
    blocks: [
      { block: headingBlock(1), children: null },
      { block: headingBlock(2), children: null },
      { block: headingBlock(3), children: null },
    ],
  },
  {
    name: "paragraph",
    blocks: [
      {
        block: paragraphBlock([
          richText("Plain text, "),
          richText("bold", { annotations: { bold: true } }),
          richText(", "),
          richText("italic", { annotations: { italic: true } }),
          richText(", "),
          richText("strikethrough", { annotations: { strikethrough: true } }),
          richText(", "),
          richText("underline", { annotations: { underline: true } }),
          richText(", "),
          richText("inline code", { annotations: { code: true } }),
          richText(" and a "),
          richText("link", { href: "https://suryadarmaputra.com" }),
          richText("."),
        ]),
        children: null,
      },
    ],
  },
  { name: "bulleted-list", blocks: [listBlock(false, ["First item", "Second item"])] },
  { name: "numbered-list", blocks: [listBlock(true, ["Step one", "Step two"])] },
  { name: "quote", blocks: [{ block: quoteBlock(), children: null }] },
  { name: "code", blocks: [{ block: codeBlock(), children: null }] },
  { name: "image", blocks: [{ block: imageBlock(), children: null }] },
  { name: "embed", blocks: [{ block: embedBlock(), children: null }] },
  { name: "table", blocks: [tableBlock()] },
];
