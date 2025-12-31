import {
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
  useLoaderData,
} from 'react-router';

import ProjectDetailPage from '~/modules/project/pages/ProjecDetailPage';
import { getProjects } from '~/modules/project/services/ProjectService/getProjects';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const project = data?.project;
  if (!project) {
    return [];
  }
  return [
    { title: `${project.title} - Surya Darma Putra` },
    {
      name: 'keywords',
      content: [...(project?.tags || [])].join(', '),
    },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  if (!slug) {
    throw redirect('/works');
  }

  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    throw redirect('/works');
  }

  return { project, projects };
}

export default function WorkById() {
  const { project, projects } = useLoaderData<typeof loader>();

  return <ProjectDetailPage project={project} projects={projects} />;
}
