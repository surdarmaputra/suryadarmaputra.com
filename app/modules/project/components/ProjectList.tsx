import { forwardRef, useEffect, useState } from 'react';
import { SlArrowRightCircle, SlRocket } from 'react-icons/sl';
import LazyLoad from 'react-lazyload';
import { twMerge } from 'tailwind-merge';

import { SmartLink } from '~/modules/core/components/base/SmartLink';
import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';
import { Project } from '~/modules/project/types';

interface ProjectListProps {
  className?: string;
  featuredOnly?: boolean;
  projects: Project[];
  isTitleVisible?: boolean;
}

interface ProjectListProps {
  className?: string;
  featuredOnly?: boolean;
  projects: Project[];
  isTitleVisible?: boolean;
}

export const ProjectList = forwardRef<HTMLDivElement, ProjectListProps>(
  ({ className, featuredOnly, projects, isTitleVisible }, ref) => {
    const [isClientReady, setIsClientReady] = useState<boolean>(false);

    useEffect(() => {
      setIsClientReady(true);
    }, []);

    if (!projects?.length) return null;

    const itemTitleClassName =
      'animated-link inline text-sm md:text-md font-semibold text-slate-900 dark:text-slate-200';
    const displayedProjects = featuredOnly ? projects.slice(0, 3) : projects;

    return (
      <section
        className={twMerge('container mx-auto lg:max-w-5xl', className)}
        id="work"
        ref={ref}
      >
        {isTitleVisible && (
          <h2 className="mb-10 inline-flex items-center gap-4 text-2xl font-extrabold text-slate-800 dark:text-slate-200">
            <div className="relative h-8 w-8 rounded-full bg-amber-500 dark:bg-slate-800">
              <SlRocket className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2" />
            </div>
            Work
          </h2>
        )}
        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-4">
          {displayedProjects.map(
            (
              { link, summary, title, thumbnailUrl, thumbnailPlaceholderUrl },
              index,
            ) => (
              <a
                className="group w-full"
                href={link}
                key={index}
                rel="noreferrer"
                target="_blank"
              >
                <div className="h-40 overflow-hidden rounded-md border border-slate-200">
                  {thumbnailUrl && thumbnailPlaceholderUrl && isClientReady ? (
                    <LazyLoad
                      placeholder={
                        <img
                          alt={`${title} thumbnail`}
                          className="w-full blur-xl"
                          src={thumbnailPlaceholderUrl}
                        />
                      }
                    >
                      <OptimizedImage
                        alt={`${title} thumbnail`}
                        className="w-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                        src={thumbnailUrl}
                      />
                    </LazyLoad>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 transition-transform duration-500 ease-in-out group-hover:scale-105 dark:bg-slate-200">
                      <SlRocket className="h-10 w-10 text-slate-300" />
                    </div>
                  )}
                </div>
                <div className="mb-1 mt-2 md:mb-2 md:mt-4">
                  {isTitleVisible ? (
                    <h3 className={itemTitleClassName}>{title}</h3>
                  ) : (
                    <h2 className={itemTitleClassName}>{title}</h2>
                  )}
                </div>
                <p className="block text-xs font-light leading-normal text-slate-600 transition group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-slate-300 md:text-sm md:leading-relaxed">
                  {summary}
                </p>
              </a>
            ),
          )}
          {featuredOnly && projects?.length > 3 && (
            <div className="flex w-full items-center justify-center md:w-1/2">
              <SmartLink
                className="animated-link mb-10 flex items-center text-base font-light md:mb-32 md:text-2xl"
                href="/projects"
              >
                More projects{' '}
                <SlArrowRightCircle className="ml-2 mt-1 md:h-8 md:w-10" />
              </SmartLink>
            </div>
          )}
        </div>
      </section>
    );
  },
);

ProjectList.displayName = 'ProjectList';

export default ProjectList;
