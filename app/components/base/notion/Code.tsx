import type {
  BlockWithChildren,
  CodeBlock,
  RichTextBlock,
} from '~/libs/notion';

import RichText from './RichText';

interface CodeProps {
  block: CodeBlock;
  blockChildren: BlockWithChildren[];
}

export default function Code({ block, blockChildren }: CodeProps) {
  const richTexts = block.code.rich_text;
  return (
    <pre>
      <code>
        {richTexts.map((richTextBlock, index) => (
          <RichText block={richTextBlock as RichTextBlock} key={index} />
        ))}
      </code>
    </pre>
  );
}
