import HeroSection from '../base/HeroSection';

export function BrandHero() {
  return (
    <HeroSection
      description={
        <>
          Indonesian software engineer building websites, mobile apps, and boosting team productivity.

          {/* <SmartLink
            className="animated-underline text-slate-800 dark:text-slate-400"
            href="/about"
          >
            More about me...
          </SmartLink> */}

        </>
      }
      title={
        <>
          <span className="block">Surya</span>{' '}
          <span className="block">Darma</span>{' '}
          <span className="block">Putra</span>{' '}
        </>
      }
    />
  );
}
