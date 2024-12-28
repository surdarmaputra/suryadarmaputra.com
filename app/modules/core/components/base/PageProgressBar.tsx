import { useEffect, useRef, useState } from 'react';
import { useNavigation } from 'react-router';
import { twMerge } from 'tailwind-merge';

const STEP_WIDTHS = [
  'opacity-0',
  'w-1/6',
  'w-3/6',
  'w-5/6',
  'w-full',
];

export default function PageProgressBar() {
  const {state} = useNavigation();
  const simulator = useRef<NodeJS.Timeout | null>(null);
  const [widthIndex, setWidthIndex] = useState<number>(0);

  if (widthIndex >= STEP_WIDTHS.length - 1) {
    if (simulator.current) {
      clearInterval(simulator.current);
    }
    setTimeout(() => {
      setWidthIndex(0);
    }, 500);
  }

  useEffect(() => {
    if (state === 'loading' || state === 'submitting') {
      setWidthIndex(1);
      simulator.current = setInterval(() => {
        setWidthIndex(currentIndex => currentIndex + 1);
      }, 2000);
    } else {
      setWidthIndex(STEP_WIDTHS.length - 1);
    }

    return () => {
      if (simulator.current) {
        clearInterval(simulator.current);
      }
    };
  }, [state]);

  return (
    <div
      className={twMerge(
        'fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-amber-500 via-pink-600 to-sky-500 transition-all',
        STEP_WIDTHS[widthIndex],
      )}
    />
  );
}