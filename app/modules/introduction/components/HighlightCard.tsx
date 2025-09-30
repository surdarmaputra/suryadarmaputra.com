import { ReactNode } from 'react';
import { SlRocket } from 'react-icons/sl';

import { SmartLink } from '~/modules/core/components/base/SmartLink';
import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

interface HighlightCardProps {
  thumbnailUrl?: string;
  icon?: ReactNode;
  title: string;
  description: string;
  href: string;
}

export function HighlightCard({
  thumbnailUrl,
  icon,
  title,
  description,
  href,
}: HighlightCardProps) {
  return (
    <div className="relative overflow-hidden rounded-md p-0.5">
      <div className="animated-border-highlight absolute -z-10 h-full w-full"></div>
      <SmartLink
        className="group flex cursor-pointer items-center gap-3 rounded-md border border-slate-100 bg-white p-2 shadow-xl transition-shadow duration-200 hover:border-amber-400 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-amber-500 md:gap-5 md:p-4"
        href={href}
        style={{ textDecoration: 'none' }}
      >
        {thumbnailUrl ? (
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-700 dark:bg-slate-800 md:h-24 md:w-24">
            <OptimizedImage
              alt={title}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              src={thumbnailUrl}
            />
          </div>
        ) : (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-amber-200 to-amber-400 text-3xl font-bold text-white dark:from-amber-900 dark:to-amber-700 md:h-24 md:w-24 [&_svg]:h-6 [&_svg]:w-6 [&_svg]:md:h-16 [&_svg]:md:w-16">
            {icon || <SlRocket />}
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <h3 className="mb-1 text-sm font-semibold text-slate-900 transition-colors group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400 md:text-xl">
            <span className="animated-link">{title}</span>
          </h3>
          <p className="line-clamp-3 text-sm leading-snug text-slate-600 dark:text-slate-300 md:text-base">
            {description}
          </p>
        </div>
      </SmartLink>
    </div>
  );
}
