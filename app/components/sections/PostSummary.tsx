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
    <div className="md:p-8 md:basis-1/2 p-0 pb-16">
      <a href={href}>
        <small className="block text-slate-400 dark:text-slate-500">
          <span className="mr-4 inline-block">{formattedDate}</span>
          <span>{minutesToRead} mins read</span>
        </small>
        <div className="mt-2 mb-4">
          <h2 className="inline text-2xl text-black dark:text-slate-200 font-semibold animated-underline">
            {title}
          </h2>
        </div>
        <p className="block mb-4 text-slate-600 dark:text-slate-400 font-light text-sm leading-6">
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
    </div>
  );
}
