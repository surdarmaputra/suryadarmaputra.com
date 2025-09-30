import { SlPencil } from 'react-icons/sl';
import { twMerge } from 'tailwind-merge';

import { Post } from '~/modules/blog/types';
import { Project } from '~/modules/project/types';

import { HighlightCard } from './HighlightCard';

interface HighlightsSectionProps {
  className?: string;
  posts: Post[];
  projects: Project[];
}

export function HighlightsSection({
  className,
  posts,
  projects,
}: HighlightsSectionProps) {
  const highlightedProjects = projects.filter((item) => item.isHighlighted);
  const highlightedPosts = posts.filter((item) => item.isHighlighted);

  return (
    <div
      className={twMerge(
        'flex flex-col justify-center gap-4 md:flex-row',
        className,
      )}
    >
      {highlightedProjects?.map((item) => (
        <HighlightCard
          className="animate-enter-from-left animate-delay-75 md:w-1/3"
          description={item.highlightMessage || item.summary}
          href={`/work/${item.slug}`}
          key={item.id}
          title={item.title}
        />
      ))}
      {highlightedPosts?.map((item) => (
        <HighlightCard
          className="animate-enter-from-right animate-delay-75 md:w-1/3"
          description={item.highlightMessage || ''}
          href={`/blog/${item.slug}`}
          icon={<SlPencil />}
          key={item.slug}
          title={item.title}
        />
      ))}
    </div>
  );
}
