import dayjs from 'dayjs';
import { useMemo } from 'react';

interface PostMetaDataProps {
  className?: string;
  date?: Date;
}

export function PostMetaData({ className = '', date }: PostMetaDataProps) {
  const formattedDate = useMemo(
    () => (date ? dayjs(date).format('MMM D, YYYY') : null),
    [date],
  );

  if (!formattedDate) {
    return null;
  }

  return (
    <small className={`block text-slate-400 dark:text-slate-500 ${className}`}>
      <span className="mr-4 inline-block">{formattedDate}</span>
    </small>
  );
}
