import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

import { getPagesFromDatabase } from '@/libs/notion';

export function fetchPosts(): Promise<QueryDatabaseResponse['results']> {
  if (process.env.SHOW_ALL_POSTS) {
    return getPagesFromDatabase(process.env.NOTION_DATABASE_ID);
  }

  if (process.env.SHOW_UNPUBLISHED) {
    return getPagesFromDatabase(process.env.NOTION_DATABASE_ID, {
      filter: {
        property: 'publish',
        checkbox: {
          equals: false,
        },
      },
    });
  }

  return getPagesFromDatabase(process.env.NOTION_DATABASE_ID, {
    filter: {
      property: 'publish',
      checkbox: {
        equals: true,
      },
    },
  });
}
