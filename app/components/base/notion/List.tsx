import React from 'react';

import type {
  BlockWithChildren,
  BulletedListBlock,
  BulletedListItemBlock,
  NumberedListBlock,
  NumberedListItemBlock,
  RichTextBlock,
} from '~/libs/notion';

import { RichText } from './RichText';

interface ListProps {
  block: BulletedListBlock | NumberedListBlock;
  blockChildren: BlockWithChildren[];
}

interface ListItemProps {
  block: BulletedListItemBlock | NumberedListItemBlock;
  blockChildren: BlockWithChildren[] | null;
}

const listTagMap = {
  bulleted_list: 'ul',
  numbered_list: 'ol',
};

function getListBlockContent(block: ListProps['block']): BlockWithChildren[] {
  switch (block.type) {
    case 'bulleted_list':
      return block.bulleted_list.bulleted_list_item;
    case 'numbered_list':
      return block.numbered_list.numbered_list_item;
  }
}

function getListItemRichText(block: ListItemProps['block']) {
  switch (block.type) {
    case 'bulleted_list_item':
      return block.bulleted_list_item.rich_text as RichTextBlock[];
    case 'numbered_list_item':
      return block.numbered_list_item.rich_text as RichTextBlock[];
  }
}

function ListItem({ block, blockChildren }: ListItemProps) {
  const richTexts = getListItemRichText(block);
  return (
    <li>
      {richTexts.map((richTextBlock, index) => (
        <RichText block={richTextBlock as RichTextBlock} key={index} />
      ))}
    </li>
  );
}

export function List({ block, blockChildren }: ListProps) {
  const ListTag = listTagMap[block.type];
  const items = getListBlockContent(block) || [];

  return React.createElement(
    ListTag,
    null,
    items.map(({ block: listItemBlock, children: listItemChildren }, index) => (
      <ListItem
        block={listItemBlock as BulletedListItemBlock | NumberedListItemBlock}
        blockChildren={listItemChildren}
        key={index}
      />
    )),
  );
}
