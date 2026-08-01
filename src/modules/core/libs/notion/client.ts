import { Client } from "@notionhq/client";
import type {
  GetPageResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";

import type { BlockWithChildren } from "./types";
import { hasChildren } from "./utils";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getPagesFromDatabase(
  databaseId?: string,
  parameters?: Partial<QueryDatabaseParameters>
): Promise<GetPageResponse[]> {
  if (!databaseId) {
    // eslint-disable-next-line no-console
    console.error("getPagesFromDatabase: databaseId is not set");
    return [];
  }

  // eslint-disable-next-line no-console
  console.log(`getPagesFromDatabase: querying database ${databaseId.slice(0, 8)}...`);

  try {
    const { results } = await notion.databases.query({
      database_id: databaseId,
      ...parameters,
    });
    // eslint-disable-next-line no-console
    console.log(`getPagesFromDatabase: got ${results.length} results`);
    return results as GetPageResponse[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("getPagesFromDatabase error:", JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function getBlockChildren(blockId: string): Promise<BlockWithChildren[]> {
  if (!blockId) return [];

  try {
    const { results } = await notion.blocks.children.list({
      block_id: blockId,
    });
    const blocks: BlockWithChildren[] = [];
    for (const block of results) {
      let children: BlockWithChildren[] | null = null;
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
    // eslint-disable-next-line no-console
    console.error("getBlockChildren error: ", error);
    return [];
  }
}
