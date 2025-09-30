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
    <div className={twMerge('flex flex-col gap-4', className)}>
      {highlightedProjects?.map((item) => (
        <HighlightCard
          description={item.highlightMessage || item.summary}
          href={`/work/${item.slug}`}
          key={item.id}
          title={item.title}
        />
      ))}
      {highlightedPosts?.map((item) => (
        <HighlightCard
          description={item.highlightMessage || ''}
          href={`/work/${item.slug}`}
          key={item.slug}
          title={item.title}
        />
      ))}
    </div>
  );
}
