import fs from 'fs/promises';
import path from 'path';

const postsPath = path.join(__dirname, '../posts');

export interface Post {
  date: Date;
  excerpt: string;
  href: string;
  tags?: Array<string>;
  title: string;
  slug: string;
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
      const file = await fs.readFile(path.join(postsPath, fileName));
      const { excerpt, properties, title } = JSON.parse(file.toString());
      const date = properties.custom_created_at
        ? new Date(properties.custom_created_at)
        : new Date(properties.created_at);
      const slug = fileName.replace(/\.json$/, '');
      const href = `/blog/${slug}`;

      return {
        date,
        excerpt,
        href,
        slug,
        tags: properties.tags,
        title,
      };
    }),
  );

  return posts.sort(
    (first, second) => second.date.getTime() - first.date.getTime(),
  );
}
