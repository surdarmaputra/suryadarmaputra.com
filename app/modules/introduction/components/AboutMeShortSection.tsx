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
        className={twMerge('container mx-auto lg:max-w-3xl', className)}
        id="about"
        ref={ref}
      >
        {isTitleVisible && (
          <h2 className="mb-8 inline-flex items-center gap-4 text-2xl font-extrabold text-slate-800 dark:text-slate-200">
            <div className="relative h-8 w-8 rounded-full bg-amber-500 dark:bg-slate-800">
              <SlMagnifier className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2" />
            </div>
            Who am I?
          </h2>
        )}

        <div className="flex items-center gap-16">
          <div>
            <div className="mb-4 flex items-center gap-4 text-sm leading-6 font-light md:text-base">
              <p>
                Hi, I&apos;m <span className="font-semibold">Surya</span>, a
                software engineer with expertise in{' '}
                <span className="font-semibold">web development</span>.
                Currently at{' '}
                <SmartLink
                  className="animated-underline"
                  href="https://www.gotocompany.com/en/products/goto-financial"
                  target="_blank"
                >
                  GoTo Financial
                </SmartLink>
                , I build products for Lending Team, aiming to provide the best
                financing solutions for customers and merchants.
              </p>
              <div className="w-2/5 shrink-0 md:hidden">
                <OptimizedImage
                  alt="me"
                  className="h-36 w-36 rounded-full object-cover"
                  src="/images/me.jpeg"
                  width={144}
                />
              </div>
            </div>

            <p className="mb-4 text-sm leading-6 font-light md:text-base">
              I prioritize{' '}
              <span className="font-semibold">customer&apos;s perspective</span>
              , <span className="font-semibold">pragmatism</span>, and{' '}
              <span className="font-semibold">compliance</span> when building
              products.
            </p>
          </div>
          <div className="hidden w-fit shrink-0 md:block">
            <OptimizedImage
              alt="me"
              className="ml-auto h-48 w-48 rounded-full object-cover"
              src="/images/me.jpeg"
              width={192}
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
              prefetch="viewport"
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
