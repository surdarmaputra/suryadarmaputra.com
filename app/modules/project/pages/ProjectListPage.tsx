import { useEffect, useState } from 'react';
import { SlRocket } from 'react-icons/sl';

import HeroSection from '~/modules/core/components/base/HeroSection';
import { DefaultLayout } from '~/modules/core/components/layouts/DefaultLayout';

import { ProjectCard } from '../components/ProjectCard';
import { Project } from '../types';

export interface ProjectListPageProps {
  projects: Project[];
}

export default function ProjectListPage({ projects }: ProjectListPageProps) {
  const [isClientReady, setIsClientReady] = useState<boolean>(false);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  return (
    <DefaultLayout>
      <HeroSection
        description="I've built many things on web supporting various businesses. In spare time, I built my own stuff, too."
        title={
          <>
            <div className="relative h-4 w-4 rounded-full bg-amber-500 dark:bg-slate-800 md:h-8 md:w-8">
              <SlRocket className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 md:h-10 md:w-10" />
            </div>
            <div>Work</div>
          </>
        }
      />
      {projects?.length ? (
        <div className="container mx-auto flex flex-wrap justify-between gap-2 lg:max-w-5xl">
          {projects.map((project) => (
            <ProjectCard
              isClientReady={isClientReady}
              key={project.id}
              project={project}
            />
          ))}
        </div>
      ) : (
        <div className="pb-48 pt-16 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      )}
    </DefaultLayout>
  );
}
