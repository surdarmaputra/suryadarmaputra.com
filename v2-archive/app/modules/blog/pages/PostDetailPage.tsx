import '../styles/postDetailPage.css';

import { BlocksRenderer } from '~/modules/core/components/base/notion/BlocksRenderer';
import { PostMetaData } from '~/modules/core/components/base/PostMetaData';
import { Tags } from '~/modules/core/components/base/Tag';

import { PostSwitcher } from '../components/PostSwitcher';
import { FullPost, Post } from '../types';

export interface PostDetailPageProps {
  post: FullPost;
  nextPost: Post | null;
  previousPost: Post | null;
}

export default function PostDetailPage({
  post,
  nextPost,
  previousPost,
}: PostDetailPageProps) {
  return (
    <>
      <PostMetaData
        className="mt-20"
        date={post.date}
        readingTime={post.readingTime}
      />
      <h2 className="lg:max-w-3xl container mx-auto mb-4 mt-4 text-5xl font-extrabold leading-tight text-slate-900 dark:text-slate-300">
        {post.title}
      </h2>
      <article className="container mx-auto lg:max-w-3xl">
        <BlocksRenderer blocks={post.blocks} />
      </article>
      <Tags
        category={post.category}
        className="container mx-auto mb-20 mt-14 md:mt-20 lg:max-w-3xl"
        tags={post.tags}
      />
      <PostSwitcher
        className="container mx-auto mb-20 lg:max-w-3xl"
        nextPost={nextPost}
        previousPost={previousPost}
      />
    </>
  );
}
