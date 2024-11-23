import { Link } from '@remix-run/react';

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
    <Link className={className} to={href}>
      {children}
    </Link>
  );
}
