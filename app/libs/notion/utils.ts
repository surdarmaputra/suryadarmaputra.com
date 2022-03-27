import type { GetBlockResponse } from '@notionhq/client/build/src/api-endpoints';

export function hasChildren(block: GetBlockResponse): boolean {
  return 'has_children' in block && block.has_children;
}
