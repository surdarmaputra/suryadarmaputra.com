import type {
  BlockComponentProps,
  QuoteBlock,
  RichTextBlock,
} from '~/libs/notion';

import { RichText } from './RichText';

interface QuoteProps extends BlockComponentProps {
  block: QuoteBlock;
}

export function Quote({ block, children }: QuoteProps) {
  const parentRichTexts = block.quote.rich_text;
  const richTexts = [...parentRichTexts];

  return (
    <blockquote>
      {richTexts.map((richTextBlock, index) => (
        <RichText block={richTextBlock as RichTextBlock} key={index} />
      ))}
      {children}
    </blockquote>
  );
}
