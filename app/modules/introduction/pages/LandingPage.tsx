import { lazy } from 'react';

import { Post } from '~/modules/blog/types';
import { DefaultLayout } from '~/modules/core/components/layouts/DefaultLayout';
import { ProjectCarousel } from '~/modules/project/components/ProjectCarousel';
import { Project } from '~/modules/project/types';

import { BrandHero } from '../components/BrandHero';
import { HighlightsSection } from '../components/HighlightsSection';

const PostList = lazy(() =>
  import('~/modules/blog/components/PostList').then((mod) => ({
    default: mod.PostList,
  })),
);
const GetInTouchSection = lazy(() => import('../components/GetInTouchSection'));

export interface LandingPageProps {
  projects: Project[];
  posts: Post[];
}

export default function LandingPage({ posts, projects }: LandingPageProps) {
  return (
    <DefaultLayout isFooterLinksVisible={false}>
      <div className="absolute right-0 top-24 z-10 h-72 w-72 rounded-full bg-red-400 opacity-10 blur-3xl dark:bg-sky-800"></div>
      <div className="absolute left-0 top-72 z-10 h-72 w-72 rounded-full bg-cyan-400 opacity-10 blur-3xl dark:bg-cyan-600"></div>

      <BrandHero className="z-20 py-12" />

      <HighlightsSection
        className="pb-12 pt-8"
        posts={posts}
        projects={projects}
      />

      <ProjectCarousel
        className="z-10 -mx-6 overflow-hidden py-12 lg:py-20"
        projects={projects}
      />

      <PostList
        className="mx-auto py-12 md:w-max lg:py-16"
        isTitleVisible
        posts={posts}
      />

      <GetInTouchSection className="py-10" />

      {!posts?.length && !projects?.length ? (
        <div className="pb-48 pt-16 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      ) : null}
    </DefaultLayout>
  );
}
