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
            <div className="relative h-4 w-4 rounded-full bg-amber-500 dark:bg-slate-800">
              <SlPencil className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>Blog</div>
          </>
        }
      />
      {posts?.length ? (
        <PostList className="pb-16 pt-8 md:pb-20 md:pt-0" posts={posts} />
      ) : (
        <div className="pb-48 pt-16 text-center text-4xl font-bold text-slate-200 dark:text-slate-700">
          Content is coming soon!
        </div>
      )}
    </>
  );
}
