import React, { ReactElement } from 'react';

export default function Tag({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>): ReactElement {
  return (
    <span
      className={`
        px-2 py-0.5 mr-2 mb-2 rounded-md
        bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}
