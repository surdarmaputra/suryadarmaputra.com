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
    <section className="my-8 md:py-16">
      <h1 className="mx-auto flex items-center gap-2 text-left text-3xl font-extrabold leading-none tracking-tight text-black dark:text-slate-100 md:w-1/3 md:text-center md:text-5xl">
        {title}
      </h1>

      <p className="mx-auto mt-2 w-full text-left text-sm font-light leading-normal tracking-tight text-slate-600 dark:text-slate-400 md:w-3/5 md:text-center md:text-base">
        {description}
      </p>

      {children}
    </section>
  );
}
