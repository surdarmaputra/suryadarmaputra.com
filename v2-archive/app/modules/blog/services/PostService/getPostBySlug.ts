import fs from 'fs/promises';
import path from 'path';

import { POSTS_DIR } from '../../constants';
import { FullPost } from '../../types';
import { formatPost } from '../../utils/formatPost';

export async function getPostBySlug(
  slug: string | undefined,
): Promise<FullPost | null> {
  if (!slug) return null;

  const fileName = `${slug}.json`;
  let fileContent: Buffer | null;
  try {
    fileContent = await fs.readFile(path.join(POSTS_DIR, fileName));
  } catch (error) {
    fileContent = null;
  }

  const post = fileContent
    ? (formatPost(fileName, fileContent, true) as FullPost)
    : null;

  return post;
}
