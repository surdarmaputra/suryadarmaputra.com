import type {
  GetBlockResponse,
  GetPageResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { identity } from 'lodash';
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
        // @ts-ignore
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

export function getExcerpt(blocks: BlockWithChildren[]): string {
  const inspectedBlocks = blocks.slice(0, 10);

  const excerpt = inspectedBlocks.reduce((accumulator, { block, children }) => {
    // @ts-ignore
    const richTextBlocks = block[block.type]?.rich_text || [];
    let plainTexts = joinStrings(
      (richTextBlocks as RichTextBlock[]).map(
        (richText) => richText.plain_text,
      ),
    );

    if (children?.length) {
      plainTexts = joinStrings([plainTexts, getExcerpt(children)]);
    }

    return plainTexts ? joinStrings([accumulator, plainTexts]) : accumulator;
  }, '');

  return excerpt.length > 255 ? `${excerpt.slice(0, 255)}...` : excerpt;
}

function formatDateObject(date = {}): string | null {
  // @ts-ignore
  return date?.start || null;
}

function formatMultiSelect(items = []): string[] {
  return items.map(({ name }) => name);
}

function formatSelect(item = {}): string | null {
  // @ts-ignore
  return item?.name || null;
}

const propertyFormatters = {
  tags: formatMultiSelect,
  custom_created_at: formatDateObject,
  language: formatSelect,
  category: formatSelect,
};

export function getProperties(page: GetPageResponse): Record<string, any> {
  // @ts-ignore
  const { properties } = page;

  return Object.keys(properties).reduce((accumulator, key) => {
    const valueProp = properties[key].type;

    if (key === 'title') return accumulator;

    // @ts-ignore
    const format = propertyFormatters[key] || identity;
    const value = format(properties[key][valueProp]);

    return {
      ...accumulator,
      [key]: value,
    };
  }, {});
}

export function getTitle(page: GetPageResponse): string | null {
  if (!('properties' in page)) return null;

  return joinStrings(
    // @ts-ignore
    page.properties.title.title.map((title) => title.plain_text),
  );
}

export function joinStrings(strings: string[]): string {
  return strings.filter(Boolean).join(' ').trim();
}

const groupTypeMap: Record<string, string> = {
  numbered_list_item: 'numbered_list',
  bulleted_list_item: 'bulleted_list',
};

export function regroupListItems(
  blocks: BlockWithChildren[],
): BlockWithChildren[] {
  const newBlocks: BlockWithChildren[] = [];
  let group: BlockWithChildren | null = null;

  blocks.forEach((item, index) => {
    // process children
    if (item.children?.length) {
      item.children = regroupListItems(item.children);
    }

    // push item to newBlocks if has no type or not a list type
    if (!('type' in item.block) || !(item.block.type in groupTypeMap)) {
      if (group) {
        newBlocks.push(group);
        group = null;
      }
      newBlocks.push(item);
      return;
    }

    const { block } = item;
    const groupType = groupTypeMap[block.type];

    // push item to group if group type matched with the existing group
    if (
      group &&
      group.block &&
      'type' in group.block &&
      group.block.type === groupType
    ) {
      group.children?.push(item);
    }

    // push existing group if new item is a different type of list
    if (
      group &&
      group.block &&
      'type' in group.block &&
      group.block.type !== groupType
    ) {
      newBlocks.push(group);
    }

    // create new group if no group exists or type is different from the existing group
    if (!group || ('type' in group.block && group.block.type !== groupType)) {
      group = {
        block: {
          id: `${block.id}-${groupType}`,
          // @ts-ignore
          type: groupType,
        },
        children: [item],
      };
    }

    // push group to newBlocks if it is the last item
    if (group && index === blocks.length - 1) {
      newBlocks.push(group);
    }
  });

  return newBlocks;
}

export function getFileExtensionFromUrl(url: string = '') {
  if (url?.includes('.gif')) {
    return 'gif';
  }

  if (url?.includes('.png')) {
    return 'png';
  }
}
