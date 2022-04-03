import type { BlockComponentProps, BlocksRendererProps } from '~/libs/notion';

import { Code } from './Code';
import { Embed } from './Embed';
import { Heading } from './Heading';
import { Image } from './Image';
import { List, ListItem } from './List';
import { Paragraph } from './Paragraph';
import { Quote } from './Quote';

const componentMap = {
  paragraph: Paragraph,
  heading_1: Heading,
  heading_2: Heading,
  heading_3: Heading,
  code: Code,
  quote: Quote,
  bulleted_list: List,
  bulleted_list_item: ListItem,
  numbered_list: List,
  numbered_list_item: ListItem,
  image: Image,
  embed: Embed,
};

type BlockComponent = (props: BlockComponentProps) => React.ReactElement;

export function BlocksRenderer({ blocks }: BlocksRendererProps) {
  return (
    <>
      {blocks.map(({ block, children }, index) => {
        if (!('type' in block)) return null;

        const mapKey = block.type as keyof typeof componentMap;
        const Component = componentMap[mapKey];
        const previousBlockType =
          // @ts-ignore
          index > 0 ? blocks[index - 1].block?.type : null;

        if (!Component) return null;
        const BlockComponent = Component as BlockComponent;

        return (
          <BlockComponent
            block={block}
            key={block.id}
            previousBlockType={previousBlockType}
          >
            {children?.length ? <BlocksRenderer blocks={children} /> : null}
          </BlockComponent>
        );
      })}
    </>
  );
}
