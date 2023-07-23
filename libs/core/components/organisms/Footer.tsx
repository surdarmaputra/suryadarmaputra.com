import { SmartLink } from '../atoms/SmartLink';

export const links = [
  { label: 'Home', href: '/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/surdarmaputra' },
  { label: 'GitHub', href: 'https://github.com/surdarmaputra' },
];

export function Footer() {
  return (
    <footer className="mt-20 py-8 text-center md:mt-36">
      <span className="mb-0.5 block text-sm font-light text-slate-600 dark:text-slate-500">
        Surya Darma Putra
      </span>
      {links.map(({ label, href }) => (
        <SmartLink
          className="animated-link mr-3 pb-1 text-xs font-light text-slate-500 last:mr-0"
          href={href}
          key={href}
        >
          {label}
        </SmartLink>
      ))}
    </footer>
  );
}
