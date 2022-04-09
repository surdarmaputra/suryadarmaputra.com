import fs from 'fs/promises';
import path from 'path';

import type { BlockWithChildren } from '~/libs/notion';

const postsPath = path.join(__dirname, '../posts');

export interface Post {
  category?: string;
  date: Date;
  excerpt: string;
  href: string;
  readingTime?: string;
  slug: string;
  tags?: Array<string>;
  title: string;
  updatedAt: Date;
}

export interface FullPost extends Post {
  blocks: BlockWithChildren[];
}

function formatPost(
  fileName: string,
  fileContent: any,
  isFullPost: boolean = false,
): Post | FullPost {
  // const { blocks, excerpt, properties, readingTime, title } = JSON.parse(
  //   fileContent.toString(),
  // );
  const { blocks, excerpt, properties, readingTime, title } = fileContent;
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

export async function getDir(): Promise<Record<string, string>> {
  // const cwd = process.cwd();
  // const pagesDir = path.join(__dirname, '..');
  // const pagesDirContent = await fs.readdir(pagesDir);
  // const outputDirContent = await fs.readdir(path.join(cwd, 'output'));
  // const serverDirContent = await fs.readdir(path.join(cwd, 'output', 'server'));

  // return {
  //   cwd,
  //   dirName: __dirname,
  //   pagesDir,
  //   pagesDirContent: JSON.stringify(pagesDirContent),
  //   outputDirContent: JSON.stringify(outputDirContent),
  //   serverDirContent: JSON.stringify(serverDirContent),
  // };
  return {};
}

export async function getPosts(): Promise<Post[]> {
  let files: string[];

  try {
    files = await fs.readdir(postsPath);
  } catch (error) {
    files = [];
  }

  const posts = await Promise.all(
    files.map(async (fileName) => {
      // const fileContent = await fs.readFile(path.join(postsPath, fileName));
      const fileContent = require(path.join(postsPath, fileName));
      return formatPost(fileName, fileContent);
    }),
  );

  return posts.sort(
    (first, second) => second.date.getTime() - first.date.getTime(),
  );
}

export async function getPost(
  slug: string | undefined,
): Promise<FullPost | null> {
  if (!slug) return null;

  const fileName = `${slug}.json`;
  let fileContent: Buffer | null;
  try {
    fileContent = await fs.readFile(path.join(postsPath, fileName));
  } catch (error) {
    fileContent = null;
  }

  const post = fileContent
    ? (formatPost(fileName, fileContent, true) as FullPost)
    : null;

  return post;
}
