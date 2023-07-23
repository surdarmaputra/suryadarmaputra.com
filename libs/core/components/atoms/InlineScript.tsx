import { ReactElement } from 'react';

interface InlineScriptProps {
  body?: string;
}

export default function InlineScript({ body }: InlineScriptProps): ReactElement | null {
  const content = body || '';
  if (!content) return null;

  return (
    <div dangerouslySetInnerHTML={{ __html: `<script>${content}</script>` }} />
  );
}
