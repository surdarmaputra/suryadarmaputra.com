import dayjs from 'dayjs';
import { useMemo } from 'react';

interface PostMetaDataProps {
  className?: string;
  date?: Date;
  readingTime?: string;
}

export function PostMetaData({
  className = '',
  date,
  readingTime,
}: PostMetaDataProps) {
  const formattedDate = useMemo(
    () => (date ? dayjs(date).format('MMM D, YYYY') : null),
    [date],
  );

  if (!formattedDate && !readingTime) {
    return null;
  }

  const items = [formattedDate, readingTime].filter(Boolean);

  return (
    <small
      className={`container mx-auto lg:max-w-5xl block text-2xs font-light tracking-tight text-slate-400 dark:text-slate-600 md:text-xs ${className}`}
    >
      {items.map((item, index) => (
        <span className="mr-4 inline-block" key={index}>
          {item}
        </span>
      ))}
    </small>
  );
}
