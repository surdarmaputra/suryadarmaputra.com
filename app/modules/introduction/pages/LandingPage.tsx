import { useRef } from 'react';

import { PostList } from '~/modules/blog/components/PostList';
import { Post } from '~/modules/blog/types';
import { DefaultLayout } from '~/modules/core/components/layouts/DefaultLayout';
import { ProjectCarousel } from '~/modules/project/components/ProjectCarousel';
import { Project } from '~/modules/project/types';

import { BrandHero } from '../components/BrandHero';
import GetInTouchSection from '../components/GetInTouchSection';

export interface LandingPageProps {
  projects: Project[];
  posts: Post[];
}

export default function LandingPage({ posts, projects }: LandingPageProps) {
  const projectListRef = useRef<HTMLDivElement>(null);
  const postListRef = useRef<HTMLDivElement>(null);
  const getInTouchRef = useRef<HTMLDivElement>(null);

  return (
    <DefaultLayout isFooterLinksVisible={false}>
      <div className="absolute right-0 top-24 z-10 h-72 w-72 rounded-full bg-red-400 opacity-10 blur-3xl dark:bg-cyan-50"></div>
      <div className="absolute left-0 top-72 z-10 h-72 w-72 rounded-full bg-cyan-400 opacity-10 blur-3xl dark:bg-cyan-600"></div>

      <BrandHero />

      <ProjectCarousel
        className='-mx-6'
        projects={projects}
        ref={projectListRef}
      />

      <PostList
        className="mb-32 mt-14 pt-16 md:mt-4 md:pt-28"
        isTitleVisible
        posts={posts}
        ref={postListRef}
      />

      <GetInTouchSection className="mb-24 mt-4 pt-20" ref={getInTouchRef} />

      {!posts?.length && !projects?.length ? (
        <div className="pb-48 pt-16 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      ) : null}
    </DefaultLayout>
  );
}
