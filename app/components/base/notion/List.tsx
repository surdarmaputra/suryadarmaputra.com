import React from 'react';

import type {
  BlockComponentProps,
  BulletedListBlock,
  BulletedListItemBlock,
  NumberedListBlock,
  NumberedListItemBlock,
  RichTextBlock,
} from '~/libs/notion';

import { RichText } from './RichText';

interface ListProps extends BlockComponentProps {
  block: BulletedListBlock | NumberedListBlock;
}

interface ListItemProps {
  block: BulletedListItemBlock | NumberedListItemBlock;
  children?: React.ReactNode;
}

const listTagMap = {
  bulleted_list: 'ul',
  numbered_list: 'ol',
};

function getListItemRichText(block: ListItemProps['block']) {
  switch (block.type) {
  case 'bulleted_list_item':
    return block.bulleted_list_item.rich_text as RichTextBlock[];
  case 'numbered_list_item':
    return block.numbered_list_item.rich_text as RichTextBlock[];
  }
}

export function ListItem({ block, children }: ListItemProps) {
  const richTexts = getListItemRichText(block);
  return (
    <li>
      {richTexts.map((richTextBlock, index) => (
        <RichText block={richTextBlock as RichTextBlock} key={index} />
      ))}
      {children}
    </li>
  );
}

export function List({ block, children }: ListProps) {
  const ListTag = listTagMap[block.type];

  return React.createElement(ListTag, null, children);
}
