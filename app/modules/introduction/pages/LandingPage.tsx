import { useRef } from 'react';

import { Post } from '~/modules/blog/types';
import ScrollGuide from '~/modules/core/components/base/ScrollGuide';
import { DefaultLayout } from '~/modules/core/components/layouts/DefaultLayout';
import { BrandHero } from '~/modules/core/components/sections/BrandHero';
import { PostList } from '~/modules/core/components/sections/PostList';
import { ProjectList } from '~/modules/core/components/sections/ProjectList';
import { Project } from '~/modules/project/types';

export interface LandingPageProps {
  projects: Project[];
  posts: Post[];
}

export default function LandingPage({ posts, projects }: LandingPageProps) {
  const projectListRef = useRef<HTMLDivElement>(null);
  const postListRef = useRef<HTMLDivElement>(null);

  const handleClickScrollToProject = () => {
    projectListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClickScrollToPost = () => {
    postListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <DefaultLayout>
      <div className="absolute right-0 top-24 z-10 h-72 w-72 rounded-full bg-red-400 opacity-10 blur-3xl dark:bg-cyan-50"></div>
      <div className="absolute left-0 top-72 z-10 h-72 w-72 rounded-full bg-cyan-400 opacity-10 blur-3xl dark:bg-cyan-600"></div>

      <BrandHero />
      <ScrollGuide onClick={handleClickScrollToProject} />
      <ProjectList
        className="mb-32 mt-32"
        featuredOnly
        projects={projects}
        ref={projectListRef}
        showTitle
      />
      <ScrollGuide className='mb-32' onClick={handleClickScrollToPost} />
      <PostList posts={posts} ref={postListRef} showTitle />
      {!posts?.length && !projects?.length ? (
        <div className="pb-48 pt-16 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      ) : null}
    </DefaultLayout>
  );
}
