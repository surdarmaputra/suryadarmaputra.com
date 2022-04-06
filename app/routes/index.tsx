import type { MetaFunction } from 'remix';
import { LoaderFunction, useLoaderData } from 'remix';

import { DefaultLayout } from '~/components/layouts/DefaultLayout';
import { BrandHero } from '~/components/sections/BrandHero';
import { PostSummary } from '~/components/sections/PostSummary';
import type { Post } from '~/services/post.server';
import { getDir, getPosts } from '~/services/post.server';

interface LoaderData {
  posts: Post[];
  dir: Record<string, string>;
}

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  const dir = await getDir();
  return { posts, dir };
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
  const { posts, dir } = useLoaderData<LoaderData>();
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
        <div className="text-center text-4xl font-bold text-slate-200 dark:text-slate-700 pt-16 pb-48">
          Content is coming soon!
        </div>
      )}
      {Object.keys(dir).map((key) => (
        <div className="flex" key={key}>
          <div>{key}: </div>
          <div>{dir[key]}</div>
        </div>
      ))}
    </DefaultLayout>
  );
}
