import debounce from 'lodash/debounce';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';

import { ColorModeToggle } from '~/modules/core/components/base/ColorModeToggle';

const STICKY_CLASSES_BASE = [
  'after:bg-white',
  'after:dark:bg-slate-900',
  'border',
  'dark:border-slate-800',
  'rounded-xl',
  'shadow-2xl',
];

const STICKY_CLASSES_DWEB = [
  ...STICKY_CLASSES_BASE,
  'mt-1',
];

const STICKY_CLASSES_MWEB = [
  ...STICKY_CLASSES_BASE,
  'mb-1',
  'ml-1',
  'mr-1',
  '!p-3',
];

interface Navigation {
  id: string;
  label: string;
  landingHref: string;
  href: string;
}

const NAVIGATIONS: Navigation[] = [
  {
    id: 'about',
    label: 'About',
    landingHref: '#about',
    href: '/about',
  },
  {
    id: 'work',
    label: 'Work',
    landingHref: '#work',
    href: '/work',
  },
  {
    id: 'blog',
    label: 'Blog',
    landingHref: '#blog',
    href: '/blog',
  },
  {
    id: 'connect',
    label: 'Connect',
    landingHref: '#connect',
    href: '',
  },
];

export function Header() {
  const observedRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerContentRef = useRef<HTMLDivElement>(null);
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
      headerRef.current?.classList.add('top-0');
      headerContentRef.current?.classList.add(...STICKY_CLASSES_DWEB);
    } else {
      headerRef.current?.classList.add('bottom-0');
      headerRef.current?.classList.remove('top-0');
      headerContentRef.current?.classList.add(...STICKY_CLASSES_MWEB);
    }
  });

  const updateNonStickyHeader = debounce(() => {
    headerRef.current?.classList.remove('bottom-0');
    headerRef.current?.classList.add('top-0');
    headerContentRef.current?.classList.remove(...STICKY_CLASSES_DWEB);
    headerContentRef.current?.classList.remove(...STICKY_CLASSES_MWEB);
  });

  const shouldShowNavigation = (landingHref: string, href: string) => {
    if (location.pathname === '/') {
      return Boolean(landingHref);
    }
    return Boolean(href);
  };

  const handleClickNavigationItem = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, headingId: string) => {
    if (location.pathname !== '/') return;
    event.preventDefault();
    const element = document.querySelector(headingId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        className="container mx-auto lg:max-w-5xl md:left-1/2 md:-translate-x-1/2 fixed left-0 right-0 top-0 z-20"
        ref={headerRef}
      >
        <div
          className='
            flex items-center justify-between py-3 px-4
            after:opacity-90 after:w-full after:h-full after:absolute after:top-0 after:left-0 after:z-[-1]
          '
          ref={headerContentRef}
        >
          <Link onClick={(event) => handleClickNavigationItem(event, 'body')} to="/">
            <img
              alt="Site logo"
              className="rounded-md border-2 border-slate-100 dark:border-slate-700"
              src={logoPath}
              width="40"
            />
          </Link>
          <nav className="flex items-center">
            {NAVIGATIONS.map(({ id, label, landingHref, href }) => shouldShowNavigation(landingHref, href) && (
              <NavLink
                className="animated-link mr-3 md:mr-8 py-1 !font-medium text-sm"
                key={id}
                onClick={(event) => handleClickNavigationItem(event, landingHref)}
                to={location.pathname === '/' ? landingHref : href}
              >
                {label}
              </NavLink>
            ))}
            <ColorModeToggle isDark={isDark} onChange={toggleColorMode} />
          </nav>
        </div>
      </header>
    </>
  );
}
