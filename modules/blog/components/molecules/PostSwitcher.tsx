import Link from 'next/link';

import { ArrowLeft } from '@/libs/core/components/atoms/Icon/ArrowLeft';
import { ArrowRight } from '@/libs/core/components/atoms/Icon/ArrowRight';
import { Post } from '@/libs/core/types';

interface PostSwitcherProps {
  className?: string;
  previousPost: Post | null;
  nextPost: Post | null;
}

interface PostLinkProps {
  post: Post | null;
  next?: boolean;
}

const maxTitleLength = 35;

function formatTitle(title: string): string {
  return title.length > maxTitleLength
    ? `${title.slice(0, maxTitleLength)}...`
    : title;
}

function PostLink({ post, next = false }: PostLinkProps) {
  const wrapperClassName = `
    flex flex-col basis-full py-3 px-4 md:mx-2 mb-4 md:mb-0 rounded-md text-slate-400 
    ${next ? 'items-end text-right' : ''}
  `;

  if (!post) {
    return <div className={wrapperClassName} />;
  }

  return (
    <Link
      className={`${wrapperClassName} border-2 border-slate-200 transition hover:border-slate-300 hover:text-slate-500`}
      href={post.href}
      title={post.title}
    >
      {next ? <ArrowRight className="mb-2" /> : <ArrowLeft className="mb-2" />}
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
