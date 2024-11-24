import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import ProjectListPage from '~/modules/project/pages/ProjectListPage';
import { getProjects } from '~/services/project.server';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Projects - Surya Darma Putra',
    },
    {
      name: 'description',
      content: 'Projects by Surya Darma Putra',
    },
    {
      name: 'keywords',
      content: ['software engineer', 'javascript', 'react', 'vue'].join(', '),
    },
  ];
};

export async function loader() {
  const projects = await getProjects();
  return {
    projects,
  };
}

export default function Projects() {
  const { projects } = useLoaderData<typeof loader>();

  return <ProjectListPage projects={projects} />;
}
