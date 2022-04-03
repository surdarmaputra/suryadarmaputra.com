import { LoaderFunction, useLoaderData } from 'remix';

import { DefaultLayout } from '~/components/layouts/DefaultLayout';
import { BrandHero } from '~/components/sections/BrandHero';
import { PostSummary } from '~/components/sections/PostSummary';
import type { Post } from '~/services/post';
import { getPosts } from '~/services/post';

interface LoaderData {
  posts: Post[];
}

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return { posts };
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
        <div className="text-center text-4xl font-bold text-slate-200 dark:text-slate-700 pt-16 pb-48">
          Content is coming soon!
        </div>
      )}
    </DefaultLayout>
  );
}
