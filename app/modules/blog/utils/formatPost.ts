import { FullPost, Post } from '../types';

export function formatPost(
  fileName: string,
  fileContent: Buffer,
  isFullPost: boolean = false,
): Post | FullPost {
  const { blocks, excerpt, properties, readingTime, title } = JSON.parse(
    fileContent.toString(),
  );
  const date = properties.custom_created_at
    ? new Date(properties.custom_created_at)
    : new Date(properties.created_at);
  const updatedAt = new Date(properties.updated_at);
  const slug = fileName.replace(/\.json$/, '');
  const href = `/blog/${slug}`;

  return {
    category: properties.category,
    date,
    excerpt,
    href,
    readingTime,
    slug,
    tags: properties.tags,
    title,
    updatedAt,
    ...(isFullPost ? { blocks } : {}),
  };
}