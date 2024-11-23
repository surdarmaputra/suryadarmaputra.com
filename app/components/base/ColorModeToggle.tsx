import { useMemo } from 'react';

import { MoonIcon, SunIcon } from '~/components/base/Icon';

interface ColorModeToggleProps {
  isDark: boolean;
  onChange: (isDark: boolean) => void;
}

export function ColorModeToggle({ isDark, onChange }: ColorModeToggleProps) {
  const toggleClassName = useMemo(
    () =>
      isDark
        ? 'bg-slate-300 shadow shadow-slate-300 translate-x-full'
        : 'bg-amber-500 shadow shadow-amber-500 left-0',
    [isDark],
  );

  const handleClick = () => {
    onChange(!isDark);
  };

  return (
    <button
      className="relative flex h-7 w-14 cursor-pointer items-center justify-between rounded-full bg-slate-200 px-1 dark:bg-slate-700"
      onClick={handleClick}
    >
      <MoonIcon />
      <SunIcon />
      <div
        className={`absolute h-7 w-7 rounded-full transition-transform ${toggleClassName} `}
      />
    </button>
  );
}
