import { PostMetaData } from '~/components/base/PostMetaData';
import { Tags } from '~/components/base/Tag';

interface PostSummaryProps {
  category?: string;
  date: Date;
  excerpt: string;
  href: string;
  readingTime?: string;
  tags?: Array<string>;
  title: string;
}

export default function PostSummary({
  category,
  date,
  excerpt,
  href,
  readingTime,
  tags,
  title,
}: PostSummaryProps) {
  return (
    <div className="md:p-8 md:w-1/2 p-0 pb-16">
      <a className="block" href={href}>
        <PostMetaData date={date} readingTime={readingTime} />
        <div className="mt-2 mb-4">
          <h2 className="inline text-2xl text-slate-900 dark:text-slate-200 font-semibold animated-underline">
            {title}
          </h2>
        </div>
        <p className="block mb-4 text-slate-600 dark:text-slate-400 font-light text-sm leading-6">
          {excerpt}
        </p>
        <Tags category={category} tags={tags} />
      </a>
    </div>
  );
}
