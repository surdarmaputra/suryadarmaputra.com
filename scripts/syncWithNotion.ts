/* eslint-disable no-console */

import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';
import dotenv from 'dotenv';
import { kebabCase } from 'lodash';
import superagent from 'superagent';
import { parseString } from 'xml2js';

dotenv.config();

/* eslint-disable import/first */
import { getProperties, getTitle } from '../app/libs/notion';
import { fetchPosts } from './utils';
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

const baseUrl = normalizeUrl(process.env.BASE_URL || '');
const blogUrl = `${baseUrl}blog/`;
const feedUrl = `${blogUrl}feed`;

async function fetchRSS(): Promise<RSSFeed> {
  console.log(`Fetching RSS feed from ${feedUrl}`);

  const { body: xmlString } = await superagent.get(feedUrl);
  const xmlJson = await new Promise((resolve, reject) =>
    parseString(xmlString, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }),
  );

  return xmlJson as RSSFeed;
}

function checkMissingOrOutdatedContent(
  feed: RSSFeed,
  notionPosts: GetPageResponse[],
): boolean {
  const feedItems =
    feed.rss?.channel[0]?.item.map((item) => {
      const link = item.link[0];
      return {
        slug: link.replace(blogUrl, ''),
        lastBuildDate: item.lastBuildDate[0],
      };
    }) || [];

  const notionItems = notionPosts.map((item) => {
    const properties = getProperties(item);
    const title = getTitle(item);
    return {
      slug: kebabCase(title || ''),
      updatedAt: new Date(properties.updated_at).toUTCString(),
    };
  });

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
  const hasMissingOrOutdatedContent = notionItems.some(
    ({ slug, updatedAt }) => {
      const isMissing = !pagesUpdatedAtFromFeed[slug];
      const isOutdated =
        !isMissing && pagesUpdatedAtFromFeed[slug] !== updatedAt;

      console.log({
        slug,
        isMissing,
        isOutdated,
      });
      return isMissing || isOutdated;
    },
  );
  console.log('--------------------------------');

  return hasMissingOrOutdatedContent;
}

async function triggerDeployment() {
  const url = process.env.NETLIFY_HOOK_URL;

  if (!url) {
    return 'No NETLIFY_HOOK_URL found. Skipping deployment.';
  }

  const { body } = await superagent.post(url);
  return body;
}

async function run() {
  const feed = await fetchRSS();
  const notionPosts = await fetchPosts();
  const hasMissingOrOutdatedContent = checkMissingOrOutdatedContent(
    feed,
    notionPosts,
  );

  console.log('Has missing or outdated content: ', hasMissingOrOutdatedContent);

  let deploymentResult;

  if (hasMissingOrOutdatedContent) {
    deploymentResult = await triggerDeployment();
  } else {
    deploymentResult = 'IGNORED';
  }

  console.log('Deployment status:');
  console.log(deploymentResult);
}

run();
