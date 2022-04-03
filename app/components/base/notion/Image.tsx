import { useMemo, useRef, useState } from 'react';
import LazyLoad from 'react-lazyload';
import type { ReactZoomPanPinchHandlers } from 'react-zoom-pan-pinch';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { CloseIcon } from '~/components/base/Icon';
import type {
  BlockComponentProps,
  ImageBlock,
  RichTextBlock,
} from '~/libs/notion';

import { RichText } from './RichText';

interface ImageProps extends BlockComponentProps {
  block: ImageBlock;
}

function getAltText(caption: RichTextBlock[]): string {
  return caption.reduce((finalText, text) => finalText + text.plain_text, '');
}

export function Image({ block }: ImageProps) {
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const handlers = useRef<{
    centerView?: ReactZoomPanPinchHandlers['centerView'];
    resetTransform?: ReactZoomPanPinchHandlers['resetTransform'];
  }>({});

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

  const className = useMemo(
    () =>
      zoomEnabled
        ? 'fixed top-0 left-0 right-0 bottom-0 mt-0'
        : 'mt-10 cursor-zoom-in',
    [zoomEnabled],
  );

  const handleWrapperClick = () => {
    if (!zoomEnabled) {
      setZoomEnabled(true);
    }
  };

  const handleZoomClose = () => {
    if (handlers.current.resetTransform) handlers.current.resetTransform();
    setZoomEnabled(false);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center z-40 transition ${className}`}
      onClick={handleWrapperClick}
    >
      {zoomEnabled ? (
        <>
          <div className="absolute h-full w-full bg-white dark:bg-slate-900 opacity-95"></div>
        </>
      ) : null}
      <LazyLoad placeholder={placeholder}>
        <TransformWrapper centerOnInit={true} disabled={!zoomEnabled}>
          {({ resetTransform }) => {
            handlers.current.resetTransform = resetTransform;
            return (
              <TransformComponent>
                <img alt={altText} className="z-50" src={url} />
              </TransformComponent>
            );
          }}
        </TransformWrapper>
      </LazyLoad>
      {zoomEnabled ? (
        <div className="flex justify-center mt-4">
          <button
            className="text-slate-400 dark:text-slate-500 z-50 w-28 flex items-center justify-center"
            onClick={handleZoomClose}
            type="button"
          >
            <CloseIcon className="mr-2" /> Close
          </button>
        </div>
      ) : null}
      {!zoomEnabled ? (
        <span className="text-center text-slate-400 dark:text-slate-600 font-light text-sm p-4">
          {caption}
        </span>
      ) : null}
    </div>
  );
}
