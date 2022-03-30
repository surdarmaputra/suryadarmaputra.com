import type {
  BlockWithChildren,
  QuoteBlock,
  RichTextBlock,
} from '~/libs/notion';

import { RichText } from './RichText';

interface QuoteProps {
  block: QuoteBlock;
  blockChildren: BlockWithChildren[];
}

export function Quote({ block, blockChildren }: QuoteProps) {
  const richTexts = block.quote.rich_text;
  return (
    <blockquote>
      {richTexts.map((richTextBlock, index) => (
        <RichText block={richTextBlock as RichTextBlock} key={index} />
      ))}
    </blockquote>
  );
}
