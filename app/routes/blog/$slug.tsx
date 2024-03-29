import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';

import { BlocksRenderer } from '~/components/base/notion/BlocksRenderer';
import { PostMetaData } from '~/components/base/PostMetaData';
import { Tags } from '~/components/base/Tag';
import { PostSwitcher } from '~/components/sections/PostSwitcher';
import type { FullPost, Post } from '~/services/post.server';
import { getPost, getPosts } from '~/services/post.server';

interface LoaderData {
  post: FullPost;
  previousPost: Post | null;
  nextPost: Post | null;
}

export const loader: LoaderFunction = async ({ params }) => {
  const posts = await getPosts();
  const post = await getPost(params.slug);
  const currentPostIndex = posts.findIndex((item) => item.slug === params.slug);
  const previousPost =
    currentPostIndex > 0 ? posts[currentPostIndex - 1] : null;
  const nextPost =
    currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null;

  return {
    post,
    previousPost,
    nextPost,
  };
};

export const meta: MetaFunction = ({ data }) => {
  const { post } = data;
  return {
    title: `${post.title} - Surya Darma Putra`,
    description: post.excerpt,
    keywords: [post.category, ...post.tags].join(', '),
  };
};

export default function SinglePost() {
  const { post, previousPost, nextPost } = useLoaderData<LoaderData>();
  return (
    <>
      <PostMetaData
        className="mt-24"
        date={post.date}
        readingTime={post.readingTime}
      />
      <h2 className="mt-4 mb-24 text-5xl text-slate-900 dark:text-slate-300 font-extrabold leading-tight">
        {post.title}
      </h2>
      <article>
        <BlocksRenderer blocks={post.blocks} />
      </article>
      <Tags
        category={post.category}
        className="mt-14 md:mt-20 mb-20"
        tags={post.tags}
      />
      <PostSwitcher
        className="mb-20"
        nextPost={nextPost}
        previousPost={previousPost}
      />
    </>
  );
}
