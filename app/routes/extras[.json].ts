import { getProjects } from '~/modules/project/services/ProjectService/getProjects';

export async function loader() {
  const projects = await getProjects();
  const extras = {
    projects,
  };

  return new Response(JSON.stringify(extras), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
