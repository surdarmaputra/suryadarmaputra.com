import HeroSection from '~/modules/core/components/base/HeroSection';

import { PostList } from '../components/PostList';
import { Post } from '../types';

export interface PostListPageProps {
  posts: Post[];
}

export default function PostListPage({ posts }: PostListPageProps) {
  return (
    <>
      <HeroSection
        description="Software engineering, learning materials, experiments and opinions."
        title="Blog"
      />
      {posts?.length ? (
        <PostList className='pt-8 md:pt-0 md:pb-20 pb-16' posts={posts} />
      ) : (
        <div className="pb-48 pt-16 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      )}
    </>
  );
}
