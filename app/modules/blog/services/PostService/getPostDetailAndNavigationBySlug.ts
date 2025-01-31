import { FullPost, Post } from '../../types';
import { getPostBySlug } from './getPostBySlug';
import { getPosts } from './getPosts';

export async function getPostDetailAndNavigationBySlug(
  slug: string,
): Promise<{
  post: FullPost | null;
  previousPost: Post | null;
  nextPost: Post | null;
}> {
  const posts = await getPosts();
  const post = await getPostBySlug(slug);
  const currentPostIndex = posts.findIndex((item) => item.slug === slug);
  const previousPost =
    currentPostIndex > 0 ? posts[currentPostIndex - 1] : null;
  const nextPost =
    currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null;

  return {
    post,
    previousPost,
    nextPost,
  };
}
