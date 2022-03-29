import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import type {
  BlockWithChildren,
  CodeBlock,
  RichTextBlock,
} from '~/libs/notion';
import { concatPlainTexts } from '~/libs/notion';

interface CodeProps {
  block: CodeBlock;
  blockChildren: BlockWithChildren[];
}

export default function Code({ block, blockChildren }: CodeProps) {
  const { language, rich_text: richTexts } = block.code;
  const codeText = concatPlainTexts(richTexts as RichTextBlock[]);

  return (
    <SyntaxHighlighter
      customStyle={{ marginBottom: 16 }}
      language={language}
      style={coldarkDark}
    >
      {codeText}
    </SyntaxHighlighter>
  );
}
