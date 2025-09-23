import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

interface BrandHeroProps {
  className?: string;
}

export function BrandHero({ className }: BrandHeroProps) {
  const [isClientReady, setIsClientReady] = useState<boolean>(false);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  return (
    <section
      className={twMerge(
        'flex w-full items-center justify-between gap-4 text-center md:flex-col-reverse',
        className,
      )}
    >
      <div
        className={twMerge(
          'flex -translate-x-full flex-col gap-2 text-left opacity-0 transition-all duration-300 ease-out md:translate-x-0 md:translate-y-10 md:text-center',
          isClientReady ? 'translate-x-0 opacity-100 md:translate-y-0' : '',
        )}
      >
        <h1 className="text-xl font-bold leading-6 tracking-tight text-black dark:text-slate-100 md:text-5xl md:font-extrabold">
          Surya Darma Putra
        </h1>
        <p className="w-full text-sm font-light text-slate-600 dark:text-slate-400 md:text-base">
          Software Engineer / Web / Mobile. Explore my works below.
        </p>
      </div>
      <div
        className={twMerge(
          'shrink-0 translate-x-full opacity-0 transition-all duration-300 ease-out md:-translate-y-full md:translate-x-0',
          isClientReady ? 'translate-x-0 opacity-100 md:translate-y-0' : '',
        )}
      >
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
