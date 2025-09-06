import { forwardRef, useEffect, useState } from 'react';

import { MultipleItemsCarousel } from '~/modules/core/components/base/Carousel/MultipleItemsCarousel';
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
      projects?.length && projects.length <= 3
        ? [...projects, ...projects, ...projects]
        : projects;

    useEffect(() => {
      setIsClientReady(true);
    }, []);

    if (!projects?.length) return null;

    return (
      <section
        className={className}
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
      </section>
    );
  },
);

ProjectCarousel.displayName = 'ProjectCarousel';
