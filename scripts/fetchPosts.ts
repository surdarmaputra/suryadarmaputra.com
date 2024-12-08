import dotenv from 'dotenv';
import fs from 'fs/promises';
import { Image } from 'image-js';
import { kebabCase } from 'lodash';
import path from 'path';
import superagent from 'superagent';

dotenv.config();

/* eslint-disable import/first */
import { getBlockChildren } from '~/libs/notion/index.server';
import { calculateReadingTime } from '~/libs/notion/utils.server';

import {
  BlockWithChildren,
  getExcerpt,
  getFileExtensionFromUrl,
  getProperties,
  getTitle,
  regroupListItems,
} from '../app/libs/notion';
import { fetchPosts } from './utils';
/* eslint-enable import/first */

interface PageData {
  blocks: BlockWithChildren[] | [];
  excerpt: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: Record<string, any>;
  readingTime: string;
  title: string | null;
}

const postsDirectory = path.resolve(__dirname, '../posts');
const imagesDirectory = path.resolve(__dirname, '../public/images/posts');

async function fetchImage(url: string, filename: string): Promise<void> {
  // eslint-disable-next-line no-console
  console.log({ url });
  const { body: imageData } = await superagent.get(url);
  const extension = getFileExtensionFromUrl(url);
  const outputFile = `${imagesDirectory}/${filename}.${extension}`;
  const placeholderFile = `${imagesDirectory}/${filename}-placeholder.png`;
  const placeholderRaw = await Image.load(imageData);
  const placeholderData = placeholderRaw.resize({ width: 50 }).toBuffer();

  await fs.writeFile(outputFile, imageData);
  await fs.writeFile(placeholderFile, placeholderData);
}

async function fetchImages(blocks: BlockWithChildren[]): Promise<void> {
  for (const { block, children } of blocks) {
    if ('type' in block && block.type !== 'image') {
      if (children?.length) {
        await fetchImages(children);
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
      await fetchImages(children);
    }
  }
}

export async function run(): Promise<void> {
  const rawPages = await fetchPosts();

  await fs.rm(postsDirectory, { force: true, recursive: true });
  await fs.mkdir(postsDirectory, { recursive: true });

  await fs.rm(imagesDirectory, { force: true, recursive: true });
  await fs.mkdir(imagesDirectory, { recursive: true });

  for (const page of rawPages) {
    const title = getTitle(page);
    const properties = getProperties(page);
    const originalBlocks = await getBlockChildren(page.id);
    const readingTime = calculateReadingTime(originalBlocks);
    const blocks = regroupListItems(originalBlocks);
    const excerpt = getExcerpt(blocks);
    const pageData: PageData = {
      title,
      excerpt,
      properties,
      readingTime,
      blocks,
    };
    const slug = title ? kebabCase(title) : null;
    const filePath = path.join(postsDirectory, `${slug}.json`);
    await fetchImages(originalBlocks);
    await fs.writeFile(filePath, JSON.stringify(pageData, null, 2));
    // eslint-disable-next-line no-console
    console.log('Generated: ', filePath);
  }
}

run();
