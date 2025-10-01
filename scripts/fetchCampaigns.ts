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
import { fetchCampaigns } from './utils';
/* eslint-enable import/first */

interface CampaignData {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: Record<string, any>;
  title: string | null;
}

const extrasDirectory = path.resolve(__dirname, '../extras');
const campaignDataFile = path.join(extrasDirectory, 'campaigns.json');
const imagesDirectory = path.resolve(__dirname, '../public/images/campaigns');

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

async function fetchThumbnailImages(campaign: CampaignData): Promise<void> {
  if (!('properties' in campaign)) return;
  const { id, properties } = campaign;
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
  const rawCampaigns = await fetchCampaigns();

  await fs.rm(campaignDataFile, { force: true, recursive: true });
  await fs.mkdir(extrasDirectory, { recursive: true });

  await fs.rm(imagesDirectory, { force: true, recursive: true });
  await fs.mkdir(imagesDirectory, { recursive: true });

  const campaignsData: CampaignData[] = [];
  for (const campaign of rawCampaigns) {
    const title = getTitle(campaign);
    const properties = getProperties(campaign);

    // eslint-disable-next-line no-console
    console.log(`Fetching campaign: ${title}`);

    const campaignData: CampaignData = {
      id: campaign.id,
      title,
      properties,
    };

    await fetchThumbnailImages(campaignData);
    campaignsData.push(campaignData);
    // eslint-disable-next-line no-console
    console.log(`Campaign fetched: ${title}`);
  }

  await fs.writeFile(campaignDataFile, JSON.stringify(campaignsData, null, 2));
  // eslint-disable-next-line no-console
  console.log('Generated: ', campaignDataFile);
}

run();
