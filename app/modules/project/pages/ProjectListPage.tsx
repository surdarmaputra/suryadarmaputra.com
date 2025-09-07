import { SlRocket } from 'react-icons/sl';

import HeroSection from '~/modules/core/components/base/HeroSection';
import { DefaultLayout } from '~/modules/core/components/layouts/DefaultLayout';

import { ProjectList } from '../components/ProjectList';
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
            <div className="relative h-4 w-4 rounded-full bg-amber-500 dark:bg-slate-800">
              <SlRocket className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>Work</div>
          </>
        }
      />
      {projects?.length ? (
        <ProjectList className="pb-24 pt-8" projects={projects} />
      ) : (
        <div className="pb-48 pt-16 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      )}
    </DefaultLayout>
  );
}
