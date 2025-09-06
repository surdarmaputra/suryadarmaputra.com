import { Post } from '~/modules/blog/types';
import { PostMetaData } from '~/modules/core/components/base/PostMetaData';

export interface PostListProps {
  className?: string;
  posts: Post[];
  isTitleVisible?: boolean;
}

import { forwardRef } from 'react';
import { SlPencil } from 'react-icons/sl';
import { twMerge } from 'tailwind-merge';

import { SmartLink } from '~/modules/core/components/base/SmartLink';

export const PostList = forwardRef<HTMLDivElement, PostListProps>(
  (props, ref) => {
    const { className, posts, isTitleVisible } = props;

    if (!posts?.length) return null;

    const itemTitleClassName =
      'animated-link inline text-sm md:text-base font-light leading-tight tracking-tight text-slate-900 dark:text-slate-200';

    return (
      <section
        className={twMerge('container mx-auto lg:max-w-5xl', className)}
        id="blog"
        ref={ref}
      >
        {isTitleVisible && (
          <h2 className="mb-4 inline-flex w-full items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200 md:mb-12 md:justify-center md:text-4xl">
            <div className="relative h-3 w-3 rounded-full bg-amber-500 dark:bg-slate-800">
              <SlPencil className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>Blog</div>
          </h2>
        )}
        <div className="mx-auto flex flex-col gap-4 md:w-max">
          {posts.map(({ date, href, readingTime, title }, index) => (
            <div className="group" key={index}>
              <SmartLink className="block" href={href}>
                <PostMetaData date={date} readingTime={readingTime} />
                {isTitleVisible ? (
                  <h3 className={itemTitleClassName}>{title}</h3>
                ) : (
                  <h2 className={itemTitleClassName}>{title}</h2>
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
