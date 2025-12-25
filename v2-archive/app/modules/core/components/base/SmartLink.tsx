import { Link } from 'react-router';

export function SmartLink({
  children,
  className,
  href,
  target,
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) return null;

  if (href?.includes('http')) {
    return (
      <a className={className} href={href} target={target}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} prefetch="viewport" to={href} viewTransition>
      {children}
    </Link>
  );
}
