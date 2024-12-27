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
    <footer className="mt-10 py-8 text-center md:mt-36">
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
    </footer>
  );
}
