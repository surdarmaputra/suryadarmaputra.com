import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'remix';

import { ColorModeToggle } from '~/components/base/ColorModeToggle';

export function Header() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

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
    <header className="mb-12 py-4 flex items-center justify-between">
      <Link to="/">
        <img
          alt="Site logo"
          className="border-2 border-slate-100 dark:border-slate-700 rounded-md"
          src={logoPath}
          width="40"
        />
      </Link>
      <nav className="flex items-center">
        {location.pathname !== '/' && (
          <Link className="mr-8 animated-link pt-2 md:pt-1 pb-1" to="/">
            Home
          </Link>
        )}
        <NavLink className="mr-8 animated-link pt-2 md:pt-1 pb-1" to="/about">
          About
        </NavLink>
        <ColorModeToggle isDark={isDark} onChange={toggleColorMode} />
      </nav>
    </header>
  );
}
