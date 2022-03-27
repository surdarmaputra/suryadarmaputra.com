import { LoaderFunction, useLoaderData } from 'remix';

import BlocksRenderer from '~/components/base/notion/BlocksRenderer';
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
      <PostMetaData className="mt-20" date={post.date} />
      <h2 className="mt-4 mb-16 text-5xl text-slate-900 dark:text-slate-300 font-bold leading-tight">
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
