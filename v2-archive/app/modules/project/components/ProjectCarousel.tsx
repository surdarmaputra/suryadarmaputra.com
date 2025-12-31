import { forwardRef } from 'react';
import { SlArrowRightCircle, SlRocket } from 'react-icons/sl';
import { twMerge } from 'tailwind-merge';

import { MultipleItemsCarousel } from '~/modules/core/components/base/Carousel/MultipleItemsCarousel';
import { SmartLink } from '~/modules/core/components/base/SmartLink';
import { Project } from '~/modules/project/types';

import { ProjectCard } from './ProjectCard';

interface ProjectCarouselProps {
  className?: string;
  isTitleVisible?: boolean;
  projects: Project[];
}

export const ProjectCarousel = forwardRef<HTMLDivElement, ProjectCarouselProps>(
  ({ className, isTitleVisible, projects }, ref) => {
    if (!projects?.length) return null;

    const finalProjects =
      projects.length <= 5 ? [...projects, ...projects, ...projects] : projects;

    return (
      <section
        className={twMerge(
          'group/project-carousel -mx-6 flex flex-col md:gap-6',
          'animate-enter-from-right',
          className,
        )}
        id="works"
        ref={ref}
      >
        {isTitleVisible && (
          <>
            <h2 className="container mx-auto mb-2 inline-flex w-full items-center gap-2 px-6 text-xl font-semibold text-slate-800 md:max-w-3xl md:justify-center md:text-4xl dark:text-slate-200">
              <div className="relative h-3 w-3 rounded-full bg-amber-500 md:h-6 md:w-6 dark:bg-slate-800">
                <SlRocket className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 md:h-8 md:w-8" />
              </div>
              <div>Works</div>
            </h2>
            <p className="container mx-auto mb-3 px-6 text-sm text-slate-600 md:-mt-2 md:max-w-2xl md:text-center md:text-base dark:text-slate-400">
              I&apos;ve shipped many products to support various businesses. In
              spare time, I built my own stuff, too.
            </p>
          </>
        )}
        <MultipleItemsCarousel
          className="max-w-full"
          itemClassName="w-44 pl-4 lg:w-64"
          options={{ loop: true, autoPlay: true, playDirection: 'forward' }}
          slides={[
            ...finalProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            )),
          ]}
        />
        <SmartLink
          className={twMerge(
            'animated-link mx-auto mt-4 flex w-fit items-center gap-2 text-sm text-amber-500 md:text-base',
            'animate-enter-from-bottom',
          )}
          href="/works"
        >
          All Works
          <SlArrowRightCircle className="mt-0.5" />
        </SmartLink>
      </section>
    );
  },
);

ProjectCarousel.displayName = 'ProjectCarousel';
