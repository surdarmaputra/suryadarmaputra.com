import { forwardRef } from 'react';
import { SlPencil } from 'react-icons/sl';
import { twMerge } from 'tailwind-merge';

import { Post } from '~/modules/blog/types';
import { PostMetaData } from '~/modules/core/components/base/PostMetaData';
import { SmartLink } from '~/modules/core/components/base/SmartLink';

export interface PostListProps {
  className?: string;
  posts: Post[];
  isTitleVisible?: boolean;
}

export const PostList = forwardRef<HTMLDivElement, PostListProps>(
  (props, ref) => {
    const { className, posts, isTitleVisible } = props;
    const itemTitleClassName =
      'text-sm md:text-base leading-snug tracking-tight';

    if (!posts?.length) return null;

    return (
      <section
        className={twMerge(
          'animate-enter-from-bottom container mx-auto lg:max-w-3xl',
          className,
        )}
        id="posts"
        ref={ref}
      >
        {isTitleVisible && (
          <h2 className="mb-4 inline-flex w-full items-center gap-2 text-xl font-semibold text-slate-800 md:mb-12 md:justify-center md:text-4xl dark:text-slate-200">
            <div className="relative h-3 w-3 rounded-full bg-amber-500 md:h-6 md:w-6 dark:bg-slate-800">
              <SlPencil className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 md:h-8 md:w-8" />
            </div>
            <div>Articles</div>
          </h2>
        )}
        <div className="flex w-full flex-col gap-5">
          {posts.map(({ date, href, readingTime, title }, index) => (
            <div className="group" key={index}>
              <SmartLink className="block" href={href}>
                <PostMetaData
                  className="mb-1"
                  date={date}
                  readingTime={readingTime}
                />
                {isTitleVisible ? (
                  <h3 className={itemTitleClassName}>
                    <span className="animated-link text-slate-600 dark:text-slate-100">
                      {title}
                    </span>
                  </h3>
                ) : (
                  <h2 className={itemTitleClassName}>
                    <span className="animated-link text-slate-600 dark:text-slate-100">
                      {title}
                    </span>
                  </h2>
                )}
              </SmartLink>
            </div>
          ))}
        </div>
      </section>
    );
  },
);

PostList.displayName = 'PostList';
