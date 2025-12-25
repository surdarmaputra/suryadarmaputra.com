import { SlArrowLeftCircle, SlArrowRightCircle } from 'react-icons/sl';
import { Link } from 'react-router';

import { Post } from '~/modules/blog/types';

export interface PostSwitcherProps {
  className?: string;
  previousPost: Post | null;
  nextPost: Post | null;
}

export interface PostLinkProps {
  post: Post | null;
  next?: boolean;
}

const maxTitleLength = 32;

function formatTitle(title: string): string {
  return title.length > maxTitleLength
    ? `${title.slice(0, maxTitleLength)}...`
    : title;
}

function PostLink({ post, next = false }: PostLinkProps) {
  const wrapperClassName = `
    flex gap-3 items-center py-3 px-4 md:mx-2 mb-4 md:mb-0 rounded-full text-slate-400 
    ${next ? 'flex-row-reverse justify-end text-right' : 'flex-row justify-start text-left'}
  `;

  if (!post) {
    return <div className={wrapperClassName} />;
  }

  return (
    <Link
      className={`${wrapperClassName} border border-slate-300 transition hover:border-slate-400 hover:text-slate-500`}
      prefetch="viewport"
      title={post.title}
      to={post.href}
      viewTransition
    >
      {next ? <SlArrowRightCircle /> : <SlArrowLeftCircle />}
      <div>{formatTitle(post.title)}</div>
    </Link>
  );
}

export function PostSwitcher({
  className,
  previousPost,
  nextPost,
}: PostSwitcherProps) {
  return (
    <section
      className={`flex flex-col justify-between md:flex-row ${className}`}
    >
      <PostLink post={previousPost} />
      <PostLink next post={nextPost} />
    </section>
  );
}
