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
      <div className="animate-enter-from-left md:animate-enter-from-bottom flex w-2/3 flex-col gap-2 text-left opacity-0 md:text-center">
        <h1 className="text-xl leading-6 font-bold tracking-tight text-black md:text-5xl md:leading-11 md:font-extrabold dark:text-slate-100">
          Surya Darma Putra
        </h1>
        <p className="w-full text-sm font-light text-slate-600 md:text-base dark:text-slate-400">
          Software Engineer / Web / Mobile. Explore my works below.
        </p>
      </div>
      <div
        className={twMerge(
          'shrink-0 translate-x-full opacity-0 transition-all duration-300 ease-out md:translate-x-0 md:-translate-y-full',
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
