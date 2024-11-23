import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import LandingPage from '~/modules/landing/pages/LandingPage';
import { getPosts } from '~/services/post.server';
import { getProjects } from '~/services/project.server';

export async function loader() {
  const posts = await getPosts();
  const projects = await getProjects();

  return {
    posts,
    projects,
  };
}

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Surya Darma Putra - Software engineer based in Bali, Indonesia',
    },
    {
      description:
        "👋 Hello, I'm Surya, a software engineer. I do web development using JavaScript, React and Vue ecosystems.",
    },
    {
      name: 'keywords',
      content: ['software engineer', 'javascript', 'react', 'vue'].join(', '),
    },
  ];
};

export default function Index() {
  const { posts, projects } = useLoaderData<typeof loader>();

  return (
    <LandingPage
      posts={posts}
      projects={projects}
    />
  );
}
