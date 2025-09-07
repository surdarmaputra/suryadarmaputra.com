import { SlArrowRightCircle, SlRocket } from 'react-icons/sl';
import LazyLoad from 'react-lazyload';

import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

import { Project } from '../types';

interface ProjectCardProps {
  isClientReady?: boolean;
  onClickProject?: (project: Project) => void;
  project: Project;
}

export function ProjectCard({
  isClientReady,
  onClickProject,
  project,
}: ProjectCardProps) {
  return (
    <div
      className="group/project-card relative block w-40 lg:w-60"
      rel="noreferrer"
    >
      <div className="h-40 w-40 overflow-hidden rounded-md shadow-lg lg:h-60 lg:w-60">
        {project.thumbnailUrl &&
        project.thumbnailPlaceholderUrl &&
        isClientReady ? (
            <LazyLoad
              className="h-full w-max"
              placeholder={
                <img
                  alt={`${project.title} thumbnail`}
                  className="h-full blur-xl"
                  src={project.thumbnailPlaceholderUrl}
                />
              }
            >
              <OptimizedImage
                alt={`${project.title} thumbnail`}
                className="h-full w-auto transition-transform duration-500 ease-in-out group-hover/project-card:scale-105"
                src={project.thumbnailUrl}
              />
            </LazyLoad>
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
            <button
              className="animated-link -translate-x-full opacity-0 group-hover/project-card:translate-x-0 group-hover/project-card:opacity-100"
              onClick={() => onClickProject?.(project)}
              type="button"
            >
              Detail
            </button>
            <a
              className="animated-link flex translate-x-full items-center gap-1 opacity-0 group-hover/project-card:translate-x-0 group-hover/project-card:opacity-100"
              href={project.link}
              rel="noreferrer"
              target="_blank"
            >
              Preview
              <SlArrowRightCircle />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
