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
    <small className={`block text-slate-400 ${className}`}>
      {items.map((item, index) => (
        <span className="mr-4 inline-block" key={index}>
          {item}
        </span>
      ))}
    </small>
  );
}
