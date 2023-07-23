'use client';

import Image from 'next/image';
import LazyLoad from 'react-lazyload';

import { Project } from '../../types';
import { ArrowRight } from '../atoms/Icon/ArrowRight';
import { RocketIcon } from '../atoms/Icon/RocketIcon';
import { SmartLink } from '../atoms/SmartLink';

interface ProjectListProps {
  className?: string;
  featuredOnly?: boolean;
  projects: Project[];
  showTitle?: boolean;
}

export function ProjectList({
  className,
  featuredOnly,
  projects,
  showTitle,
}: ProjectListProps) {
  if (!projects?.length) return null;

  const itemTitleClassName =
    'animated-link inline text-md font-semibold text-slate-900 dark:text-slate-200';
  const displayedProjects = featuredOnly ? projects.slice(0, 3) : projects;

  return (
    <div className={`relative flex flex-wrap md:-mx-8 ${className}`}>
      {showTitle && (
        <h2 className="absolute -top-12 -left-4 -z-10 mb-6 text-6xl font-bold text-slate-200 opacity-40 dark:text-slate-700 md:-top-12 md:left-2 md:text-7xl">
          Projects.
        </h2>
      )}
      {displayedProjects.map(
        (
          { link, summary, title, thumbnailUrl, thumbnailPlaceholderUrl },
          index,
        ) => (
          <a
            className="group p-0 pb-10 md:w-1/2 md:p-8 md:py-2"
            href={link}
            key={index}
            rel="noreferrer"
            target="_blank"
          >
            <div className="h-40 overflow-hidden rounded-md border border-slate-200">
              {thumbnailUrl && thumbnailPlaceholderUrl ? (
                <LazyLoad
                  placeholder={
                    <Image
                      alt={`${title} thumbnail`}
                      className="w-full blur-xl"
                      height={40}
                      src={thumbnailPlaceholderUrl}
                      width={40}
                    />
                  }
                >
                  <Image
                    alt={`${title} thumbnail`}
                    className="w-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                    height={40}
                    src={thumbnailUrl}
                    width={40}
                  />
                </LazyLoad>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 transition-transform duration-500 ease-in-out group-hover:scale-105 dark:bg-slate-200">
                  <RocketIcon className="h-20 w-20 text-slate-300" />
                </div>
              )}
            </div>
            <div className="mt-4 mb-1">
              {showTitle ? (
                <h3 className={itemTitleClassName}>{title}</h3>
              ) : (
                <h2 className={itemTitleClassName}>{title}</h2>
              )}
            </div>
            <p className="mb-4 block text-sm font-light leading-6 text-slate-600 transition group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-slate-300 md:mb-10">
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
            More projects <ArrowRight className="ml-2 mt-1 md:h-8 md:w-10" />
          </SmartLink>
        </div>
      )}
    </div>
  );
}
