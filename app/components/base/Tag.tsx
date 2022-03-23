import React from 'react';

export function Tag({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
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

interface TagsProps {
  tags?: string[];
  className?: string;
}

export function Tags({ className = '', tags = [] }: TagsProps) {
  if (!Array.isArray(tags) || !tags.length) return null;

  return (
    <div className={`flex flex-wrap ${className}`}>
      {tags?.map((tag) => (
        <Tag key={tag as React.Key}>{tag}</Tag>
      ))}
    </div>
  );
}
