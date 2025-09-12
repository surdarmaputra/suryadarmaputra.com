import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';

import { ColorModeToggle } from '~/modules/core/components/base/ColorModeToggle';
import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

interface Navigation {
  id: string;
  label: string;
  landingHref: string;
  href: string;
}

const NAVIGATIONS: Navigation[] = [
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
  {
    id: 'about',
    label: 'About',
    landingHref: '/about',
    href: '/about',
  },
];

export function Header() {
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

  const shouldShowNavigation = (landingHref: string, href: string) => {
    if (location.pathname === '/') {
      return Boolean(landingHref);
    }
    return Boolean(href);
  };

  const handleClickNavigationItem = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    headingId: string,
  ) => {
    if (location.pathname !== '/' || !headingId.startsWith('#')) return;
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

  return (
    <>
      <header className="container mx-auto lg:max-w-5xl flex items-center justify-between py-3 mb-4">
        <Link
          onClick={(event) => handleClickNavigationItem(event, 'body')}
          prefetch="viewport"
          to="/"
          viewTransition
        >
          <OptimizedImage
            alt="Site logo"
            className="rounded-md border-2 border-slate-100 dark:border-slate-700"
            src={logoPath}
            width={36}
          />
        </Link>
        <nav className="flex items-center">
          {NAVIGATIONS.map(
            ({ id, label, landingHref, href }) =>
              shouldShowNavigation(landingHref, href) && (
                <NavLink
                  className="animated-link mr-3 py-1 text-sm !font-light text-slate-500 dark:text-slate-400 md:mr-8"
                  key={id}
                  onClick={(event) =>
                    handleClickNavigationItem(event, landingHref)
                  }
                  prefetch="viewport"
                  to={location.pathname === '/' ? landingHref : href}
                  viewTransition
                >
                  {label}
                </NavLink>
              ),
          )}
          <ColorModeToggle isDark={isDark} onChange={toggleColorMode} />
        </nav>
      </header>
    </>
  );
}
