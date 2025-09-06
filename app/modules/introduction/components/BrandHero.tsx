import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

export function BrandHero() {
  return (
    <section className="my-4 text-center md:my-12 flex gap-4 items-center justify-between w-full md:flex-col-reverse">
      <div className="flex flex-col gap-2 md:text-center text-left">
        <h1 className="text-xl md:text-5xl md:font-extrabold font-bold leading-6 tracking-tight text-black dark:text-slate-100">
          Surya Darma Putra
        </h1>
        <p className="w-full font-light text-slate-600 dark:text-slate-400 text-xs">
          Software Engineer - Front End, Fullstack, TypeScript, React, Tailwind. Explore my works below.
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
