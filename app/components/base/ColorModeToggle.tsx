import { useMemo } from 'react';

import MoonIcon from '~/components/icons/MoonIcon';
import SunIcon from '~/components/icons/SunIcon';

interface ColorModeToggleProps {
  isDark: boolean;
  onChange: (isDark: boolean) => void;
}

export default function ColorModeToggle({
  isDark,
  onChange,
}: ColorModeToggleProps) {
  const toggleClassName = useMemo(
    () =>
      isDark
        ? 'bg-sky-600 shadow shadow-sky-600 translate-x-full'
        : 'bg-amber-500 shadow shadow-amber-500 left-0',
    [isDark],
  );

  const handleClick = () => {
    onChange(!isDark);
  };

  return (
    <div
      className="relative flex bg-slate-200 dark:bg-slate-700 rounded-full items-center w-14 h-7 justify-between px-1 cursor-pointer"
      onClick={handleClick}
    >
      <MoonIcon />
      <SunIcon />
      <div
        className={`
          w-7 h-7 rounded-full absolute transition-transform
          ${toggleClassName}
        `}
      />
    </div>
  );
}
