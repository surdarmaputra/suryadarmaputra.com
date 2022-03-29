import type { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints';

import type { RichTextBlock } from './types';

export function hasChildren(block: GetBlockResponse): boolean {
  return 'has_children' in block && block.has_children;
}

export function concatPlainTexts(blocks: RichTextBlock[]): string {
  return blocks.reduce((finalText, text) => finalText + text.plain_text, '');
}
