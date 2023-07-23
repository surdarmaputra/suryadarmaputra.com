import { PostList } from '@/libs/core/components/organisms/PostList';
import { ProjectList } from '@/libs/core/components/organisms/ProjectList';
import { Post, Project } from '@/libs/core/types';
import { BrandHero } from '@/modules/home/components/organisms/BrandHero';

export default function Home() {
  const projects: Project[] = [];
  const posts: Post[] = [];
  return (
    <>
      <div className="absolute right-0 top-24 -z-10 h-72 w-72 rounded-full bg-amber-500 opacity-5 blur-3xl dark:bg-amber-800"></div>

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
    </>
  );
}
