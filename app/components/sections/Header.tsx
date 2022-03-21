import { useEffect, useMemo, useState } from 'react';

import ColorModeToggle from '~/components/base/ColorModeToggle';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  const logoPath = useMemo(
    () => (isDark ? '/site-logo-bw.png' : '/site-logo.png'),
    [isDark],
  );

  const toggleColorMode = (becomeDark: boolean) => {
    setIsDark(becomeDark);
    global.localStorage.theme = becomeDark ? 'dark' : 'light';
    if (becomeDark) {
      global.document.documentElement.classList.add('dark');
    } else {
      global.document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    setIsDark(global.localStorage?.theme === 'dark');
  }, [setIsDark]);

  return (
    <header className="mb-4 py-4 flex items-center justify-between">
      <img
        alt="Site logo"
        className="border-2 border-slate-100 dark:border-slate-700 rounded-md"
        src={logoPath}
        width="40"
      />
      <nav className="flex items-center">
        <a className="mr-8 animated-link pt-2 md:pt-1 pb-1" href="/">
          Blog
        </a>
        <a className="mr-8 animated-link pt-2 md:pt-1 pb-1" href="/about">
          About
        </a>
        <ColorModeToggle isDark={isDark} onChange={toggleColorMode} />
      </nav>
    </header>
  );
}
