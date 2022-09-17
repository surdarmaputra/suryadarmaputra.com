import type { MetaFunction } from 'remix';
import { LoaderFunction, useLoaderData } from 'remix';

import { DefaultLayout } from '~/components/layouts/DefaultLayout';
import { BrandHero } from '~/components/sections/BrandHero';
import { PostSummary } from '~/components/sections/PostSummary';
import type { Post } from '~/services/post.server';
import { getPosts } from '~/services/post.server';

interface LoaderData {
  posts: Post[];
}

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return { posts };
};

export const meta: MetaFunction = () => {
  return {
    title: 'Surya Darma Putra - Software engineer based in Bali, Indonesia',
    description:
      "👋 Hello, I'm Surya, a software engineer. I do web development using JavaScript, React and Vue ecosystems.",
    keywords: ['software engineer', 'javascript', 'react', 'vue'].join(', '),
  };
};

export default function Index() {
  const { posts } = useLoaderData<LoaderData>();
  return (
    <DefaultLayout>
      <BrandHero />
      {posts?.length ? (
        <div className="flex flex-wrap md:-m-8">
          {posts.map(({ slug, ...postData }) => (
            <PostSummary key={slug} {...postData} />
          ))}
        </div>
      ) : (
        <div className="pt-16 pb-48 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      )}
    </DefaultLayout>
  );
}
