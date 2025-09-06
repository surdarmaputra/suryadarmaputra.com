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
      <div className="flex flex-col gap-2 text-left md:text-center">
        <h1 className="text-xl font-bold leading-6 tracking-tight text-black dark:text-slate-100 md:text-5xl md:font-extrabold">
          Surya Darma Putra
        </h1>
        <p className="w-full text-sm font-light text-slate-600 dark:text-slate-400 md:text-base">
          Software Engineer - Frontend, Fullstack, TypeScript, React, Tailwind.
          Explore my works below.
        </p>
      </div>
      <div className="shrink-0">
        <OptimizedImage
          alt="me"
          className="rounded-full"
          src="/images/me.png"
          width={80}
        />
      </div>
    </section>
  );
}
