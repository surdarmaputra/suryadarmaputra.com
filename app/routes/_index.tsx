import type { MetaFunction } from 'react-router';
import { useLoaderData } from 'react-router';

import LandingPage from '~/modules/introduction/pages/LandingPage';
import { getPosts } from '~/services/post.server';
import { getProjects } from '~/services/project.server';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Surya Darma Putra - Software engineer based in Bali, Indonesia',
    },
    {
      name: 'description',
      content:
        "👋 Hello, I'm Surya, a software engineer. I do web development using JavaScript, React and Vue ecosystems.",
    },
    {
      name: 'keywords',
      content: ['software engineer', 'javascript', 'react', 'vue'].join(', '),
    },
  ];
};

export async function loader() {
  const posts = await getPosts();
  const projects = await getProjects();

  return {
    posts,
    projects,
  };
}

export default function Index() {
  const { posts, projects } = useLoaderData<typeof loader>();

  return <LandingPage posts={posts} projects={projects} />;
}
