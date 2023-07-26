/* eslint-disable no-console */
import { Client } from '@notionhq/client';
import type {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

import type { BlockWithChildren } from './types';
import { hasChildren } from './utils';

export * from './types';
export * from './utils';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getPagesFromDatabase(
  databaseId?: string,
  parameters?: Partial<QueryDatabaseParameters>,
): Promise<QueryDatabaseResponse['results']> {
  if (!databaseId) return [];

  try {
    const { results } = await notion.databases.query({
      database_id: databaseId,
      ...parameters,
    });
    return results;
  } catch (error) {
    console.error('getPagesFromDatabase error: ', error);
    return [];
  }
}

export async function getBlockChildren(
  blockId: string,
): Promise<BlockWithChildren[]> {
  if (!blockId) return [];

  try {
    const { results } = await notion.blocks.children.list({
      block_id: blockId,
    });
    const blocks = [];
    for (const block of results) {
      let children = null;
      if (hasChildren(block)) {
        children = await getBlockChildren(block.id);
      }
      blocks.push({
        block,
        children,
      });
    }
    return blocks;
  } catch (error) {
    console.error('getBlockChildren error: ', error);
    return [];
  }
}
