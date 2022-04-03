import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import type {
  BlockComponentProps,
  CodeBlock,
  RichTextBlock,
} from '~/libs/notion';
import { concatPlainTexts } from '~/libs/notion';

interface CodeProps extends BlockComponentProps {
  block: CodeBlock;
}

const shellLanguages = ['shell', 'bash'];

export function Code({ block }: CodeProps) {
  const { language, rich_text: richTexts } = block.code;
  const codeText = concatPlainTexts(richTexts as RichTextBlock[]);

  return (
    <SyntaxHighlighter
      customStyle={{ marginBottom: 16 }}
      language={language}
      showLineNumbers={!shellLanguages.includes(language)}
      style={coldarkDark}
    >
      {codeText}
    </SyntaxHighlighter>
  );
}
