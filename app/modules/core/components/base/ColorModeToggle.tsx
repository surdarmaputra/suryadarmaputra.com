import { useMemo } from 'react';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

interface ColorModeToggleProps {
  isDark: boolean;
  onChange: (isDark: boolean) => void;
}

export function ColorModeToggle({ isDark, onChange }: ColorModeToggleProps) {
  const toggleClassName = useMemo(
    () =>
      isDark
        ? 'bg-slate-300 shadow-sm shadow-slate-300 translate-x-full'
        : 'bg-amber-500 shadow-sm shadow-amber-500 left-0',
    [isDark],
  );

  const handleClick = () => {
    onChange(!isDark);
  };

  return (
    <button
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex h-4 w-8  md:h-7 md:w-14 cursor-pointer items-center justify-between rounded-full bg-slate-200 px-1 dark:bg-slate-700"
      onClick={handleClick}
      type='button'
    >
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
      <HiOutlineMoon className='w-4 h-4 md:w-5 md:h-5 mr-1' />
      <HiOutlineSun className='w-4 h-4 md:w-5 md:h-5 ml-1' />
      <div
        className={`absolute h-4 w-4 md:h-7 md:w-7 rounded-full transition-transform ${toggleClassName} `}
      />
    </button>
  );
}
