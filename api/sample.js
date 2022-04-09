// API placeholder
import fs from 'fs/promises';
import path from 'path';

async function getDir() {
  const dirNameContent = await fs.readdir(path.join(__dirname));

  return {
    dirName: __dirname,
    dirNameContent: JSON.stringify(dirNameContent),
  };
}

export default async function (request, response) {
  const dir = getDir();
  response.status(200).json(dir);
}