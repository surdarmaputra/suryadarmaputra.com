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
      className={`container mx-auto block text-xs font-light tracking-tight text-slate-500 dark:text-slate-600 md:text-sm lg:max-w-3xl ${className}`}
    >
      {items.map((item, index) => (
        <span className="mr-4 inline-block" key={index}>
          {item}
        </span>
      ))}
    </small>
  );
}
