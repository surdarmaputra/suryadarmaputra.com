import { BlockComponentProps, RichTextBlock } from '~/libs/notion';

interface ParagraphProps extends BlockComponentProps {
  block: RichTextBlock;
}

interface TextWithAnnotationsProps {
  annotations: RichTextBlock['annotations'];
  children: React.ReactNode;
  href: RichTextBlock['href'];
}

function hasAnnotation(annotations: RichTextBlock['annotations']): boolean {
  const { color, ...otherAnnotations } = annotations;
  return Object.keys(otherAnnotations).some((key) => {
    const annotationKey = key as keyof RichTextBlock['annotations'];
    return !!annotations[annotationKey];
  });
}

function TextWithAnnotations({
  annotations,
  children,
  href,
}: TextWithAnnotationsProps) {
  const className = `
    ${annotations.bold ? 'font-semibold' : ''}
    ${annotations.italic ? 'italic' : ''}
    ${annotations.strikethrough ? 'line-through' : ''}
    ${annotations.underline ? 'underline' : ''}
  `;

  if (href) {
    return (
      <a className={className} href={href} rel="noreferrer" target="_blank">
        {annotations.code ? <code>{children}</code> : children}
      </a>
    );
  }

  if (annotations.code) {
    return <code>{children}</code>;
  }

  return <span className={className}>{children}</span>;
}

export function RichText({ block }: ParagraphProps) {
  const { annotations, plain_text: plainText, href } = block;

  if (!plainText) return null;

  if (href) {
    return (
      <a href={href} rel="noreferrer" target="_blank">
        {plainText}
      </a>
    );
  }

  if (hasAnnotation(annotations)) {
    return (
      <TextWithAnnotations annotations={annotations} href={href}>
        {plainText}
      </TextWithAnnotations>
    );
  }

  return <>{plainText}</>;
}
