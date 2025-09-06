import { SlRocket } from 'react-icons/sl';
import LazyLoad from 'react-lazyload';

import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  isClientReady?: boolean;
}

export function ProjectCard({ project, isClientReady }: ProjectCardProps) {
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
      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-md bg-slate-50/90 p-2 opacity-0 transition-opacity group-hover/project-card:opacity-100 dark:bg-slate-900/90">
        <div className="group text-center">
          <a
            className="animated-link text-center text-xs font-semibold leading-tight text-slate-900 dark:text-slate-50"
            href={project.link}
            rel="noreferrer"
            target="_blank"
          >
            {project.title}
          </a>
        </div>
      </div>
    </div>
  );
}
