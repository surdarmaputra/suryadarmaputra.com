import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { DefaultLayout } from '~/components/layouts/DefaultLayout';
import { BrandHero } from '~/components/sections/BrandHero';
import { PostList } from '~/components/sections/PostList';
import { ProjectList } from '~/components/sections/ProjectList';
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
    <DefaultLayout>
      <div className="absolute right-0 top-24 z-10 h-72 w-72 rounded-full bg-amber-500 opacity-15 blur-3xl dark:bg-amber-800"></div>

      <BrandHero />
      <ProjectList
        className="mb-32 mt-44"
        featuredOnly
        projects={projects}
        showTitle
      />
      <PostList posts={posts} showTitle />
      {!posts?.length && !projects?.length ? (
        <div className="pb-48 pt-16 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      ) : null}
    </DefaultLayout>
  );
}
