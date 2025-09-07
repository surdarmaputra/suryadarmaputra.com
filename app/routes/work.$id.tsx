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
  const { id } = params;
  if (!id) {
    throw redirect('/work');
  }

  const projects = await getProjects();
  const project = projects.find((item) => item.id === id);
  if (!project) {
    throw redirect('/work');
  }

  return { project };
}

export default function WorkById() {
  const { project } = useLoaderData<typeof loader>();

  return <ProjectDetailPage project={project} />;
}
