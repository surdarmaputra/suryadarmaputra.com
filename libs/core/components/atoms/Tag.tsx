import React, { ReactElement } from 'react';

export default function Tag({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>): ReactElement {
  return (
    <span
      className={`
        mb-2 mr-2 rounded-md bg-slate-100 px-2
        py-0.5 text-xs text-slate-500 dark:bg-slate-800
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}
