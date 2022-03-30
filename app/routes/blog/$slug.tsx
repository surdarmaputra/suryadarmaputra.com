import { LoaderFunction, useLoaderData } from 'remix';

import { BlocksRenderer } from '~/components/base/notion/BlocksRenderer';
import { PostMetaData } from '~/components/base/PostMetaData';
import { Tags } from '~/components/base/Tag';
import type { FullPost } from '~/services/post';
import { getPost } from '~/services/post';

interface LoaderData {
  post: FullPost;
}

export const loader: LoaderFunction = async ({ params }) => {
  const post = await getPost(params.slug);
  return { post };
};

export default function SinglePost() {
  const { post } = useLoaderData<LoaderData>();
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
    </>
  );
}
