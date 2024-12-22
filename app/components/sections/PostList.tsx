import { PostMetaData } from '~/components/base/PostMetaData';
import { Tags } from '~/components/base/Tag';
import { Post } from '~/services/post.server';

interface PostListProps {
  className?: string;
  posts: Post[];
  showTitle?: boolean;
}

export function PostList({ className, posts, showTitle }: PostListProps) {
  if (!posts?.length) return null;

  const itemTitleClassName =
    'animated-link inline text-2xl font-bold text-slate-900 dark:text-slate-200';

  return (
    <div className={`relative flex flex-wrap md:-mx-8 ${className}`}>
      {showTitle && (
        <h2 className="absolute -left-4 -top-12 -z-10 mb-6 text-6xl font-bold text-slate-200 opacity-30 dark:text-slate-700 md:-top-4 md:left-2 md:text-7xl">
          Blog.
        </h2>
      )}
      {posts.map(
        (
          { date, excerpt, href, readingTime, title, category, tags },
          index,
        ) => (
          <div className="group p-0 pb-16 md:w-1/2 md:p-8" key={index}>
            <a className="block" href={href}>
              <PostMetaData date={date} readingTime={readingTime} />
              <div className="mb-4 mt-2">
                {showTitle ? (
                  <h3 className={itemTitleClassName}>{title}</h3>
                ) : (
                  <h2 className={itemTitleClassName}>{title}</h2>
                )}{' '}
              </div>
              <p className="mb-4 block text-sm font-light leading-6 text-slate-600 dark:text-slate-400">
                {excerpt}
              </p>
              <Tags category={category} tags={tags} />
            </a>
          </div>
        ),
      )}
    </div>
  );
}
