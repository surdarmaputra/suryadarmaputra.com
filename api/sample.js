// API placeholder
import fs from 'fs/promises';
import path from 'path';

import { getPosts } from '../app/services/post.server';

async function getDir() {
  const dirNameContent = await fs.readdir(path.join(__dirname));

  return {
    dirName: __dirname,
    dirNameContent: JSON.stringify(dirNameContent),
  };
}

export default async function (request, response) {
  const dir = await getDir();
  const posts = await getPosts();
  response.status(200).json({
    dir,
    posts,
  });
}