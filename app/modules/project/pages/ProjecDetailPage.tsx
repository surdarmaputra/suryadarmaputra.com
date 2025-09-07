import { SlRocket } from 'react-icons/sl';

import HeroSection from '~/modules/core/components/base/HeroSection';
import { Tags } from '~/modules/core/components/base/Tag';
import { DefaultLayout } from '~/modules/core/components/layouts/DefaultLayout';
import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

import { Project } from '../types';

export interface ProjectDetailPageProps {
  project: Project;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  return (
    <DefaultLayout>
      <HeroSection
        description={
          <>
            {project.summary ? <p>{project.summary}</p> : null}
            {project.tags?.length ? (
              <div className="flex flex-col gap-1">
                <div>Tags:</div>
                <Tags tags={project.tags} />
              </div>
            ) : null}
          </>
        }
        title={
          <>
            <div className="relative h-4 w-4 rounded-full bg-amber-500 dark:bg-slate-800">
              <SlRocket className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>{project.title}</div>
          </>
        }
      />
      {project.thumbnailUrl ? (
        <OptimizedImage
          alt={`${project.title} thumbnail`}
          className="mx-auto w-60 transition-transform duration-500 ease-in-out group-hover/project-card:scale-105"
          src={project.thumbnailUrl}
        />
      ) : null}
    </DefaultLayout>
  );
}
