import { SmartLink } from '~/components/base/SmartLink';

const links = [
  { label: 'Home', href: '/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/surdarmaputra' },
  { label: 'GitHub', href: 'https://github.com/surdarmaputra' },
];

export default function Footer() {
  return (
    <footer className="text-center mt-18 md:mt-20 py-8">
      <span className="block text-slate-600 dark:text-slate-500 font-light text-sm mb-0.5">
        Surya Darma Putra
      </span>
      {links.map(({ label, href }) => (
        <SmartLink
          className="mr-3 last:mr-0 text-xs font-light text-slate-500 animated-link pb-1"
          href={href}
          key={href}
        >
          {label}
        </SmartLink>
      ))}
    </footer>
  );
}