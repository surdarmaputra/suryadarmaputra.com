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
    <section className="mt-20 mb-28 text-center md:mb-32">
      <div className="absolute left-0 top-96 -z-10 h-72 w-72 rounded-full bg-blue-500 opacity-10 blur-3xl dark:bg-blue-700"></div>
      <div className="absolute right-0 top-24 -z-10 h-72 w-72 rounded-full bg-amber-500 opacity-10 blur-3xl dark:bg-amber-800"></div>

      <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tighter text-black dark:text-slate-100">
        {title}
      </h1>

      <p className="mx-auto mb-6 w-2/3 font-light text-slate-500">
        {description}
      </p>

      {children}
    </section>
  );
}
