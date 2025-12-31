import { ReactNode } from 'react';
import { SlRocket } from 'react-icons/sl';
import { twMerge } from 'tailwind-merge';

import { SmartLink } from '~/modules/core/components/base/SmartLink';
import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

interface HighlightCardProps {
  className?: string;
  thumbnailUrl?: string;
  icon?: ReactNode;
  title: string;
  description: string;
  href: string;
}

export function HighlightCard({
  className,
  thumbnailUrl,
  icon,
  title,
  description,
  href,
}: HighlightCardProps) {
  return (
    <div
      className={twMerge(
        'group relative z-20 cursor-pointer overflow-hidden rounded-md p-0.5 shadow-xl transition-shadow duration-200 hover:shadow-2xl dark:bg-slate-900',
        className,
      )}
    >
      <div className="animated-border-highlight absolute -z-10"></div>
      <SmartLink
        className="flex h-full items-center gap-3 rounded-md bg-white p-2 md:p-3 dark:bg-slate-950"
        href={href}
        style={{ textDecoration: 'none' }}
      >
        {thumbnailUrl ? (
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100 shadow-sm md:h-16 md:w-16 dark:border-slate-700 dark:bg-slate-800">
            <OptimizedImage
              alt={title}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              src={thumbnailUrl}
            />
          </div>
        ) : (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-amber-200 to-amber-400 text-3xl font-bold text-white md:h-16 md:w-16 dark:from-sky-950 dark:to-sky-900 dark:text-slate-400 [&_svg]:h-6 [&_svg]:w-6 [&_svg]:md:h-8 [&_svg]:md:w-8">
            {icon || <SlRocket />}
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <h3 className="mb-1 text-sm leading-snug font-semibold text-slate-900 transition-colors md:text-base dark:text-white">
            <span className="animated-link">{title}</span>
          </h3>
          <p className="line-clamp-3 text-xs leading-snug text-slate-600 md:text-sm dark:text-slate-300">
            {description}
          </p>
        </div>
      </SmartLink>
    </div>
  );
}
