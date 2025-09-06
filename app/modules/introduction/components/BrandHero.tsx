import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

export function BrandHero() {
  return (
    <section className="my-4 flex w-full items-center justify-between gap-4 text-center md:my-12 md:flex-col-reverse">
      <div className="flex flex-col gap-2 text-left md:text-center">
        <h1 className="text-xl font-bold leading-6 tracking-tight text-black dark:text-slate-100 md:text-5xl md:font-extrabold">
          Surya Darma Putra
        </h1>
        <p className="w-full text-xs font-light text-slate-600 dark:text-slate-400">
          Software Engineer - Front End, Fullstack, TypeScript, React, Tailwind.
          Explore my works below.
        </p>
      </div>
      <div className="shrink-0">
        <OptimizedImage
          alt="me"
          className="rounded-full"
          src="/images/me.png"
          width={80}
        />
      </div>
    </section>
  );
}
