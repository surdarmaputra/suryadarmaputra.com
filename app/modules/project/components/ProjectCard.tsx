import { SlRocket } from 'react-icons/sl';
import LazyLoad from 'react-lazyload';

import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  isClientReady?: boolean;
}

export function ProjectCard({
  project,
  isClientReady,
}: ProjectCardProps) {
  return (
    <div
      className="group/project-card w-40 lg:w-60 block relative"
      rel="noreferrer"
    >
      <div className="h-40 w-40 lg:w-60 lg:h-60 overflow-hidden rounded-md shadow-lg">
        {project.thumbnailUrl && project.thumbnailPlaceholderUrl && isClientReady ? (
          <LazyLoad
            className='h-full w-max'
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
      <div className="rounded-md absolute top-0 bottom-0 left-0 right-0 opacity-0 group-hover/project-card:opacity-100 bg-slate-50/90 dark:bg-slate-900/90 p-2 flex items-center justify-center transition-opacity">
        <div className='group text-center'>
          <a
            className="animated-link text-xs text-center leading-tight font-semibold  text-slate-900 dark:text-slate-50"
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