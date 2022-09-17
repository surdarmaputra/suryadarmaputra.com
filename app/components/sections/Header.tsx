import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'remix';

import { ColorModeToggle } from '~/components/base/ColorModeToggle';

export function Header() {
  const [isDark, setIsDark] = useState(true);
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
    const isCurrentlyDark = !global.localStorage.theme
      ? true
      : global.localStorage.theme === 'dark';
    setIsDark(isCurrentlyDark);
  }, [setIsDark]);

  return (
    <header className="mb-12 flex items-center justify-between py-4">
      <Link to="/">
        <img
          alt="Site logo"
          className="rounded-md border-2 border-slate-100 dark:border-slate-700"
          src={logoPath}
          width="40"
        />
      </Link>
      <nav className="flex items-center">
        {location.pathname !== '/' && (
          <Link className="animated-link mr-8 pt-2 pb-1 md:pt-1" to="/">
            Home
          </Link>
        )}
        <NavLink className="animated-link mr-8 pt-2 pb-1 md:pt-1" to="/about">
          About
        </NavLink>
        <ColorModeToggle isDark={isDark} onChange={toggleColorMode} />
      </nav>
    </header>
  );
}
