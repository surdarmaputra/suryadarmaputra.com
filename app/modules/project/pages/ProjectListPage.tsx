import HeroSection from '~/modules/core/components/base/HeroSection';
import { DefaultLayout } from '~/modules/core/components/layouts/DefaultLayout';
import { ProjectList } from '~/modules/core/components/sections/ProjectList';

import { Project } from '../types';

export interface ProjectListPageProps {
  projects: Project[];
}

export default function ProjectListPage({ projects }: ProjectListPageProps) {
  return (
    <DefaultLayout>
      <HeroSection
        description="Playground, websites, open sources and more."
        title="Projects"
      />
      {projects?.length ? (
        <ProjectList projects={projects} />
      ) : (
        <div className="pb-48 pt-16 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      )}
    </DefaultLayout>
  );
}
