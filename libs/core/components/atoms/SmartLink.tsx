import Link from 'next/link';
import { ReactElement } from 'react';

export function SmartLink({
  children,
  className,
  href,
}: React.AnchorHTMLAttributes<HTMLAnchorElement>): ReactElement | null {
  if (!href) return null;

  if (href?.includes('http')) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}
