import { useState } from 'react';
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
  const [isSelected, setIsSelected] = useState<boolean>(false);
  return (
    <div
      aria-hidden="true"
      className={twMerge(
        'group/project-card relative block h-40 w-40 lg:h-60 lg:w-60',
        className,
      )}
      onClick={() => setIsSelected(true)}
      onMouseLeave={() => setIsSelected(false)}
    >
      <div className="h-full w-full overflow-hidden rounded-md shadow-lg">
        {project.thumbnailUrl &&
        project.thumbnailPlaceholderUrl &&
        isClientReady ? (
          /* eslint-disable indent */
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
                className={twMerge(
                  'h-full w-full object-cover transition-transform duration-500 ease-in-out',
                  isSelected && 'scale-105',
                  'group-hover/project-card:scale-105',
                )}
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
                className={twMerge(
                  'h-full w-full object-cover transition-transform duration-500 ease-in-out',
                  isSelected && 'scale-105',
                  'group-hover/project-card:scale-105',
                )}
                fetchPriority="high"
                src={project.thumbnailUrl}
                width={imageSize?.lg || 240}
              />
            </LazyLoad>
          </>
        ) : (
          <div
            className={twMerge(
              'flex h-full w-full items-center justify-center bg-slate-100 transition-transform duration-500 ease-in-out dark:bg-slate-200',
              isSelected && 'scale-105',
              'group-hover/project-card:scale-105',
            )}
          >
            <SlRocket className="h-10 w-10 text-slate-300" />
          </div>
        )}
        {/* eslint-enable indent */}
      </div>
      <div
        className={twMerge(
          'absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center rounded-md bg-slate-50/95 p-2 opacity-0 transition-all dark:bg-slate-900/90',
          isSelected ? 'opacity-100' : '',
          'group-hover/project-card:opacity-100',
        )}
      >
        <div className="flex flex-col gap-4">
          <div
            className={twMerge(
              '-translate-y-full text-center text-base leading-tight font-semibold text-slate-900 opacity-0 transition-all dark:text-slate-50',
              isSelected && 'translate-y-0 opacity-100',
              'group-hover/project-card:translate-y-0 group-hover/project-card:opacity-100',
            )}
          >
            {project.title}
          </div>
          <div className="flex items-center justify-center gap-3 text-xs font-light text-slate-500 dark:text-slate-100">
            <Link
              className={twMerge(
                'animated-link -translate-x-full opacity-0',
                isSelected && 'translate-x-0 opacity-100',
                'group-hover/project-card:translate-x-0 group-hover/project-card:opacity-100',
              )}
              prefetch="viewport"
              to={`/works/${project.slug}`}
              type="button"
              viewTransition
            >
              Detail
            </Link>
            {project.link ? (
              <a
                className={twMerge(
                  'animated-link flex translate-x-full items-center gap-1 opacity-0',
                  isSelected && 'translate-x-0 opacity-100',
                  'group-hover/project-card:translate-x-0 group-hover/project-card:opacity-100',
                )}
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
