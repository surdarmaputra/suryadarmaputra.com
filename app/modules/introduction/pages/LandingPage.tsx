import { Post } from '~/modules/blog/types';
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
  return (
    <DefaultLayout>
      <div className="absolute right-0 top-24 z-10 h-72 w-72 rounded-full bg-amber-500 opacity-10 blur-3xl dark:bg-amber-800"></div>

      <BrandHero />
      <ProjectList
        className="mb-32 mt-44"
        featuredOnly
        projects={projects}
        showTitle
      />
      <PostList posts={posts} showTitle />
      {!posts?.length && !projects?.length ? (
        <div className="pb-48 pt-16 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      ) : null}
    </DefaultLayout>
  );
}
