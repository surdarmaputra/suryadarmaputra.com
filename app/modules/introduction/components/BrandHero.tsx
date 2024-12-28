import HeroSection from '~/modules/core/components/base/HeroSection';

export function BrandHero() {
  return (
    <HeroSection
      description={
        <>
          A software engineer from Indonesia, building{' '}
          <span className='font-semibold'>websites</span>,{' '}
          <span className='font-semibold'>mobile apps</span>,{' '}
          <span className='font-semibold'>tools</span>,{' '}and{' '}
          <span className='font-semibold'>integrations</span>.
          Passionate about applying <span className='font-semibold'>pragmatic</span> solutions to tackle business challenges.

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
