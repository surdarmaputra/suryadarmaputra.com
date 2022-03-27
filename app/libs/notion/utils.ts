// @ts-nocheck
import type { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints';

export function hasChildren(block: GetBlockResponse) {
  return block.has_children;
}
