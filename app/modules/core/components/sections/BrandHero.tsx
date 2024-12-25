import HeroSection from '../base/HeroSection';

export function BrandHero() {
  return (
    <HeroSection
      description={
        <>
          Software engineer based in Indonesia, building websites, mobile apps, and developer tools.

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
