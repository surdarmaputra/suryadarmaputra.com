import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

interface Navigation {
  id: string;
  label: string;
  landingHref: string;
  href: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  to?: string;
}

const NAVIGATION_ITEMS: Navigation[] = [
  {
    id: 'works',
    label: 'Works',
    landingHref: '#works',
    href: '/works',
  },
  {
    id: 'posts',
    label: 'Articles',
    landingHref: '#posts',
    href: '/posts',
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

export function useNavbar() {
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

  const navigationItems = NAVIGATION_ITEMS.filter((item) =>
    shouldShowNavigation(item.landingHref, item.href),
  ).map((item) => ({
    ...item,
    onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
      handleClickNavigationItem(event, item.landingHref),
    to: location.pathname === '/' ? item.landingHref : item.href,
  }));

  useEffect(() => {
    const isCurrentlyDark = !window.localStorage.theme
      ? true
      : window.localStorage.theme === 'dark';
    setIsDark(isCurrentlyDark);
  }, [setIsDark]);

  return {
    handleClickNavigationItem,
    isDark,
    logoPath,
    navigationItems,
    toggleColorMode,
  };
}
