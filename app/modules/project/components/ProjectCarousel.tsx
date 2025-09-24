import { forwardRef, useEffect, useState } from 'react';
import { SlArrowRightCircle } from 'react-icons/sl';
import { twMerge } from 'tailwind-merge';

import { MultipleItemsCarousel } from '~/modules/core/components/base/Carousel/MultipleItemsCarousel';
import { SmartLink } from '~/modules/core/components/base/SmartLink';
import { Project } from '~/modules/project/types';

import { ProjectCard } from './ProjectCard';

interface ProjectCarouselProps {
  className?: string;
  featuredOnly?: boolean;
  projects: Project[];
  isTitleVisible?: boolean;
}

interface ProjectCarouselProps {
  className?: string;
  projects: Project[];
}

export const ProjectCarousel = forwardRef<HTMLDivElement, ProjectCarouselProps>(
  ({ className, projects }, ref) => {
    const [isClientReady, setIsClientReady] = useState<boolean>(false);

    const finalProjects =
      projects?.length && projects.length <= 5
        ? [...projects, ...projects, ...projects]
        : projects;

    useEffect(() => {
      setIsClientReady(true);
    }, []);

    if (!projects?.length) return null;

    return (
      <section
        className={twMerge(
          'flex flex-col gap-4 md:gap-6',
          'transition-all duration-700 ease-out',
          isClientReady
            ? 'translate-x-0 opacity-100 delay-300'
            : 'translate-x-24 opacity-0',
          className,
        )}
        id="work"
        ref={ref}
      >
        <MultipleItemsCarousel
          className="max-w-full"
          itemClassName="w-44 pl-4 lg:w-64"
          options={{ loop: true, autoPlay: true, playDirection: 'forward' }}
          slides={[
            ...finalProjects.map((project, index) => (
              <ProjectCard
                isClientReady={isClientReady}
                key={index}
                project={project}
              />
            )),
          ]}
        />
        <SmartLink
          className={twMerge(
            'animated-link mx-auto flex w-fit items-center gap-2 text-sm text-amber-500 md:text-base',
            'translate-y-8 opacity-0 transition-all duration-1000 ease-out',
            isClientReady && 'translate-y-0 opacity-100 delay-500',
          )}
          href="/work"
        >
          Show me all
          <SlArrowRightCircle className="mt-0.5" />
        </SmartLink>
      </section>
    );
  },
);

ProjectCarousel.displayName = 'ProjectCarousel';
