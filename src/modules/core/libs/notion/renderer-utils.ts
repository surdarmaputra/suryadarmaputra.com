import type { RichTextBlock } from "./types";
import { concatPlainTexts as concatPlainTextsUtil, getFileExtensionFromUrl } from "./utils";

// Re-export for convenience
export { concatPlainTextsUtil as concatPlainTexts };

/**
 * Extract rich text from any block type
 */
// biome-ignore lint/suspicious/noExplicitAny: expected
export function getBlockRichText(block: any): RichTextBlock[] {
  if (!("type" in block)) return [];

  // biome-ignore lint/suspicious/noExplicitAny: expected
  const blockContent = (block as any)[block.type];
  if (!blockContent || !blockContent.rich_text) return [];

  return blockContent.rich_text as RichTextBlock[];
}

/**
 * Check if text has any annotations (formatting)
 */
export function hasAnnotation(annotations: RichTextBlock["annotations"]): boolean {
  const { color, ...otherAnnotations } = annotations;
  return Object.keys(otherAnnotations).some((key) => {
    const annotationKey = key as keyof typeof otherAnnotations;
    return !!otherAnnotations[annotationKey];
  });
}

/**
 * Get image extension from block
 */
// biome-ignore lint/suspicious/noExplicitAny: expected
export function getImageExtension(block: any): string | null {
  if (!("type" in block) || block.type !== "image") return null;

  const imageBlock = block.image;
  const imageUrl = imageBlock?.file?.url || imageBlock?.external?.url || null;
  if (!imageUrl) return null;

  return getFileExtensionFromUrl(imageUrl) || null;
}

/**
 * Get image alt text from caption
 */
// biome-ignore lint/suspicious/noExplicitAny: expected
export function getImageAltText(block: any): string {
  if (!("type" in block) || block.type !== "image") return "";

  const caption = block.image?.caption || [];
  return (
    caption
      // biome-ignore lint/suspicious/noExplicitAny: expected
      .map((item: any) => item.plain_text)
      .join(" ")
  );
}
