/* eslint-disable no-console */

import type { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';
import dotenv from 'dotenv';
import { kebabCase } from 'lodash';
import { request } from 'undici';
import { parseString } from 'xml2js';

dotenv.config();

/* eslint-disable import/first */
import { getProperties, getTitle } from '../src/modules/core/libs/notion';

import { fetchArticles, fetchProjects } from './utils';
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

const baseUrl = normalizeUrl(process.env.BASE_URL || 'http://localhost:4321');
const blogUrl = `${baseUrl}articles/`;
const feedUrl = `${blogUrl}feed`;
const siteDataUrl = `${baseUrl}api/site-data.json`;

function debugEnv() {
  console.log('=== Environment ===');
  console.log('BASE_URL:', process.env.BASE_URL ? '(set)' : '(not set)');
  console.log('NOTION_TOKEN:', process.env.NOTION_TOKEN ? '(set)' : '(not set)');
  console.log('NOTION_ARTICLES_DATABASE_ID:', process.env.NOTION_ARTICLES_DATABASE_ID ? '(set)' : '(not set)');
  console.log('NOTION_PROJECTS_DATABASE_ID:', process.env.NOTION_PROJECTS_DATABASE_ID ? '(set)' : '(not set)');
  console.log('NETLIFY_HOOK_URL:', process.env.NETLIFY_HOOK_URL ? '(set)' : '(not set)');
  console.log('Resolved feedUrl:', feedUrl);
  console.log('Resolved siteDataUrl:', siteDataUrl);
  console.log('==================');
}

async function fetchRSS(): Promise<RSSFeed> {
  console.log(`Fetching RSS feed from ${feedUrl}`);

  const response = await request(feedUrl);
  console.log('RSS feed HTTP status:', response.statusCode);
  console.log('RSS feed Content-Type:', response.headers['content-type']);

  const xmlString = await response.body.text();
  console.log('RSS feed response body (first 500 chars):', xmlString.slice(0, 500));

  const xmlJson = await new Promise((resolve, reject) =>
    parseString(xmlString, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }),
  );

  return xmlJson as RSSFeed;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchSiteData(): Promise<Record<string, any>> {
  console.log(`Fetching site data from ${siteDataUrl}`);

  const response = await request(siteDataUrl);
  console.log('Site data HTTP status:', response.statusCode);
  console.log('Site data Content-Type:', response.headers['content-type']);

  const text = await response.body.text();
  console.log('Site data response body (first 500 chars):', text.slice(0, 500));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return JSON.parse(text) as Record<string, any>;
}

function checkMissingOrOutdatedContent(
  feed: RSSFeed,
  notionArticles: GetPageResponse[],
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
    notionArticles?.map((item) => {
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
  console.log(`${notionArticles.length} items`);
  console.log('--------------------------------');

  if (feedItems.length !== notionArticles.length) {
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

function checkMissingOrOutdatedSiteData(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  siteData: Record<string, any>,
  notionProjects: GetPageResponse[],
): boolean {
  const existingProjects =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    siteData?.projects?.map(({ id, title, updatedAt }: Record<string, any>) => ({
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
  debugEnv();

  const feed = await fetchRSS();
  const siteData = await fetchSiteData();

  console.log('Fetching articles from Notion...');
  const notionArticles = await fetchArticles();
  console.log(`Fetched ${notionArticles.length} articles from Notion`);

  console.log('Fetching projects from Notion...');
  const notionProjects = await fetchProjects();
  console.log(`Fetched ${notionProjects.length} projects from Notion`);

  const hasMissingOrOutdatedArticles = checkMissingOrOutdatedContent(
    feed,
    notionArticles,
  );
  const hasMissingOrOutdatedExtras = checkMissingOrOutdatedSiteData(
    siteData,
    notionProjects,
  );
  const hasMissingOrOutdatedData =
    hasMissingOrOutdatedArticles || hasMissingOrOutdatedExtras;

  console.log('Has missing or outdated content: ', hasMissingOrOutdatedArticles);
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

