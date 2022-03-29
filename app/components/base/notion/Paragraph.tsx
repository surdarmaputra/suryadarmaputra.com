import type {
  BlockWithChildren,
  ParagraphBlock,
  RichTextBlock,
} from '~/libs/notion';

import RichText from './RichText';

interface ParagraphProps {
  block: ParagraphBlock;
  blockChildren: BlockWithChildren[];
  previousBlockType: string | null;
}

const headingBlockTypes = ['heading_1', 'heading_2', 'heading_3'];

export default function Paragraph({
  block,
  blockChildren,
  previousBlockType = null,
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
    </p>
  );
}
