import { HTMLAttributes, ReactElement } from 'react';

export function ArrowLeft({
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
        d="M7 16l-4-4m0 0l4-4m-4 4h18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
