import { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import { forwardRef,ReactNode,useCallback, useEffect, useState } from 'react';
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

export const MultipleItemsCarousel = forwardRef<HTMLDivElement, PropType>((props, ref) => {
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
    <div className={twMerge('max-w-[48rem] m-auto relative group/multi-item-carousel', className)} ref={ref}>
      <div className="overflow-hidden py-4" ref={emblaRef}>
        <div className="flex">
          {slides.map((item, index) => (
            <div className={twMerge('pl-3 flex-grow-0 flex-shrink-0 w-[45%]', itemClassName)} key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <button
        className='absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-slate-50 dark:bg-slate-800 opacity-0 group-hover/multi-item-carousel:opacity-100 transition'
        disabled={prevBtnDisabled}
        onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
      >
        <SlArrowLeftCircle className='w-6 h-6' />
      </button>

      <button
        className='absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-slate-50 dark:bg-slate-800 opacity-0 group-hover/multi-item-carousel:opacity-100 transition'
        disabled={nextBtnDisabled}
        onClick={() => onButtonAutoplayClick(onNextButtonClick)}
      >
        <SlArrowRightCircle className='w-6 h-6' />
      </button>
    </div>
  );
});

MultipleItemsCarousel.displayName = 'MultipleItemsCarousel'; // Add display name for better debugging
