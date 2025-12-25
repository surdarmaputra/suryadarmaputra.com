import { useEffect, useRef, useState } from 'react';
import { SlArrowUp, SlMenu } from 'react-icons/sl';
import { NavLink, useLocation } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { useNavbar } from '../../hooks/use-navbar';
import Button from './Button/Button';

export function FloatingNavigation() {
  const floatingButtonRef = useRef<HTMLDivElement | null>(null);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const location = useLocation();
  const { handleClickNavigationItem, navigationItems } = useNavbar();
  const navItemClassName = twMerge(
    'animated-link cursor-pointer my-2 ml-6 mr-6 py-1 pl-4 text-right text-sm font-light text-slate-500 dark:text-slate-400 md:ml-10 md:text-lg',
    location.pathname === '/' ? 'font-light!' : '',
  );

  const toggleMenu = () =>
    setIsMenuVisible((currentlyVisible) => !currentlyVisible);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Hide menu on scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (floatingButtonRef.current) {
        if (window.scrollY > 0) {
          floatingButtonRef.current.classList.remove('translate-x-[150%]');
        } else {
          floatingButtonRef.current.classList.add('translate-x-[150%]');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Click outside detection
  useEffect(() => {
    if (!isMenuVisible) return;

    function handleClickOutside(event: MouseEvent) {
      const menuNode = menuContainerRef.current;
      if (menuNode && !menuNode.contains(event.target as Node)) {
        setIsMenuVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [isMenuVisible]);

  return (
    <div
      className="fixed right-4 bottom-4 z-30 translate-x-[150%] transition-transform"
      ref={floatingButtonRef}
    >
      <div className="relative flex gap-2" ref={menuContainerRef}>
        <div
          className={twMerge(
            'absolute -top-2 right-0 h-0 w-0 -translate-y-full overflow-hidden rounded-md border-slate-100 bg-white shadow-lg transition-all ease-in-out dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300',
            isMenuVisible && 'h-max w-max border py-2',
          )}
        >
          <nav className="flex flex-col items-end">
            {location.pathname !== '/' && (
              <NavLink
                className={navItemClassName}
                prefetch="viewport"
                to="/"
                viewTransition
              >
                Home
              </NavLink>
            )}
            {navigationItems.map(({ id, label, landingHref, to }) => (
              <NavLink
                className={navItemClassName}
                key={id}
                onClick={(event) =>
                  handleClickNavigationItem(event, landingHref)
                }
                prefetch="viewport"
                to={to}
                viewTransition
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        <Button
          aria-label="Floating Scroll to Top"
          className="h-12 w-12 border border-slate-100 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          color="primary"
          onClick={scrollToTop}
          variant="filled"
        >
          <SlArrowUp className="h-4 w-4" size={16} />
        </Button>
        <Button
          aria-label="Floating Navigation"
          className="h-12 w-12 border border-slate-100 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          color="primary"
          onClick={toggleMenu}
          variant="filled"
        >
          <SlMenu className="h-4 w-4" size={16} />
        </Button>
      </div>
    </div>
  );
}
