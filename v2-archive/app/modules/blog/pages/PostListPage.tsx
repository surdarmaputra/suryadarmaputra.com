import { SlPencil } from 'react-icons/sl';

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
        title={
          <>
            <div className="relative h-4 w-4 rounded-full bg-amber-500 md:h-8 md:w-8 dark:bg-slate-800">
              <SlPencil className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 md:h-10 md:w-10" />
            </div>
            <div>Articles</div>
          </>
        }
      />
      {posts?.length ? (
        <PostList className="pt-8 pb-16 md:pt-0 md:pb-20" posts={posts} />
      ) : (
        <div className="pt-16 pb-48 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      )}
    </>
  );
}
