'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { ColorModeToggle } from '../atoms/ColorModeToggle';

export function Header() {
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();

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
      <Link href="/">
        <Image
          alt="Site logo"
          className="rounded-md border-2 border-slate-100 dark:border-slate-700"
          height={40}
          src={logoPath}
          width={40}
        />
      </Link>
      <nav className="flex items-center">
        {pathname !== '/' && (
          <Link className="animated-link mr-8 pb-1 pt-2 md:pt-1" href="/">
            Home
          </Link>
        )}
        <Link className="animated-link mr-8 pb-1 pt-2 md:pt-1" href="/about">
          About
        </Link>
        <ColorModeToggle isDark={isDark} onChange={toggleColorMode} />
      </nav>
    </header>
  );
}
