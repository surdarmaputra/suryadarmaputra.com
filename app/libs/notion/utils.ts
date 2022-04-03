// @ts-nocheck
import type { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints';
import readingTime from 'reading-time';

import type { BlockWithChildren, RichTextBlock } from './types';

const blocksWithText = [
  'bulleted_list_item',
  'code',
  'heading_1',
  'heading_2',
  'heading_3',
  'numbered_list_item',
  'paragraph',
  'quote',
];

export function hasChildren(block: GetBlockResponse): boolean {
  return 'has_children' in block && block.has_children;
}

export function concatPlainTexts(blocks: RichTextBlock[]): string {
  return blocks.reduce((finalText, text) => finalText + text.plain_text, '');
}

function generateFullText(blocks: BlockWithChildren[]): string {
  return blocks.reduce((accumulator, { block, children }) => {
    if (!('type' in block)) return accumulator;

    let currentBlockText = accumulator;

    if (blocksWithText.includes(block.type)) {
      currentBlockText = currentBlockText.concat(
        concatPlainTexts(block[block.type].rich_text),
      );
    }

    if (children?.length) {
      currentBlockText = currentBlockText.concat(generateFullText(children));
    }

    return currentBlockText;
  }, '');
}

export function calculateReadingTime(blocks: BlockWithChildren[]): string {
  const fullText = generateFullText(blocks);
  const stats = readingTime(fullText);
  return `${Math.round(stats.minutes)} mins read`;
}
