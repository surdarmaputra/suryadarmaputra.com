import dotenv from 'dotenv';
import fs from 'fs/promises';
import { Image } from 'image-js';
import path from 'path';
import { fileURLToPath } from 'url';
import { request } from 'undici';

dotenv.config();

/* eslint-disable import/first */
import {
  type BlockWithChildren,
  getFileExtensionFromUrl,
  getProperties,
  getTitle,
  regroupListItems,
} from '../src/modules/core/libs/notion';
import { getBlockChildren } from '../src/modules/core/libs/notion/client';

import { fetchProjects } from './utils';
/* eslint-enable import/first */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ProjectData {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: Record<string, any>;
  title: string | null;
  blocks: BlockWithChildren[] | [];
}

const siteDataDirectory = path.resolve(__dirname, '../src/_generated/data/site');
const projectDataFile = path.join(siteDataDirectory, 'projects.json');
const imagesDirectory = path.resolve(__dirname, '../public/images/projects');

async function fetchImage(url: string, filename: string): Promise<void> {
  const { body } = await request(url);
  const imageData = await body.arrayBuffer();
  const imageBuffer = Buffer.from(imageData);

  const extension = getFileExtensionFromUrl(url);
  const outputFile = `${imagesDirectory}/${filename}.${extension}`;
  const placeholderFile = `${imagesDirectory}/${filename}-placeholder.png`;
  const placeholderRaw = await Image.load(imageBuffer);
  const placeholderData = placeholderRaw.resize({ width: 50 }).toBuffer();

  await fs.writeFile(outputFile, imageBuffer);
  await fs.writeFile(placeholderFile, placeholderData);
}

async function fetchThumbnailImages(project: ProjectData): Promise<void> {
  if (!('properties' in project)) return;

  const { id, properties } = project;

  if (!Array.isArray(properties.thumbnail)) return;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let index = 0;
  for (const thumbnail of properties.thumbnail) {
    if ('url' in thumbnail.file) {
      const fileName = `${id}-${index}`;
      await fetchImage(thumbnail.file.url, fileName);
    }
    index++;
  }
}

async function fetchContentImages(blocks: BlockWithChildren[]): Promise<void> {
  for (const { block, children } of blocks) {
    if ('type' in block && block.type !== 'image') {
      if (children?.length) {
        await fetchContentImages(children);
      } else {
        continue;
      }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const url = block.image?.file?.url || null;
    if (!url) continue;

    const fileName = block.id;
    await fetchImage(url, fileName);

    if (children?.length) {
      await fetchContentImages(children);
    }
  }
}

export async function run(): Promise<void> {
  const rawProjects = await fetchProjects();

  await fs.rm(projectDataFile, { force: true, recursive: true });
  await fs.mkdir(siteDataDirectory, { recursive: true });

  await fs.rm(imagesDirectory, { force: true, recursive: true });
  await fs.mkdir(imagesDirectory, { recursive: true });

  const projectsData: ProjectData[] = [];
  for (const project of rawProjects) {
    const title = getTitle(project);
    const properties = getProperties(project);

    // eslint-disable-next-line no-console
    console.log(`Fetching project detail: ${title}`);
    const originalBlocks = await getBlockChildren(project.id);
    const blocks = regroupListItems(originalBlocks);
    const projectData: ProjectData = {
      id: project.id,
      title,
      properties,
      blocks,
    };

    await fetchThumbnailImages(projectData);
    await fetchContentImages(projectData.blocks);
    projectsData.push(projectData);
    // eslint-disable-next-line no-console
    console.log(`Project detail fetched: ${title}`);
  }

  await fs.writeFile(projectDataFile, JSON.stringify(projectsData, null, 2));
  // eslint-disable-next-line no-console
  console.log('Generated: ', projectDataFile);
}

run();

