import { ReactElement } from 'react';

export interface HeroSectionProps
  extends Omit<React.HTMLProps<HTMLElement>, 'title'> {
  title?: ReactElement;
  description?: ReactElement;
}

export default function HeroSection({
  children,
  description,
  title,
}: HeroSectionProps): ReactElement {
  return (
    <section className="mt-20 mb-28 text-center md:mb-32">
      <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tighter text-black dark:text-slate-100">
        {title}
      </h1>

      <p className="mx-auto mb-6 w-5/6 font-light text-slate-500 md:w-2/3">
        {description}
      </p>

      {children}
    </section>
  );
}
