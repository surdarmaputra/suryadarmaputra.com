import { BlocksRenderer } from '~/components/base/notion/BlocksRenderer';
import { PostMetaData } from '~/components/base/PostMetaData';
import { Tags } from '~/components/base/Tag';
import { PostSwitcher } from '~/components/sections/PostSwitcher';
import { FullPost, Post } from '~/services/post.server';

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
        className="mt-24"
        date={post.date}
        readingTime={post.readingTime}
      />
      <h2 className="mb-24 mt-4 text-5xl font-extrabold leading-tight text-slate-900 dark:text-slate-300">
        {post.title}
      </h2>
      <article>
        <BlocksRenderer blocks={post.blocks} />
      </article>
      <Tags
        category={post.category}
        className="mb-20 mt-14 md:mt-20"
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