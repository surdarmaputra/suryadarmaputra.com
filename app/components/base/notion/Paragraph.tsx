import type {
  BlockWithChildren,
  ParagraphBlock,
  RichTextBlock,
} from '~/libs/notion';

import RichText from './RichText';

interface ParagraphProps {
  block: ParagraphBlock;
  blockChildren: BlockWithChildren[];
}

export default function Paragraph({ block, blockChildren }: ParagraphProps) {
  const richTexts = block.paragraph.rich_text;
  return (
    <p>
      {richTexts.map((richTextBlock, index) => (
        <RichText block={richTextBlock as RichTextBlock} key={index} />
      ))}
    </p>
  );
}
