/* eslint-disable no-console */

import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';
import dotenv from 'dotenv';
import { kebabCase } from 'lodash';
import { request } from 'undici';
import { parseString } from 'xml2js';

dotenv.config();

/* eslint-disable import/first */
import { getProperties, getTitle } from '~/libs/notion';

import { fetchPosts, fetchProjects } from './utils';
/* eslint-enable import/first */

interface FeedItem {
  title: string;
  description: string;
  author: string;
  pubDate: string;
  lastBuildDate: string;
  link: string;
  guid: string;
}

interface RSSFeed {
  rss: {
    channel: Array<{
      title: string;
      link: string;
      description: string;
      language: string;
      ttl: string;
      item: FeedItem[];
    }>;
  };
}

function normalizeUrl(urlString: string) {
  return new URL(urlString).href;
}

const baseUrl = normalizeUrl(process.env.BASE_URL || 'http://localhost:5173');
const blogUrl = `${baseUrl}blog/`;
const feedUrl = `${blogUrl}feed`;
const extrasUrl = `${baseUrl}extras.json`;

async function fetchRSS(): Promise<RSSFeed> {
  console.log(`Fetching RSS feed from ${feedUrl}`);

  const { body } = await request(feedUrl);
  const xmlString = await body.text();
  const xmlJson = await new Promise((resolve, reject) =>
    parseString(xmlString, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }),
  );

  return xmlJson as RSSFeed;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchExtras(): Promise<Record<string, any>> {
  console.log(`Fetching extras data feed from ${extrasUrl}`);

  const { body } = await request(extrasUrl);
  const json = await body.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return json as Record<string, any>;
}

function checkMissingOrOutdatedContent(
  feed: RSSFeed,
  notionPosts: GetPageResponse[],
): boolean {
  const feedItems =
    feed.rss?.channel[0]?.item?.map((item) => {
      const link = item.link[0];
      return {
        slug: link.replace(blogUrl, ''),
        lastBuildDate: item.lastBuildDate[0],
      };
    }) || [];

  const notionItems =
    notionPosts?.map((item) => {
      const properties = getProperties(item);
      const title = getTitle(item);
      return {
        slug: kebabCase(title || ''),
        updatedAt: new Date(properties.updated_at).toUTCString(),
      };
    }) || [];

  console.log('Pages from feed:');
  console.log(feedItems);
  console.log(`${feedItems.length} items`);
  console.log('--------------------------------');
  console.log('Pages from notion:');
  console.log(notionItems);
  console.log(`${notionPosts.length} items`);
  console.log('--------------------------------');

  if (feedItems.length !== notionPosts.length) {
    return true;
  }

  console.log('Checking differences:');
  const pagesUpdatedAtFromFeed: Record<string, string> = feedItems.reduce(
    (finalMap, { slug, lastBuildDate }) => {
      return {
        ...finalMap,
        [slug]: lastBuildDate,
      };
    },
    {},
  );
  const hasMissingOrOutdatedPosts = notionItems.some(({ slug, updatedAt }) => {
    const isMissing = !pagesUpdatedAtFromFeed[slug];
    const isOutdated = !isMissing && pagesUpdatedAtFromFeed[slug] !== updatedAt;

    console.log({
      slug,
      isMissing,
      isOutdated,
    });
    return isMissing || isOutdated;
  });
  console.log('--------------------------------');

  return hasMissingOrOutdatedPosts;
}

function checkMissingOrOutdatedExtras(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extras: Record<string, any>,
  notionProjects: GetPageResponse[],
): boolean {
  const existingProjects =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extras?.projects?.map(({ id, title, updatedAt }: Record<string, any>) => ({
      id,
      title,
      updatedAt,
    })) || [];
  const incomingProjects = notionProjects?.map((item) => {
    const properties = getProperties(item);
    const title = getTitle(item);
    return {
      id: item.id,
      title,
      updatedAt: properties.updated_at,
    };
  });

  console.log('Existing projects:');
  console.log(existingProjects);
  console.log(`${existingProjects.length} items`);
  console.log('--------------------------------');
  console.log('Incoming projects:');
  console.log(incomingProjects);
  console.log(`${incomingProjects.length} items`);
  console.log('--------------------------------');

  if (existingProjects.length !== incomingProjects.length) {
    return true;
  }

  console.log('Checking differences:');
  const existingProjectsUpdatedAt: Record<string, string> =
    existingProjects.reduce(
      (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        finalMap: Record<string, any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { id, updatedAt }: Record<string, any>,
      ) => {
        return {
          ...finalMap,
          [id]: updatedAt,
        };
      },
      {},
    );
  const hasMissingOrOutdatedExtras = incomingProjects.some(
    ({ id, title, updatedAt }) => {
      const isMissing = !existingProjectsUpdatedAt[id];
      const isOutdated =
        !isMissing && existingProjectsUpdatedAt[id] !== updatedAt;

      console.log({
        id,
        title,
        isMissing,
        isOutdated,
      });
      return isMissing || isOutdated;
    },
  );
  console.log('--------------------------------');

  return hasMissingOrOutdatedExtras;
}

async function triggerDeployment() {
  const url = process.env.NETLIFY_HOOK_URL;

  if (!url) {
    return 'No NETLIFY_HOOK_URL found. Skipping deployment.';
  }

  const { body } = await request(url, { method: 'POST' });
  const result = await body.json();
  return result;
}

async function run() {
  const feed = await fetchRSS();
  const extras = await fetchExtras();

  const notionPosts = await fetchPosts();
  const notionProjects = await fetchProjects();

  const hasMissingOrOutdatedPosts = checkMissingOrOutdatedContent(
    feed,
    notionPosts,
  );
  const hasMissingOrOutdatedExtras = checkMissingOrOutdatedExtras(
    extras,
    notionProjects,
  );
  const hasMissingOrOutdatedData =
    hasMissingOrOutdatedPosts || hasMissingOrOutdatedExtras;

  console.log('Has missing or outdated content: ', hasMissingOrOutdatedPosts);
  console.log('Has missing or outdated extras: ', hasMissingOrOutdatedExtras);
  console.log('Has missing or outdated data: ', hasMissingOrOutdatedData);

  let deploymentResult;

  if (hasMissingOrOutdatedData) {
    deploymentResult = await triggerDeployment();
  } else {
    deploymentResult = 'IGNORED';
  }

  console.log('Deployment status:');
  console.log(deploymentResult);
}

run();
