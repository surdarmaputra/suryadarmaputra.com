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
    <section className="mb-32 mt-24 text-center md:mb-32">
      <h1 className="mb-6 text-left md:text-center text-[84px] font-extrabold leading-[0.9] tracking-tight text-black dark:text-slate-100 md:w-1/3 mx-auto">
        {title}
      </h1>

      <p className="text-left md:text-center mb-6 w-full font-light text-slate-500 md:w-3/5 mx-auto">
        {description}
      </p>

      {children}
    </section>
  );
}
