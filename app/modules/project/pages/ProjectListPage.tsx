import HeroSection from '~/modules/core/components/base/HeroSection';
import { DefaultLayout } from '~/modules/core/components/layouts/DefaultLayout';

import {ProjectList} from '../components/ProjectList';
import { Project } from '../types';

export interface ProjectListPageProps {
  projects: Project[];
}

export default function ProjectListPage({ projects }: ProjectListPageProps) {
  return (
    <DefaultLayout>
      <HeroSection
        description="I've built many things on web supporting various businesses. In spare time, I built my own stuff, too."
        title="Work"
      />
      {projects?.length ? (
        <ProjectList className='pt-8 pb-24' projects={projects} />
      ) : (
        <div className="pb-48 pt-16 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      )}
    </DefaultLayout>
  );
}
