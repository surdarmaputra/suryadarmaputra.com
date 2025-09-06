import { forwardRef, HTMLAttributes } from 'react';
import { SlArrowDownCircle, SlMagnifier } from 'react-icons/sl';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

import Button, {
  getButtonClassName,
} from '~/modules/core/components/base/Button/Button';
import { SmartLink } from '~/modules/core/components/base/SmartLink';
import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

export interface AboutMeShortSectionProps
  extends HTMLAttributes<HTMLDivElement> {
  isActionsVisible?: boolean;
  isTitleVisible?: boolean;
  onClickExploreMyWork?: () => void;
}

export const AboutMeShortSection = forwardRef<
  HTMLDivElement,
  AboutMeShortSectionProps
>(
  (
    { className, isActionsVisible, isTitleVisible, onClickExploreMyWork },
    ref,
  ) => {
    return (
      <section
        className={twMerge('container mx-auto lg:max-w-5xl', className)}
        id="about"
        ref={ref}
      >
        {isTitleVisible && (
          <h2 className="mb-8 inline-flex items-center gap-4 text-2xl font-extrabold text-slate-800 dark:text-slate-200">
            <div className="relative h-8 w-8 rounded-full bg-amber-500 dark:bg-slate-800">
              <SlMagnifier className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2" />
            </div>
            Who am I?
          </h2>
        )}

        <div className="flex gap-16">
          <div>
            <div className="mb-4 flex items-center gap-4 text-xs font-light leading-6 md:text-sm">
              <p>
                Hi, I&apos;m <span className="font-semibold">Surya</span>, a
                software engineer with expertise in{' '}
                <span className="font-semibold">TypeScript</span> and{' '}
                <span className="font-semibold">React.js</span>. Currently
                working at{' '}
                <SmartLink
                  className="animated-underline"
                  href="https://www.gotocompany.com/en/products/goto-financial"
                >
                  GoTo Financial - Merchant Lending
                </SmartLink>{' '}
                team as a <span className="font-semibold">Frontend Lead</span>.
              </p>
              <div className="w-2/5 shrink-0 md:hidden">
                <OptimizedImage
                  alt="me"
                  className="rounded-full"
                  src="/images/me.png"
                  width={150}
                />
              </div>
            </div>

            <p className="mb-4 text-xs font-light leading-6 md:text-sm">
              Beyond web apps, I develop mobile apps, developer tools, set up
              infrastructure and CI/CD, and integrate APIs like Notion or
              ChatGPT. Any challenge software engineering can solve, I’m on it.
            </p>

            <p className="mb-4 text-xs font-light leading-6 md:text-sm">
              I believe in <span className="font-semibold">pragmatic</span>{' '}
              problem-solving, not being tied to specific tools or languages. My
              mission is to help businesses{' '}
              <span className="font-semibold">grow</span> and operate{' '}
              <span className="font-semibold">efficiently</span>.
            </p>
          </div>
          <div className="hidden w-1/3 shrink-0 md:block">
            <OptimizedImage
              alt="me"
              className="-mt-24 rounded-full"
              src="/images/me.png"
              width={240}
            />
          </div>
        </div>

        {isActionsVisible && (
          <div className="mt-2 inline-flex flex-col gap-3">
            <Link
              aria-label="More About Me"
              className={getButtonClassName({
                color: 'secondary',
                variant: 'outlined',
              })}
              prefetch="intent"
              to="/about"
              viewTransition
            >
              More About Me...
            </Link>
            <Button
              aria-label="Explore My Work"
              color="primary"
              onClick={onClickExploreMyWork}
              variant="filled"
            >
              Explore My Work
              <SlArrowDownCircle className="h-4 w-4 animate-bounce" />
            </Button>
          </div>
        )}
      </section>
    );
  },
);

AboutMeShortSection.displayName = 'AboutMeShortSection';
