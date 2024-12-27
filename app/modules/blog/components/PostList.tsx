import { Post } from '~/modules/blog/types';
import { PostMetaData } from '~/modules/core/components/base/PostMetaData';
import { Tags } from '~/modules/core/components/base/Tag';

export interface PostListProps {
  className?: string;
  posts: Post[];
  showTitle?: boolean;
}

import { forwardRef } from 'react';
import { SlPencil } from 'react-icons/sl';

import { SmartLink } from '~/modules/core/components/base/SmartLink';

export const PostList = forwardRef<HTMLDivElement, PostListProps>((props, ref) => {
  const { className, posts, showTitle } = props;

  if (!posts?.length) return null;

  const itemTitleClassName =
    'animated-link inline text-2xl font-bold text-slate-900 dark:text-slate-200';

  return (
    <section className={className} id="blog" ref={ref}>
      {showTitle && (
        <h2 className="inline-flex items-center gap-4 mb-10 text-2xl font-extrabold text-slate-800 dark:text-slate-200">
          <div className='relative w-8 h-8 rounded-full bg-amber-500 dark:bg-sky-900'>
            <SlPencil className='w-10 h-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
          </div>
          <div>
            Blog
          </div>
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-12">
        {posts.map(
          (
            { date, excerpt, href, readingTime, title, category, tags },
            index,
          ) => (
            <div className="group" key={index}>
              <SmartLink className="block" href={href}>
                <PostMetaData date={date} readingTime={readingTime} />
                <div className="mb-4 mt-2">
                  {showTitle ? (
                    <h3 className={itemTitleClassName}>{title}</h3>
                  ) : (
                    <h2 className={itemTitleClassName}>{title}</h2>
                  )}
                </div>
                <p className="mb-4 block text-sm font-light leading-6 text-slate-600 dark:text-slate-400">
                  {excerpt}
                </p>
                <Tags category={category} tags={tags} />
              </SmartLink>
            </div>
          ),
        )}
      </div>
    </section>
  );
});

PostList.displayName = 'PostList';
