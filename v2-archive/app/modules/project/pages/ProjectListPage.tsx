import { SlRocket } from 'react-icons/sl';
import { twMerge } from 'tailwind-merge';

import HeroSection from '~/modules/core/components/base/HeroSection';
import { DefaultLayout } from '~/modules/core/components/layouts/DefaultLayout';

import { ProjectCard } from '../components/ProjectCard';
import { Project } from '../types';

export interface ProjectListPageProps {
  projects: Project[];
}

export default function ProjectListPage({ projects }: ProjectListPageProps) {
  return (
    <DefaultLayout>
      <HeroSection
        description="I've built many things on web supporting various businesses. In spare time, I built my own stuff, too."
        title={
          <>
            <div className="relative h-4 w-4 rounded-full bg-amber-500 md:h-8 md:w-8 dark:bg-slate-800">
              <SlRocket className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 md:h-10 md:w-10" />
            </div>
            <div>Work</div>
          </>
        }
      />
      {projects?.length ? (
        <div
          className={twMerge(
            'container mx-auto grid grid-cols-2 gap-4 lg:max-w-3xl lg:grid-cols-3 lg:gap-8',
            'animate-enter-from-bottom',
          )}
        >
          {projects.map((project) => (
            <ProjectCard
              className="w-full lg:w-full"
              key={project.id}
              project={project}
            />
          ))}
        </div>
      ) : (
        <div className="pt-16 pb-48 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      )}
    </DefaultLayout>
  );
}
