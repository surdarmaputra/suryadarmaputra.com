import { forwardRef, HTMLAttributes } from 'react';
import { SlArrowDownCircle, SlMagnifier } from 'react-icons/sl';
import { Link } from 'react-router';

import Button from '~/modules/core/components/base/Button/Button';
import { SmartLink } from '~/modules/core/components/base/SmartLink';
import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

export interface AboutMeShortSectionProps extends HTMLAttributes<HTMLDivElement> {
  onClickExploreMyWork?: () => void;
}

export const AboutMeShortSection = forwardRef<HTMLDivElement, AboutMeShortSectionProps>(({ className, onClickExploreMyWork }, ref) => {
  return (
    <section className={className} id="about" ref={ref}>
      <h2 className="inline-flex items-center gap-4 mb-8 text-2xl font-extrabold text-slate-800 dark:text-slate-200">
        <div className='relative w-8 h-8 rounded-full bg-amber-500 dark:bg-slate-800'>
          <SlMagnifier className='w-10 h-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
        </div>
        Who am I?
      </h2>

      <div className="flex gap-16">
        <div>
          <div className='flex gap-4 items-center mb-4 font-light text-sm leading-6'>
            <p>
              Hi, you can call me <span className='font-semibold'>Surya</span> or <span className='font-semibold'>Brosur</span>,{' '}
              a software engineer <span className='font-semibold'>specializing in web development</span>{' '}
              with expertise in <span className='font-semibold'>TypeScript</span> and <span className='font-semibold'>React.js</span>.
            </p>
            <div className="shrink-0 w-2/5 md:hidden">
              <OptimizedImage alt="me" className='rounded-full' src="/images/me.png" />
            </div>
          </div>

          <p className='font-light mb-4 text-sm leading-6'>
            I’m currently working at{' '}
            <SmartLink className='animated-underline' href="https://www.gotocompany.com/en/products/goto-financial">
              GoTo Financial - Merchant Lending
            </SmartLink>{' '}
            team as a <span className='font-semibold'>Front End Lead</span>.
          </p>

          <p className='font-light mb-4 text-sm leading-6'>
            Beyond web apps, I develop mobile apps, set up infrastructure and CI/CD, create developer tools, and integrate APIs like Notion or ChatGPT.
            If it’s a challenge software engineering can solve, I’m on it.
          </p>

          <p className='font-light mb-4 text-sm leading-6'>
            I believe in <span className='font-semibold'>pragmatic</span> problem-solving—finding the best solutions without being tied to specific tools or languages.
            My mission is to help businesses <span className='font-semibold'>grow</span>,{' '}
            operate <span className='font-semibold'>efficiently</span>,{' '}
            and achieve <span className='font-semibold'>profitability</span>.
          </p>
        </div>
        <div className="shrink-0 w-1/3 hidden md:block">
          <OptimizedImage alt="me" className='-mt-24 rounded-full' src="/images/me.png" />
        </div>
      </div>

      <div className="inline-flex flex-col gap-3 mt-2">
        <Link to="/about">
          <Button
            aria-label='More About Me'
            color='secondary'
            variant='outlined'
          >
          More About Me...
          </Button>
        </Link>
        <Button
          aria-label="Explore My Works"
          color='primary'
          onClick={onClickExploreMyWork}
          variant='filled'
        >
          Explore My Works
          <SlArrowDownCircle className='w-5 h-5' />
        </Button>
      </div>
    </section>
  );
});

AboutMeShortSection.displayName = 'AboutMeShortSection';