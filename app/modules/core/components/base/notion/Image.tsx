import { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { SlClose } from 'react-icons/sl';
import LazyLoad from 'react-lazyload';
import type { ReactZoomPanPinchHandlers } from 'react-zoom-pan-pinch';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import {
  BlockComponentProps,
  getFileExtensionFromUrl,
  ImageBlock,
  RichTextBlock,
} from '~/libs/notion';
import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

import { RichText } from './RichText';

interface ImageProps extends BlockComponentProps {
  basePath?: string;
  block: ImageBlock;
}

function getAltText(caption: RichTextBlock[]): string {
  return caption.reduce((finalText, text) => finalText + text.plain_text, '');
}

export function Image({ basePath = '/images/posts', block }: ImageProps) {
  const [isClientReady, setIsClientReady] = useState<boolean>(false);
  const [zoomEnabled, setZoomEnabled] = useState<boolean>(false);
  const handlers = useRef<{
    centerView?: ReactZoomPanPinchHandlers['centerView'];
    resetTransform?: ReactZoomPanPinchHandlers['resetTransform'];
  }>({});

  const captionRichTexts = block.image.caption;
  const extension =
    'type' in block.image && block.image.type === 'file'
      ? getFileExtensionFromUrl(block.image.file.url)
      : '';
  const url = `${basePath}/${block.id}.${extension}`;
  const placeholderUrl = `${basePath}/${block.id}-placeholder.png`;
  const altText = getAltText(captionRichTexts as RichTextBlock[]);

  const caption = captionRichTexts.map((richTextBlock, index) => (
    <RichText block={richTextBlock as RichTextBlock} key={index} />
  ));

  const placeholder = (
    <img alt={altText} className="h-64 blur-xl md:h-96" src={placeholderUrl} />
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

  const handleWrapperKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code !== 'Space' && event.code !== 'Escape') return;
    if (!zoomEnabled) {
      setZoomEnabled(true);
    } else {
      handleZoomClose();
    }
  };

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  return (
    <div
      className={`z-40 flex flex-col items-center justify-center transition ${className}`}
      onClick={handleWrapperClick}
      onKeyUp={handleWrapperKeyUp}
      role="button"
      tabIndex={0}
    >
      {zoomEnabled ? (
        <>
          <div
            className="absolute h-full w-full bg-white opacity-95 dark:bg-slate-900"
            onClick={handleZoomClose}
            onKeyUp={handleWrapperKeyUp}
            role="button"
            tabIndex={0}
          />
        </>
      ) : null}
      {isClientReady ? (
        <LazyLoad placeholder={placeholder}>
          <TransformWrapper centerOnInit={true} disabled={!zoomEnabled}>
            {({ resetTransform }) => {
              handlers.current.resetTransform = resetTransform;
              return (
                <TransformComponent>
                  <OptimizedImage
                    alt={altText}
                    className="z-50"
                    onClick={(event) => event.stopPropagation()}
                    src={url}
                  />
                </TransformComponent>
              );
            }}
          </TransformWrapper>
        </LazyLoad>
      ) : (
        placeholder
      )}
      {zoomEnabled ? (
        <div className="mt-4 flex justify-center">
          <button
            className="z-50 flex w-28 items-center justify-center text-slate-400 dark:text-slate-500"
            onClick={handleZoomClose}
            type="button"
          >
            <SlClose className="mr-2" /> Close
          </button>
        </div>
      ) : null}
      {!zoomEnabled && caption?.length ? (
        <span className="p-4 text-center text-sm font-light text-slate-400 dark:text-slate-600">
          {caption}
        </span>
      ) : null}
    </div>
  );
}
