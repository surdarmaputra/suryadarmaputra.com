import LazyLoad from 'react-lazyload';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import type {
  BlockWithChildren,
  ImageBlock,
  RichTextBlock,
} from '~/libs/notion';

import RichText from './RichText';

interface ImageProps {
  block: ImageBlock;
  blockChildren: BlockWithChildren[];
}

function getAltText(caption: RichTextBlock[]): string {
  return caption.reduce((finalText, text) => finalText + text.plain_text, '');
}

export default function Image({ block, blockChildren }: ImageProps) {
  const captionRichTexts = block.image.caption;
  const url = `/images/posts/${block.id}.png`;
  const placeholderUrl = `/images/posts/${block.id}-placeholder.png`;
  const altText = getAltText(captionRichTexts as RichTextBlock[]);

  const caption = captionRichTexts.map((richTextBlock, index) => (
    <RichText block={richTextBlock as RichTextBlock} key={index} />
  ));

  const placeholder = (
    <img alt={altText} className="blur-xl h-64 md:h-96" src={placeholderUrl} />
  );

  return (
    <div className="flex flex-col items-center my-6">
      <LazyLoad placeholder={placeholder}>
        <TransformWrapper>
          <TransformComponent>
            <img alt={altText} src={url} />
          </TransformComponent>
        </TransformWrapper>
      </LazyLoad>
      <span className="text-center text-slate-400 dark:text-slate-600 font-light text-sm p-4">
        {caption}
      </span>
    </div>
  );
}
