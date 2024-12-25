import HeroSection from '../base/HeroSection';
import { SmartLink } from '../base/SmartLink';

export function BrandHero() {
  return (
    <HeroSection
      description={
        <>
          I do web development for many years, joining development teams in tech
          companies to build various products. I love building delightful
          interfaces.{' '}
          <SmartLink
            className="animated-underline text-slate-800 dark:text-slate-400"
            href="/about"
          >
            More about me...
          </SmartLink>
        </>
      }
      title={
        <>
          <span className="block md:inline">👋 Hello,</span>{' '}
          <span>I&apos;m Surya</span>
        </>
      }
    />
  );
}
