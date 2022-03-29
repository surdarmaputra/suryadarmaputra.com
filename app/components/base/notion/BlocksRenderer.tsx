// @ts-nocheck
import type { BlockWithChildren } from '~/libs/notion';

import Code from './Code';
import Heading from './Heading';
import Image from './Image';
import List from './List';
import Paragraph from './Paragraph';
import Quote from './Quote';

const componentMap = {
  paragraph: Paragraph,
  heading_1: Heading,
  heading_2: Heading,
  heading_3: Heading,
  code: Code,
  quote: Quote,
  bulleted_list: List,
  numbered_list: List,
  image: Image,
};

interface BlocksRendererProps {
  blocks: BlockWithChildren[];
}

export default function BlocksRenderer({ blocks }: BlocksRendererProps) {
  return (
    <>
      {blocks.map(({ block, children }, index) => {
        const Component = componentMap[block.type];
        const previousBlockType =
          index > 0 ? blocks[index - 1].block.type : null;
        return Component ? (
          <Component
            block={block}
            blockChildren={children}
            key={block.id}
            previousBlockType={previousBlockType}
          />
        ) : null;
      })}
    </>
  );
}
