import { SlPencil, SlRocket, SlStar } from 'react-icons/sl';
import { twMerge } from 'tailwind-merge';

import { Post } from '~/modules/blog/types';
import { Campaign } from '~/modules/campaign/types';
import { Project } from '~/modules/project/types';

import { HighlightCard } from './HighlightCard';

interface HighlightsSectionProps {
  className?: string;
  posts: Post[];
  projects: Project[];
  campaigns?: Campaign[];
}

const campaignIconMap: Record<string, JSX.Element> = {
  rocket: <SlRocket />,
  pencil: <SlPencil />,
  star: <SlStar />,
  new: <SlStar />,
};

export function HighlightsSection({
  className,
  posts,
  projects,
  campaigns = [],
}: HighlightsSectionProps) {
  const highlightedProjects = projects.filter((item) => item.isHighlighted);
  const highlightedPosts = posts.filter((item) => item.isHighlighted);
  const highlightedCampaigns = campaigns;

  const getCampaignIcon = (icon?: Campaign['icon']) =>
    campaignIconMap[icon ?? ''] ?? <SlRocket />;

  return (
    <div
      className={twMerge(
        'container mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 md:justify-start lg:max-w-3xl',
        className,
      )}
    >
      {highlightedCampaigns?.map((item) => (
        <HighlightCard
          className="md:w-auto"
          description={item.message || ''}
          href={item.link.internal || item.link.external || '#'}
          icon={getCampaignIcon(item.icon)}
          key={item.id}
          title={item.title}
        />
      ))}
      {highlightedProjects?.map((item) => (
        <HighlightCard
          className="md:w-auto"
          description={item.highlightMessage || item.summary}
          href={`/works/${item.slug}`}
          key={item.id}
          title={item.title}
        />
      ))}
      {highlightedPosts?.map((item) => (
        <HighlightCard
          className="md:w-auto"
          description={item.highlightMessage || ''}
          href={`/posts/${item.slug}`}
          icon={<SlPencil />}
          key={item.slug}
          title={item.title}
        />
      ))}
    </div>
  );
}
