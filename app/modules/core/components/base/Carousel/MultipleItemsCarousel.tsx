import { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import { forwardRef, ReactNode, useCallback, useEffect, useState } from 'react';
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
    const [isPlaying, setIsPlaying] = useState(false);

    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
      AutoScroll({
        startDelay: 0,
        playOnInit: options?.autoPlay,
        speed: 0.5,
        stopOnMouseEnter: true,
        direction: options?.playDirection,
      }),
    ]);

    const {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    const onButtonAutoplayClick = useCallback(
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

    const toggleAutoplay = useCallback(() => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      const playOrStop = autoScroll.isPlaying()
        ? autoScroll.stop
        : autoScroll.play;
      playOrStop();
    }, [emblaApi]);

    useEffect(() => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      setIsPlaying(autoScroll.isPlaying());
      emblaApi
        .on('autoScroll:play', () => setIsPlaying(true))
        .on('autoScroll:stop', () => setIsPlaying(false))
        .on('reInit', () => setIsPlaying(autoScroll.isPlaying()));
    }, [emblaApi]);

    useEffect(() => {
      if (!isPlaying) {
        setTimeout(() => {
          toggleAutoplay();
        }, 1000);
      }
    }, [isPlaying, toggleAutoplay]);

    return (
      <div
        className={twMerge(
          'group/multi-item-carousel relative m-auto max-w-[48rem]',
          className,
        )}
        ref={ref}
      >
        <div className="overflow-hidden py-4" ref={emblaRef}>
          <div className="flex">
            {slides.map((item, index) => (
              <div
                className={twMerge(
                  'w-[45%] flex-shrink-0 flex-grow-0 pl-3',
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
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-50 opacity-0 transition group-hover/multi-item-carousel:opacity-100 dark:bg-slate-800"
          disabled={prevBtnDisabled}
          onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
        >
          <SlArrowLeftCircle className="h-8 w-8 md:h-12 md:w-12" />
        </button>

        <button
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-50 opacity-0 transition group-hover/multi-item-carousel:opacity-100 dark:bg-slate-800"
          disabled={nextBtnDisabled}
          onClick={() => onButtonAutoplayClick(onNextButtonClick)}
        >
          <SlArrowRightCircle className="h-8 w-8 md:h-12 md:w-12" />
        </button>
      </div>
    );
  },
);

MultipleItemsCarousel.displayName = 'MultipleItemsCarousel'; // Add display name for better debugging
