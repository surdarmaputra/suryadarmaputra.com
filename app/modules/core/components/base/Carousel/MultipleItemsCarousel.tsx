import { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import debounce from 'lodash/debounce';
import { forwardRef, ReactNode, useCallback } from 'react';
import { SlArrowLeftCircle, SlArrowRightCircle } from 'react-icons/sl';
import { twMerge } from 'tailwind-merge';

import { usePrevNextButtons } from './usePrevNexButtons';

interface Options {
  autoPlay?: boolean;
  playDirection?: 'backward' | 'forward';
}

interface PropType {
  className?: string;
  itemClassName?: string;
  slides: ReactNode[];
  options?: EmblaOptionsType & Options;
}

export const MultipleItemsCarousel = forwardRef<HTMLDivElement, PropType>(
  (props, ref) => {
    const { slides, options, className, itemClassName } = props;

    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
      AutoScroll({
        startDelay: 0,
        playOnInit: options?.autoPlay,
        speed: 0.5,
        stopOnMouseEnter: true,
        stopOnInteraction: true,
        direction: options?.playDirection,
      }),
    ]);

    const {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    const play = useCallback(() => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;
      autoScroll.play();
    }, [emblaApi]);

    const debouncedPlay = debounce(play, 2000);

    const pause = useCallback(() => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;
      autoScroll.stop();
    }, [emblaApi]);

    const debouncedPause = debounce(pause, 2000);

    const handleClickAutoplay = useCallback(
      (callback: () => void) => {
        const autoScroll = emblaApi?.plugins()?.autoScroll;
        if (!autoScroll) return;

        const resetOrStop =
          autoScroll.options.stopOnInteraction === false
            ? autoScroll.reset
            : autoScroll.stop;

        resetOrStop();
        callback();
      },
      [emblaApi],
    );

    return (
      <div
        className={twMerge(
          'group/multi-item-carousel relative m-auto max-w-3xl',
          className,
        )}
        onMouseEnter={() => debouncedPause()}
        onMouseLeave={() => debouncedPlay()}
        ref={ref}
      >
        <div className="overflow-hidden py-4" ref={emblaRef}>
          <div className="flex">
            {slides.map((item, index) => (
              <div
                className={twMerge(
                  'w-[45%] shrink-0 grow-0 pl-3',
                  itemClassName,
                )}
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <button
          aria-label="Scroll to left"
          className="absolute left-2 top-1/2 z-10 -translate-x-full -translate-y-1/2 rounded-full bg-slate-50 opacity-0 transition group-hover/multi-item-carousel:translate-x-0 group-hover/multi-item-carousel:opacity-100 dark:bg-slate-800"
          disabled={prevBtnDisabled}
          onClick={() => handleClickAutoplay(onPrevButtonClick)}
          type="button"
        >
          <SlArrowLeftCircle className="h-8 w-8 md:h-12 md:w-12" />
        </button>

        <button
          aria-label="Scroll to right"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 translate-x-full rounded-full bg-slate-50 opacity-0 transition group-hover/multi-item-carousel:translate-x-0 group-hover/multi-item-carousel:opacity-100 dark:bg-slate-800"
          disabled={nextBtnDisabled}
          onClick={() => handleClickAutoplay(onNextButtonClick)}
          type="button"
        >
          <SlArrowRightCircle className="h-8 w-8 md:h-12 md:w-12" />
        </button>
      </div>
    );
  },
);

MultipleItemsCarousel.displayName = 'MultipleItemsCarousel'; // Add display name for better debugging
