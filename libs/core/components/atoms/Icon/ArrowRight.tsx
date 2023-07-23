import { HTMLAttributes, ReactElement } from 'react';

export function ArrowRight({
  className,
}: HTMLAttributes<SVGAElement>): ReactElement {
  return (
    <svg
      className={`h-6 w-6 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 8l4 4m0 0l-4 4m4-4H3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
