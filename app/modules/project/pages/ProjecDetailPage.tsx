import '../../blog/styles/postDetailPage.css';

import { SlArrowRightCircle } from 'react-icons/sl';

import HeroSection from '~/modules/core/components/base/HeroSection';
import { BlocksRenderer } from '~/modules/core/components/base/notion/BlocksRenderer';
import { Tags } from '~/modules/core/components/base/Tag';
import { DefaultLayout } from '~/modules/core/components/layouts/DefaultLayout';
import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

import { ProjectCarousel } from '../components/ProjectCarousel';
import { Project } from '../types';

export interface ProjectDetailPageProps {
  project: Project;
  projects: Project[];
}

export default function ProjectDetailPage({
  project,
  projects,
}: ProjectDetailPageProps) {
  return (
    <DefaultLayout>
      <HeroSection
        description={
          <>
            {project.link ? (
              <div className="mt-2 flex justify-center gap-4 md:mt-4">
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
        descriptionClassName="mx-auto"
        title={project.title}
        titleClassName="text-center justify-center"
      />
      <div className="container mx-auto my-8 flex flex-col md:text-center lg:max-w-5xl">
        <div className="flex flex-col gap-6">
          {project.thumbnailUrl ? (
            <OptimizedImage
              alt={`${project.title} thumbnail`}
              className="mx-auto rounded-md shadow-lg lg:max-w-2xl"
              src={project.thumbnailUrl}
            />
          ) : null}
        </div>
        <article className="mx-auto lg:max-w-2xl">
          <p>{project.summary}</p>
          {Boolean(project.blocks?.length) && (
            <BlocksRenderer
              blocks={project.blocks || []}
              imageBasePath="/images/projects"
            />
          )}
        </article>
        {project.tags?.length ? (
          <div className="mt-8 flex flex-col gap-2">
            <div className="font-bold">Tags:</div>
            <Tags className="md:justify-center" tags={project.tags} />
          </div>
        ) : null}
      </div>

      <ProjectCarousel
        className="z-10 -mx-6 mb-12 mt-10 overflow-hidden py-2"
        projects={projects}
      />
    </DefaultLayout>
  );
}
