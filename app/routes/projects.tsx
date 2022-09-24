import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';

import HeroSection from '~/components/base/HeroSection';
import { DefaultLayout } from '~/components/layouts/DefaultLayout';
import { ProjectList } from '~/components/sections/ProjectList';
import { getProjects, Project } from '~/services/project.server';

interface LoaderData {
  projects: Project[];
}

export const loader: LoaderFunction = async () => {
  const projects = await getProjects();
  return { projects };
};

export const meta: MetaFunction = () => {
  return {
    title: 'Projects - Surya Darma Putra',
    description: 'Projects by Surya Darma Putra',
    keywords: ['software engineer', 'javascript', 'react', 'vue'].join(', '),
  };
};

export default function Projects() {
  const { projects } = useLoaderData<LoaderData>();

  return (
    <DefaultLayout>
      <HeroSection
        description="Playground, websites, open sources and more."
        title="Projects"
      />
      {projects?.length ? (
        <ProjectList projects={projects} />
      ) : (
        <div className="pt-16 pb-48 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      )}
    </DefaultLayout>
  );
}
