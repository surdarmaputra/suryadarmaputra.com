import { ReactNode } from 'react';
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
  return (
    <section className="container mx-auto my-8 md:py-8 lg:max-w-3xl">
      <h1
        className={twMerge(
          'flex w-full items-center gap-2 text-left text-3xl leading-none font-extrabold tracking-tight text-black md:gap-4 md:text-5xl dark:text-slate-100',
          'animate-enter-from-left',
          titleClassName,
        )}
      >
        {title}
      </h1>

      <div
        className={twMerge(
          'mt-2 w-full text-left text-sm leading-normal font-light tracking-tight text-slate-600 md:w-3/5 md:text-base dark:text-slate-400',
          'animate-enter-from-left animate-delay-25',
          descriptionClassName,
        )}
      >
        {description}
      </div>

      {children}
    </section>
  );
}
