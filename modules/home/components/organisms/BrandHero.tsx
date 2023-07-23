import { SmartLink } from '@/libs/core/components/atoms/SmartLink';
import HeroSection from '@/libs/core/components/molecules/HeroSection';

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
      title={<span>Surya Darma Putra.</span>}
    />
  );
}
