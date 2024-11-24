import { LoaderFunctionArgs, MetaFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import PostDetailPage from '~/modules/blog/pages/PostDetailPage';
import getPostDetailAndNavigationBySlug from '~/modules/blog/services/PostService/getPostDetailAndNavigationBySlug';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const post = data?.post;
  if (!post) {
    return [];
  }
  return [
    { title: `${post.title} - Surya Darma Putra` },
    { name: 'description', content: post.excerpt },
    {
      name: 'keywords',
      content: [post.category, ...(post?.tags || [])].join(', '),
    },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  if (!slug) {
    throw redirect('/blog');
  }

  const { post, nextPost, previousPost } =
    await getPostDetailAndNavigationBySlug(slug);
  if (!post) {
    throw redirect('/blog');
  }

  return { post, nextPost, previousPost };
}

export default function BlogSlug() {
  const { post, nextPost, previousPost } = useLoaderData<typeof loader>();

  return (
    <PostDetailPage
      nextPost={nextPost}
      post={post}
      previousPost={previousPost}
    />
  );
}
