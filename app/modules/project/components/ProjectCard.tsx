import { SlArrowRightCircle, SlRocket } from 'react-icons/sl';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

import { Project } from '../types';

interface ProjectCardProps {
  className?: string;
  imageSize?: {
    sm: number;
    lg: number;
  };
  isClientReady?: boolean;
  project: Project;
}

export function ProjectCard({
  className,
  imageSize,
  isClientReady,
  project,
}: ProjectCardProps) {
  return (
    <div
      className={twMerge(
        'group/project-card relative block h-40 w-40 lg:h-60 lg:w-60',
        className,
      )}
      rel="noreferrer"
    >
      <div className="h-full w-full overflow-hidden rounded-md shadow-lg">
        {project.thumbnailUrl &&
        project.thumbnailPlaceholderUrl &&
        isClientReady ? (
            <>
              <LazyLoad
                className="h-full w-full lg:hidden"
                placeholder={
                  <img
                    alt={`${project.title} thumbnail`}
                    className="h-full w-full object-cover blur-xl"
                    src={project.thumbnailPlaceholderUrl}
                  />
                }
              >
                <OptimizedImage
                  alt={`${project.title} thumbnail`}
                  className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover/project-card:scale-105"
                  fetchPriority="high"
                  src={project.thumbnailUrl}
                  width={imageSize?.sm || 160}
                />
              </LazyLoad>
              <LazyLoad
                className="hidden h-full w-full lg:block"
                placeholder={
                  <img
                    alt={`${project.title} thumbnail`}
                    className="h-full w-full object-cover blur-xl"
                    src={project.thumbnailPlaceholderUrl}
                  />
                }
              >
                <OptimizedImage
                  alt={`${project.title} thumbnail`}
                  className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover/project-card:scale-105"
                  fetchPriority="high"
                  src={project.thumbnailUrl}
                  width={imageSize?.lg || 240}
                />
              </LazyLoad>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100 transition-transform duration-500 ease-in-out group-hover/project-card:scale-105 dark:bg-slate-200">
              <SlRocket className="h-10 w-10 text-slate-300" />
            </div>
          )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-md bg-slate-50/95 p-2 opacity-0 transition-opacity group-hover/project-card:opacity-100 dark:bg-slate-900/90">
        <div className="flex flex-col gap-4">
          <div className="-translate-y-full text-center text-base font-semibold leading-tight text-slate-900 opacity-0 transition-all group-hover/project-card:translate-y-0 group-hover/project-card:opacity-100 dark:text-slate-50">
            {project.title}
          </div>
          <div className="flex items-center justify-center gap-3 text-xs font-light text-slate-500 dark:text-slate-600">
            <Link
              className="animated-link -translate-x-full opacity-0 group-hover/project-card:translate-x-0 group-hover/project-card:opacity-100"
              prefetch="viewport"
              to={`/work/${project.id}`}
              type="button"
              viewTransition
            >
              Detail
            </Link>
            {project.link ? (
              <a
                className="animated-link flex translate-x-full items-center gap-1 opacity-0 group-hover/project-card:translate-x-0 group-hover/project-card:opacity-100"
                href={project.link}
                rel="noreferrer"
                target="_blank"
              >
                Preview
                <SlArrowRightCircle />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
