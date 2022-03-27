import React from 'react';

import type {
  BlockWithChildren,
  Heading1Block,
  Heading2Block,
  Heading3Block,
  RichTextBlock,
} from '~/libs/notion';

import RichText from './RichText';

interface HeadingProps {
  block: Heading1Block | Heading2Block | Heading3Block;
  blockChildren: BlockWithChildren[];
}

function getBlockContent(block: HeadingProps['block']) {
  switch (block.type) {
    case 'heading_1':
      return block.heading_1 as Heading1Block['heading_1'];
    case 'heading_2':
      return block.heading_2 as Heading2Block['heading_2'];
    case 'heading_3':
      return block.heading_3 as Heading3Block['heading_3'];
  }
}

export default function Heading({ block, blockChildren }: HeadingProps) {
  const level = block.type.replace('heading_', '');
  const headingTag = `h${level}`;
  const richTexts = getBlockContent(block).rich_text || [];

  return React.createElement(
    headingTag,
    null,
    richTexts.map((richTextBlock, index) => (
      <RichText block={richTextBlock as RichTextBlock} key={index} />
    )),
  );
}
