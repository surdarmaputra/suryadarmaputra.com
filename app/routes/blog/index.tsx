import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';

import HeroSection from '~/components/base/HeroSection';
import { PostSummary } from '~/components/sections/PostSummary';
import { getPosts, Post } from '~/services/post.server';

interface LoaderData {
  posts: Post[];
}

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return { posts };
};

export const meta: MetaFunction = () => {
  return {
    title: 'Blog - Surya Darma Putra',
    description: 'Blog posts by Surya Darma Putra',
    keywords: ['software engineer', 'javascript', 'react', 'vue'].join(', '),
  };
};

export default function Index() {
  const { posts } = useLoaderData<LoaderData>();

  return (
    <>
      <HeroSection
        description="Software engineering, learning materials, experiments and opinions."
        title="Blog"
      />
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
    </>
  );
}
