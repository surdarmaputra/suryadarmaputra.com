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

export function Footer({
  isLinksVisible = true,
}: FooterProps) {
  return (
    <footer
      className={twMerge(
        'pt-8 -mx-6  text-center relative overflow-hidden',
        isLinksVisible ? 'h-48 md:h-40' : 'h-44 md:h-32',
      )}
    >
      <span className="mb-0.5 block text-xs font-light text-slate-600 dark:text-slate-400">
        Copyright &copy; 2024 Surya Darma Putra
      </span>
      {isLinksVisible && links.map(({ label, href }) => (
        <SmartLink
          className="animated-link mr-3 pb-1 text-xs font-extralight text-slate-500 dark:text-slate-400 last:mr-0"
          href={href}
          key={href}
        >
          {label}
        </SmartLink>
      ))}
      <div className='absolute bottom-8 md:-bottom-4 left-0 right-0 text-center font-extrabold text-7xl tracking-tighter text-slate-300 dark:text-slate-800 opacity-40'>
        Let&apos;s Build
      </div>
    </footer>
  );
}
