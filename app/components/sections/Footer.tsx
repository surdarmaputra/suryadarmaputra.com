import { SmartLink } from '~/components/base/SmartLink';

const links = [
  { label: 'Home', href: '/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/surdarmaputra' },
  { label: 'GitHub', href: 'https://github.com/surdarmaputra' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center mt-20 py-8">
      <span className="block text-slate-600 dark:text-slate-500 font-light text-sm mb-0.5">
        &copy; {currentYear}. Surya Darma Putra.
      </span>
      {links.map(({ label, href }) => (
        <SmartLink
          className="mr-3 last:mr-0 text-xs font-light text-slate-400 dark:text-slate-600 hover:underline"
          href={href}
          key={href}
        >
          {label}
        </SmartLink>
      ))}
    </footer>
  );
}
