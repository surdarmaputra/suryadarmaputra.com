import { useRef } from 'react';

import { PostList } from '~/modules/blog/components/PostList';
import { Post } from '~/modules/blog/types';
import ScrollGuide from '~/modules/core/components/base/ScrollGuide';
import { DefaultLayout } from '~/modules/core/components/layouts/DefaultLayout';
import { ProjectList } from '~/modules/project/components/ProjectList';
import { Project } from '~/modules/project/types';

import { AboutMeShortSection } from '../components/AboutMeShortSection';
import { BrandHero } from '../components/BrandHero';
import GetInTouchSection from '../components/GetInTouchSection';

export interface LandingPageProps {
  projects: Project[];
  posts: Post[];
}

export default function LandingPage({ posts, projects }: LandingPageProps) {
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const projectListRef = useRef<HTMLDivElement>(null);
  const postListRef = useRef<HTMLDivElement>(null);
  const getInTouchRef = useRef<HTMLDivElement>(null);

  const handleClickScrollToAboutMe = () => {
    aboutMeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClickScrollToProject = () => {
    projectListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClickScrollToPost = () => {
    postListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClickScrollToGetInTouch = () => {
    getInTouchRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <DefaultLayout isFooterLinksVisible={false}>
      <div className="absolute right-0 top-24 z-10 h-72 w-72 rounded-full bg-red-400 opacity-10 blur-3xl dark:bg-cyan-50"></div>
      <div className="absolute left-0 top-72 z-10 h-72 w-72 rounded-full bg-cyan-400 opacity-10 blur-3xl dark:bg-cyan-600"></div>

      <BrandHero />

      <ScrollGuide onClick={handleClickScrollToAboutMe} />
      <AboutMeShortSection
        className='mb-32 mt-14 pt-16 md:mt-4 md:pt-28'
        isActionsVisible
        isTitleVisible
        onClickExploreMyWork={handleClickScrollToProject}
        ref={aboutMeRef}
      />

      {Boolean(projects?.length) && <ScrollGuide onClick={handleClickScrollToProject} />}
      <ProjectList
        className="mb-32 mt-14 pt-16 md:mt-4 md:pt-28"
        featuredOnly
        isTitleVisible
        projects={projects}
        ref={projectListRef}
      />

      {Boolean(posts?.length) && <ScrollGuide onClick={handleClickScrollToPost} />}
      <PostList className='mb-32 mt-14 pt-16 md:mt-4 md:pt-28' isTitleVisible posts={posts} ref={postListRef} />

      <ScrollGuide onClick={handleClickScrollToGetInTouch} />
      <GetInTouchSection className='mt-4 mb-24 pt-20' ref={getInTouchRef} />
      <ScrollGuide className='rotate-180' onClick={handleClickScrollToGetInTouch} />

      {!posts?.length && !projects?.length ? (
        <div className="pb-48 pt-16 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      ) : null}
    </DefaultLayout>
  );
}
