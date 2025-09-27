import { ReactNode, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface HeroSectionProps
  extends Omit<React.HTMLProps<HTMLElement>, 'title'> {
  title?: ReactNode;
  titleClassName?: string;
  description?: ReactNode;
  descriptionClassName?: string;
}

export default function HeroSection({
  children,
  description,
  descriptionClassName,
  title,
  titleClassName,
}: HeroSectionProps) {
  const [isClientReady, setIsClientReady] = useState<boolean>(false);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  return (
    <section className="container mx-auto my-8 md:py-16 lg:max-w-3xl">
      <h1
        className={twMerge(
          'flex w-full items-center gap-2 text-left text-3xl font-extrabold leading-none tracking-tight text-black dark:text-slate-100 md:gap-4 md:text-5xl',
          '-translate-x-4 opacity-0 transition-all delay-100 duration-300 ease-out',
          isClientReady ? 'translate-x-0 opacity-100' : '',
          titleClassName,
        )}
      >
        {title}
      </h1>

      <div
        className={twMerge(
          'mt-2 w-full text-left text-sm font-light leading-normal tracking-tight text-slate-600 dark:text-slate-400 md:w-3/5 md:text-base',
          '-translate-x-4 opacity-0 transition-all delay-300 duration-300 ease-out',
          isClientReady ? 'translate-x-0 opacity-100' : '',
          descriptionClassName,
        )}
      >
        {description}
      </div>

      {children}
    </section>
  );
}
