import type {
  BlockComponentProps,
  ParagraphBlock,
  RichTextBlock,
} from '~/libs/notion';

import { RichText } from './RichText';

interface ParagraphProps extends BlockComponentProps {
  block: ParagraphBlock;
}

const headingBlockTypes = ['heading_1', 'heading_2', 'heading_3'];

export function Paragraph({
  block,
  previousBlockType = null,
  children,
}: ParagraphProps) {
  const richTexts = block.paragraph.rich_text;

  if (!richTexts?.length) return null;

  const className =
    previousBlockType && headingBlockTypes.includes(previousBlockType)
      ? 'mt-3'
      : '';

  return (
    <p className={className}>
      {richTexts.map((richTextBlock, index) => (
        <RichText block={richTextBlock as RichTextBlock} key={index} />
      ))}
      {children}
    </p>
  );
}
