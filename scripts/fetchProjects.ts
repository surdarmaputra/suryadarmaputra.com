/* eslint-disable @typescript-eslint/ban-ts-comment */
import dotenv from 'dotenv';
import fs from 'fs/promises';
import { Image } from 'image-js';
import path from 'path';
import superagent from 'superagent';

dotenv.config();

/* eslint-disable import/first */
import {
  getFileExtensionFromUrl,
  getProperties,
  getTitle,
} from '../libs/notion';
import { fetchProjects } from './notionRequests';
/* eslint-enable import/first */

interface ProjectData {
  id: string;
  properties: Record<string, unknown>;
  title: string | null;
}

const extrasDirectory = path.resolve(__dirname, '../data');
const projectDataFile = path.join(extrasDirectory, 'projects.json');
const imagesDirectory = path.resolve(__dirname, '../public/images/projects');

async function fetchImage(url: string, filename: string): Promise<void> {
  const { body: imageData } = await superagent.get(url);
  const extension = getFileExtensionFromUrl(url);
  const outputFile = `${imagesDirectory}/${filename}.${extension}`;
  const placeholderFile = `${imagesDirectory}/${filename}-placeholder.png`;
  const placeholderRaw = await Image.load(imageData);
  const placeholderData = placeholderRaw.resize({ width: 50 }).toBuffer();

  await fs.writeFile(outputFile, imageData);
  await fs.writeFile(placeholderFile, placeholderData);
}

async function fetchImages(project: ProjectData): Promise<void> {
  if (!('properties' in project)) return;

  const { id, properties } = project;

  if (!Array.isArray(properties.thumbnail)) return;

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

/**
 * Regenerate project list in a JSON file alongside images for each projects
 * Step:
 *  - cleanup existing JSON file and images
 *  - fetch projects from Notion database
 *  - regenerate a JSON file and images based on Notion data
 */
async function run(): Promise<void> {
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
