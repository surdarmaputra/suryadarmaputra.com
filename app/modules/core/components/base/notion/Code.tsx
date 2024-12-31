import { useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { SlArrowDown } from 'react-icons/sl';
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
  const [copied, setCopied] = useState(false);

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

  useEffect(() => {
    let timeout;
    if (copied) {
      timeout = setTimeout(() => {
        setCopied(!copied);
      }, 3000);
    } else {
      clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <div
      className={`relative my-4 overflow-y-hidden transition ${
        expanded ? 'h-fit' : 'h-96'
      }`}
      ref={codeRef}
    >
      <CopyToClipboard onCopy={() => setCopied(true)} text={codeText}>
        <button className="absolute right-0 top-0 rounded-bl bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800 dark:text-slate-400">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </CopyToClipboard>

      {!expanded && (
        <>
          <div className="absolute bottom-0 h-32 w-full bg-gradient-to-b from-transparent to-white dark:to-slate-900"></div>
          <button
            className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center rounded-full bg-slate-800 px-6 py-1 text-sm text-slate-300 shadow-lg transition hover:bg-slate-700"
            onClick={() => setExpanded(true)}
          >
            Expand <SlArrowDown className="ml-2 h-3 w-3" />
          </button>
        </>
      )}

      <SyntaxHighlighter
        customStyle={{ margin: 0 }}
        language={language}
        showLineNumbers={!shellLanguages.includes(language)}
        style={coldarkDark}
      >
        {codeText}
      </SyntaxHighlighter>
    </div>
  );
}
