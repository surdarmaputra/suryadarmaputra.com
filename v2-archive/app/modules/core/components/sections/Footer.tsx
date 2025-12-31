import { twMerge } from 'tailwind-merge';

import { SmartLink } from '~/modules/core/components/base/SmartLink';

export const links = [
  { label: 'Home', href: '/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/surdarmaputra' },
  { label: 'GitHub', href: 'https://github.com/surdarmaputra' },
];

export interface FooterProps {
  isLinksVisible?: boolean;
}

export function Footer({ isLinksVisible = true }: FooterProps) {
  return (
    <footer
      className={twMerge(
        'relative -mx-6 overflow-hidden pt-8 text-center md:mt-24',
        isLinksVisible ? 'h-48 md:h-40' : 'h-44 md:h-32',
      )}
    >
      <span className="mb-0.5 block text-sm font-light text-slate-600 dark:text-slate-400">
        Copyright &copy; 2024 Surya Darma Putra
      </span>
      {isLinksVisible &&
        links.map(({ label, href }) => (
          <SmartLink
            className="animated-link mr-3 pb-1 text-sm font-extralight text-slate-500 last:mr-0 dark:text-slate-400"
            href={href}
            key={href}
          >
            {label}
          </SmartLink>
        ))}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 text-center text-7xl font-extrabold tracking-tighter text-slate-300 opacity-40 dark:text-slate-800 leading-none -bottom-4"
      >
        Let&apos;s Build
      </div>
    </footer>
  );
}
