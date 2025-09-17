import { Link, NavLink } from 'react-router';

import { ColorModeToggle } from '~/modules/core/components/base/ColorModeToggle';
import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

import { useNavbar } from '../../hooks/use-navbar';

export function Header() {
  const {
    handleClickNavigationItem,
    isDark,
    logoPath,
    navigationItems,
    toggleColorMode,
  } = useNavbar();

  return (
    <>
      <header className="container mx-auto mb-4 flex items-center justify-between py-3 lg:max-w-5xl">
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
          {navigationItems.map(({ id, label, landingHref, to }) => (
            <NavLink
              className="animated-link mr-3 py-1 text-sm !font-light text-slate-500 dark:text-slate-400 md:mr-8"
              key={id}
              onClick={(event) => handleClickNavigationItem(event, landingHref)}
              prefetch="viewport"
              to={to}
              viewTransition
            >
              {label}
            </NavLink>
          ))}
          <ColorModeToggle isDark={isDark} onChange={toggleColorMode} />
        </nav>
      </header>
    </>
  );
}
