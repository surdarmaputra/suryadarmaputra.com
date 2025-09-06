import { Link } from 'react-router';

export function SmartLink({
  children,
  className,
  href,
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) return null;

  if (href?.includes('http')) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} prefetch="intent" to={href} viewTransition>
      {children}
    </Link>
  );
}
