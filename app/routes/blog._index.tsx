import { MetaFunction, useLoaderData } from '@remix-run/react';

import PostListPage from '~/modules/blog/pages/PostListPage';
import { getPosts } from '~/services/post.server';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Blog - Surya Darma Putra',
    },
    {
      name: 'description',
      content: 'Blog posts by Surya Darma Putra',
    },
    {
      name: 'keywords',
      content: ['software engineer', 'javascript', 'react', 'vue'].join(', '),
    },
  ];
};

export async function loader() {
  const posts = await getPosts();
  return {
    posts,
  };
}

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>();

  return <PostListPage posts={posts} />;
}