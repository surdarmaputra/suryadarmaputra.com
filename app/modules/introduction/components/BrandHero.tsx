import { twMerge } from 'tailwind-merge';

import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

interface BrandHeroProps {
  className?: string;
}

export function BrandHero({ className }: BrandHeroProps) {
  return (
    <section
      className={twMerge(
        'flex w-full items-center justify-between gap-4 text-center md:flex-col-reverse',
        className,
      )}
    >
      <div className="flex w-2/3 flex-col gap-2 text-left md:text-center">
        <h1 className="text-xl leading-6 font-bold tracking-tight text-black md:text-5xl md:leading-11 md:font-extrabold dark:text-slate-100">
          Surya Darma Putra
        </h1>
        <p className="w-full text-sm font-light text-slate-600 md:text-base dark:text-slate-400">
          Software engineer building websites and mobile apps.
        </p>
      </div>
      <div className="shrink-0">
        <OptimizedImage
          alt="me"
          className="h-20 w-20 rounded-full object-cover"
          height={80}
          src="/images/me.jpeg"
          width={80}
        />
      </div>
    </section>
  );
}
