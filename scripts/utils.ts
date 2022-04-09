import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';

import { getPagesFromDatabase } from '../app/libs/notion';

export function fetchPosts(): Promise<GetPageResponse[]> {
  return getPagesFromDatabase(process.env.NOTION_DATABASE_ID, {
    filter: {
      property: 'publish',
      checkbox: {
        equals: true,
      },
    },
  });
}
