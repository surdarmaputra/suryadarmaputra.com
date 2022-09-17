import { useEffect, useRef, useState } from 'react';
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
const expandableHeightThreshold = 400;

export function Code({ block }: CodeProps) {
  const codeRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(true);

  const { language, rich_text: richTexts } = block.code;
  const codeText = concatPlainTexts(richTexts as RichTextBlock[]);

  useEffect(() => {
    if (
      codeRef.current?.offsetHeight &&
      codeRef.current.offsetHeight > expandableHeightThreshold
    ) {
      setExpanded(false);
    }
  }, [block]);

  return (
    <div
      className={`relative mb-4 overflow-y-hidden transition ${
        expanded ? 'h-fit' : 'h-96'
      }`}
      ref={codeRef}
    >
      {!expanded && (
        <>
          <div className="absolute bottom-0 h-32 w-full bg-gradient-to-b from-transparent to-white dark:to-slate-900"></div>
          <button
            className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded bg-slate-800 px-4 py-1 text-sm text-slate-300  shadow-lg transition hover:bg-slate-700"
            onClick={() => setExpanded(true)}
          >
            Expand
          </button>
        </>
      )}
      <SyntaxHighlighter
        // customStyle={{ marginBottom: 16 }}
        language={language}
        showLineNumbers={!shellLanguages.includes(language)}
        style={coldarkDark}
      >
        {codeText}
      </SyntaxHighlighter>
    </div>
  );
}
