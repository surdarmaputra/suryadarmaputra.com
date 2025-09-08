import { ReactNode } from 'react';

export interface HeroSectionProps
  extends Omit<React.HTMLProps<HTMLElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
}

export default function HeroSection({
  children,
  description,
  title,
}: HeroSectionProps) {
  return (
    <section className="container mx-auto my-8 md:py-16 lg:max-w-5xl">
      <h1 className="flex w-full items-center gap-2 text-left text-3xl font-extrabold leading-none tracking-tight text-black dark:text-slate-100 md:gap-4 md:text-5xl">
        {title}
      </h1>

      <div className="mt-2 w-full text-left text-sm font-light leading-normal tracking-tight text-slate-600 dark:text-slate-400 md:w-3/5 md:text-base">
        {description}
      </div>

      {children}
    </section>
  );
}
