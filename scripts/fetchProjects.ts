import dotenv from 'dotenv';
import fs from 'fs/promises';
import { Image } from 'image-js';
import path from 'path';

dotenv.config();

/* eslint-disable import/first */
import { request } from 'undici';

import {
  getFileExtensionFromUrl,
  getProperties,
  getTitle,
} from '../app/libs/notion';
import { fetchProjects } from './utils';
/* eslint-enable import/first */

interface ProjectData {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: Record<string, any>;
  title: string | null;
}

const extrasDirectory = path.resolve(__dirname, '../extras');
const projectDataFile = path.join(extrasDirectory, 'projects.json');
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

async function fetchImages(project: ProjectData): Promise<void> {
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

export async function run(): Promise<void> {
  const rawProjects = await fetchProjects();

  await fs.rm(projectDataFile, { force: true, recursive: true });
  await fs.mkdir(extrasDirectory, { recursive: true });

  await fs.rm(imagesDirectory, { force: true, recursive: true });
  await fs.mkdir(imagesDirectory, { recursive: true });

  const projectsData: ProjectData[] = [];
  for (const project of rawProjects) {
    const title = getTitle(project);
    const properties = getProperties(project);
    const projectData: ProjectData = {
      id: project.id,
      title,
      properties,
    };

    await fetchImages(projectData);
    projectsData.push(projectData);
  }

  await fs.writeFile(projectDataFile, JSON.stringify(projectsData, null, 2));
  // eslint-disable-next-line no-console
  console.log('Generated: ', projectDataFile);
}

run();
