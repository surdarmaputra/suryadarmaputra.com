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
      <h1 className="text-left md:text-center text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-black dark:text-slate-100 md:w-1/3 mx-auto">
        {title}
      </h1>

      <p className="text-left md:text-center w-full font-light text-xs md:text-sm md:mt-2 tracking-tight leading-normal text-slate-600 dark:text-slate-400 md:w-3/5 mx-auto">
        {description}
      </p>

      {children}
    </section>
  );
}
