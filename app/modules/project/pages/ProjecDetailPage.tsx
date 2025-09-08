import { SlArrowRightCircle } from 'react-icons/sl';

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
            {project.link ? (
              <div className="mt-2 flex gap-4">
                <a
                  className="animated-link flex items-center gap-2 font-medium text-amber-500"
                  href={project.link}
                  rel="noreferrer"
                  target="_blank"
                >
                  Preview <SlArrowRightCircle />
                </a>
              </div>
            ) : null}
          </>
        }
        title={project.title}
      />
      <div className="container mx-auto flex flex-col gap-8 lg:max-w-5xl">
        <div className="flex flex-col gap-6 md:flex-row">
          {project.thumbnailUrl ? (
            <OptimizedImage
              alt={`${project.title} thumbnail`}
              className="mx-auto rounded-md shadow-lg lg:max-w-xl"
              src={project.thumbnailUrl}
            />
          ) : null}
          <div className="flex flex-col gap-6">
            <p>{project.summary}</p>
            {project.tags?.length ? (
              <div className="flex flex-col gap-1">
                <div>Tags:</div>
                <Tags tags={project.tags} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
