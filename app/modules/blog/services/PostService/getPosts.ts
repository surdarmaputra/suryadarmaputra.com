import fs from 'fs/promises';
import path from 'path';

import { POSTS_DIR } from '../../constants';
import { Post } from '../../types';
import { formatPost } from '../../utils/formatPost';

export async function getPosts(): Promise<Post[]> {
  const postsDir = path.resolve(POSTS_DIR);
  let files: string[];

  try {
    files = await fs.readdir(postsDir);
  } catch (error) {
    files = [];
  }

  const posts = await Promise.all(
    files.map(async (fileName) => {
      const fileContent = await fs.readFile(path.join(postsDir, fileName));
      return formatPost(fileName, fileContent);
    }),
  );

  return posts.sort(
    (first, second) => second.date.getTime() - first.date.getTime(),
  );
}
