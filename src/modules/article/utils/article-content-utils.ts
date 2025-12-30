import { getFileExtensionFromUrl } from "../../core/libs/notion";
import type { BlockWithChildren } from "../../core/libs/notion/types";

export interface ContentItem {
  type: "paragraph" | "image" | "bullet-list";
  paragraph?: string;
  image?: string;
  alt?: string;
  bullets?: string[];
}

/**
 * Transform Notion blocks into content items for article details page
 */
export function transformBlocksToContent(blocks: BlockWithChildren[]): ContentItem[] {
  const content: ContentItem[] = [];
  let currentParagraph = "";
  let currentBullets: string[] = [];

  for (const { block, children } of blocks) {
    if (!("type" in block)) continue;

    // Handle images
    if (block.type === "image") {
      // If we have accumulated paragraph text, add it first
      if (currentParagraph.trim()) {
        content.push({
          type: "paragraph",
          paragraph: currentParagraph.trim(),
        });
        currentParagraph = "";
      }

      // If we have accumulated bullets, add them first
      if (currentBullets.length > 0) {
        content.push({
          type: "bullet-list",
          bullets: currentBullets,
        });
        currentBullets = [];
      }

      // Extract image URL and convert to local path
      // Images are stored with block.id as filename in fetch-articles.ts
      const imageUrl = block.image?.file?.url || block.image?.external?.url;
      if (imageUrl && block.id) {
        const extension = getFileExtensionFromUrl(imageUrl);
        const imagePath = extension ? `/images/articles/${block.id}.${extension}` : undefined;

        if (imagePath) {
          // Extract alt text from caption if available
          // biome-ignore lint/suspicious/noExplicitAny: expected
          const caption = (block.image as any)?.caption || [];
          const altText =
            caption
              // biome-ignore lint/suspicious/noExplicitAny: expected
              .map((item: any) => item.plain_text)
              .join(" ") || undefined;

          content.push({
            type: "image",
            image: imagePath,
            alt: altText,
          });
        }
      }
      continue;
    }

    // Handle paragraphs
    if (block.type === "paragraph") {
      // If we have accumulated bullets, add them first
      if (currentBullets.length > 0) {
        content.push({
          type: "bullet-list",
          bullets: currentBullets,
        });
        currentBullets = [];
      }

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
        content.push({
          type: "paragraph",
          paragraph: currentParagraph.trim(),
        });
        currentParagraph = "";
      }

      // If we have accumulated bullets, add them first
      if (currentBullets.length > 0) {
        content.push({
          type: "bullet-list",
          bullets: currentBullets,
        });
        currentBullets = [];
      }

      // biome-ignore lint/suspicious/noExplicitAny: expected
      const richText = (block[block.type] as any)?.rich_text || [];
      const headingText = richText
        // biome-ignore lint/suspicious/noExplicitAny: expected
        .map((text: any) => text.plain_text)
        .join("");

      if (headingText.trim()) {
        content.push({
          type: "paragraph",
          paragraph: headingText.trim(),
        });
      }
      continue;
    }

    // Handle bulleted lists
    if (block.type === "bulleted_list_item") {
      // If we have accumulated paragraph text, add it first
      if (currentParagraph.trim()) {
        content.push({
          type: "paragraph",
          paragraph: currentParagraph.trim(),
        });
        currentParagraph = "";
      }

      // biome-ignore lint/suspicious/noExplicitAny: expected
      const richText = (block.bulleted_list_item as any)?.rich_text || [];
      const bulletText = richText
        // biome-ignore lint/suspicious/noExplicitAny: expected
        .map((text: any) => text.plain_text)
        .join("");

      if (bulletText.trim()) {
        currentBullets.push(bulletText.trim());
      }
      continue;
    }

    // Handle numbered lists as bullet lists (for simplicity)
    if (block.type === "numbered_list_item") {
      // If we have accumulated paragraph text, add it first
      if (currentParagraph.trim()) {
        content.push({
          type: "paragraph",
          paragraph: currentParagraph.trim(),
        });
        currentParagraph = "";
      }

      // biome-ignore lint/suspicious/noExplicitAny: expected
      const richText = (block.numbered_list_item as any)?.rich_text || [];
      const listText = richText
        // biome-ignore lint/suspicious/noExplicitAny: expected
        .map((text: any) => text.plain_text)
        .join("");

      if (listText.trim()) {
        currentBullets.push(listText.trim());
      }
      continue;
    }

    // Handle grouped list blocks (bulleted_list, numbered_list)
    if (block.type === "bulleted_list" || block.type === "numbered_list") {
      // If we have accumulated paragraph text, add it first
      if (currentParagraph.trim()) {
        content.push({
          type: "paragraph",
          paragraph: currentParagraph.trim(),
        });
        currentParagraph = "";
      }

      // Process children (list items)
      if (children && children.length > 0) {
        const childBullets: string[] = [];
        for (const child of children) {
          if ("type" in child.block) {
            if (
              child.block.type === "bulleted_list_item" ||
              child.block.type === "numbered_list_item"
            ) {
              // biome-ignore lint/suspicious/noExplicitAny: expected
              const richText = (child.block[child.block.type] as any)?.rich_text || [];
              const itemText = richText
                // biome-ignore lint/suspicious/noExplicitAny: expected
                .map((text: any) => text.plain_text)
                .join("");
              if (itemText.trim()) {
                childBullets.push(itemText.trim());
              }
            }
          }
        }
        if (childBullets.length > 0) {
          // Add any existing bullets first
          if (currentBullets.length > 0) {
            content.push({
              type: "bullet-list",
              bullets: currentBullets,
            });
            currentBullets = [];
          }
          content.push({
            type: "bullet-list",
            bullets: childBullets,
          });
        }
      }
      continue;
    }

    // Recursively process children for other block types
    if (children && children.length > 0) {
      const childContent = transformBlocksToContent(children);
      // If we have accumulated paragraph text, add it first
      if (currentParagraph.trim()) {
        content.push({
          type: "paragraph",
          paragraph: currentParagraph.trim(),
        });
        currentParagraph = "";
      }
      // If we have accumulated bullets, add them first
      if (currentBullets.length > 0) {
        content.push({
          type: "bullet-list",
          bullets: currentBullets,
        });
        currentBullets = [];
      }
      content.push(...childContent);
    }
  }

  // Add any remaining paragraph text
  if (currentParagraph.trim()) {
    content.push({
      type: "paragraph",
      paragraph: currentParagraph.trim(),
    });
  }

  // Add any remaining bullets
  if (currentBullets.length > 0) {
    content.push({
      type: "bullet-list",
      bullets: currentBullets,
    });
  }

  return content;
}
