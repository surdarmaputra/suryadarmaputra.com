import { getFileExtensionFromUrl } from "../../core/libs/notion";
import type { BlockWithChildren } from "../../core/libs/notion/types";

export interface ContentItem {
  image?: string;
  paragraph: string;
}

/**
 * Transform Notion blocks into content items for project details page
 */
export function transformBlocksToContent(
  blocks: BlockWithChildren[],
  projectId: string
): ContentItem[] {
  const content: ContentItem[] = [];
  let currentParagraph = "";

  for (const { block, children } of blocks) {
    if (!("type" in block)) continue;

    // Handle images
    if (block.type === "image") {
      // If we have accumulated paragraph text, add it first
      if (currentParagraph.trim()) {
        content.push({ paragraph: currentParagraph.trim() });
        currentParagraph = "";
      }

      // Extract image URL and convert to local path
      const imageUrl = block.image?.file?.url || block.image?.external?.url;
      if (imageUrl) {
        const extension = getFileExtensionFromUrl(imageUrl);
        // Find the image index by counting previous images
        const imageIndex = content.filter((item) => item.image).length + 1;
        const imagePath = extension
          ? `/images/projects/${projectId}-${imageIndex}.${extension}`
          : undefined;

        if (imagePath) {
          content.push({ image: imagePath, paragraph: "" });
        }
      }
      continue;
    }

    // Handle paragraphs
    if (block.type === "paragraph") {
      // biome-ignore lint/suspicious/noExplicitAny: expected
      const richText = (block.paragraph as any)?.rich_text || [];
      const paragraphText = richText
        // biome-ignore lint/suspicious/noExplicitAny: expected
        .map((text: any) => text.plain_text)
        .join("");

      if (paragraphText.trim()) {
        currentParagraph += (currentParagraph ? " " : "") + paragraphText;
      }
      continue;
    }

    // Handle headings as paragraphs
    if (block.type === "heading_1" || block.type === "heading_2" || block.type === "heading_3") {
      // If we have accumulated paragraph text, add it first
      if (currentParagraph.trim()) {
        content.push({ paragraph: currentParagraph.trim() });
        currentParagraph = "";
      }

      // biome-ignore lint/suspicious/noExplicitAny: expected
      const richText = (block[block.type] as any)?.rich_text || [];
      const headingText = richText
        // biome-ignore lint/suspicious/noExplicitAny: expected
        .map((text: any) => text.plain_text)
        .join("");

      if (headingText.trim()) {
        content.push({ paragraph: headingText.trim() });
      }
      continue;
    }

    // Handle bulleted lists
    if (block.type === "bulleted_list_item") {
      // biome-ignore lint/suspicious/noExplicitAny: expected
      const richText = (block.bulleted_list_item as any)?.rich_text || [];
      const bulletText = richText
        // biome-ignore lint/suspicious/noExplicitAny: expected
        .map((text: any) => text.plain_text)
        .join("");

      if (bulletText.trim()) {
        currentParagraph += (currentParagraph ? " " : "") + bulletText;
      }
      continue;
    }

    // Handle numbered lists
    if (block.type === "numbered_list_item") {
      // biome-ignore lint/suspicious/noExplicitAny: expected
      const richText = (block.numbered_list_item as any)?.rich_text || [];
      const listText = richText
        // biome-ignore lint/suspicious/noExplicitAny: expected
        .map((text: any) => text.plain_text)
        .join("");

      if (listText.trim()) {
        currentParagraph += (currentParagraph ? " " : "") + listText;
      }
      continue;
    }

    // Recursively process children
    if (children && children.length > 0) {
      const childContent = transformBlocksToContent(children, projectId);
      // If we have accumulated paragraph text, add it first
      if (currentParagraph.trim()) {
        content.push({ paragraph: currentParagraph.trim() });
        currentParagraph = "";
      }
      content.push(...childContent);
    }
  }

  // Add any remaining paragraph text
  if (currentParagraph.trim()) {
    content.push({ paragraph: currentParagraph.trim() });
  }

  // Filter out items with empty paragraphs (images should have empty paragraphs)
  return content.filter((item) => item.image || item.paragraph.trim());
}
