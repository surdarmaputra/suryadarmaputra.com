import dayjs from 'dayjs';
import type { Key } from 'react';
import { useMemo } from 'react';

interface PostSummaryProps {
  date: Date;
  excerpt: string;
  href: string;
  minutesToRead: number;
  tags?: Array<string>;
  title: string;
}

export default function PostSummary({
  date,
  excerpt,
  href,
  minutesToRead,
  tags,
  title,
}: PostSummaryProps) {
  const formattedDate = useMemo(
    () => dayjs(date).format('MMM D, YYYY'),
    [date],
  );

  return (
    <a className="mb-4" href={href}>
      <small className="text-slate-400 dark:text-slate-500">
        <span className="mr-4 inline-block">{formattedDate}</span>
        <span>{minutesToRead} mins read</span>
      </small>
      <h2 className="text-2xl text-black dark:text-slate-200 font-semibold mb-2 hover:underline transition-all">
        {title}
      </h2>
      <p className="mb-4 text-slate-600 dark:text-slate-400 font-light text-sm leading-6">
        {excerpt}
      </p>
      {tags?.map((tag) => (
        <span
          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs"
          key={tag as Key}
        >
          {tag}
        </span>
      ))}
    </a>
  );
}
