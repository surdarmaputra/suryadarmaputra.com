import debounce from 'lodash/debounce';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';

import { ColorModeToggle } from '~/modules/core/components/base/ColorModeToggle';

const STICKY_CLASSES_BASE = [
  'bg-white',
  'dark:bg-slate-900',
];

const STICKY_CLASSES_DWEB = [
  ...STICKY_CLASSES_BASE,
  'top-0',
];

const STICKY_CLASSES_MWEB = [
  ...STICKY_CLASSES_BASE,
  'border',
  'bottom-0',
  'dark:border-slate-800',
  'mb-2',
  'ml-2',
  'mr-2',
  'rounded-xl',
  'shadow-2xl',
];

const NON_STICKY_CLASSES = [
  'top-0',
];

export function Header() {
  const observedRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState<boolean>(true);
  const location = useLocation();

  const logoPath = useMemo(
    () => (isDark ? '/site-logo-bw.png' : '/site-logo.png'),
    [isDark],
  );

  const toggleColorMode = (becomeDark: boolean) => {
    setIsDark(becomeDark);
    window.localStorage.theme = becomeDark ? 'dark' : 'light';
    if (becomeDark) {
      window.document.documentElement.classList.add('dark');
      window.document.documentElement.classList.remove('light');
    } else {
      window.document.documentElement.classList.add('light');
      window.document.documentElement.classList.remove('dark');
    }
  };

  const updateStickyHeader = debounce(() => {
    const isDweb = window.innerWidth > 768;
    if (isDweb) {
      headerRef.current?.classList.add(...STICKY_CLASSES_DWEB);
    } else {
      headerRef.current?.classList.add(...STICKY_CLASSES_MWEB);
      headerRef.current?.classList.remove(...NON_STICKY_CLASSES);
    }
  });

  const updateNonStickyHeader = debounce(() => {
    headerRef.current?.classList.remove(...STICKY_CLASSES_DWEB);
    headerRef.current?.classList.remove(...STICKY_CLASSES_MWEB);
    headerRef.current?.classList.add(...NON_STICKY_CLASSES);
  });

  useEffect(() => {
    const isCurrentlyDark = !window.localStorage.theme
      ? true
      : window.localStorage.theme === 'dark';
    setIsDark(isCurrentlyDark);
  }, [setIsDark]);

  useEffect(() => {
    const element = observedRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) {
          updateStickyHeader();
        } else {
          updateNonStickyHeader();
        }
      },
      { threshold: 0.5 },
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [updateNonStickyHeader, updateStickyHeader]);

  return (
    <>
      <div className="h-0 w-0" ref={observedRef} />
      <header
        className="container mx-auto flex items-center justify-between p-4 mb-12 fixed left-0 top-0 right-0 z-20"
        ref={headerRef}
      >
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
            <Link className="animated-link mr-8 pb-1 pt-2 md:pt-1" to="/">
              Home
            </Link>
          )}
          <NavLink className="animated-link mr-8 pb-1 pt-2 md:pt-1" to="/about">
            About
          </NavLink>
          <ColorModeToggle isDark={isDark} onChange={toggleColorMode} />
        </nav>
      </header>
    </>
  );
}
