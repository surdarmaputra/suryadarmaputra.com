import type { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';

import { getPagesFromDatabase } from '../src/modules/core/libs/notion/client';

export function fetchArticles(): Promise<GetPageResponse[]> {
  if (process.env.SHOW_ALL_POSTS) {
    return getPagesFromDatabase(process.env.NOTION_ARTICLES_DATABASE_ID);
  }

  if (process.env.SHOW_UNPUBLISHED) {
    return getPagesFromDatabase(process.env.NOTION_ARTICLES_DATABASE_ID, {
      filter: {
        property: 'publish',
        checkbox: {
          equals: false,
        },
      },
    });
  }

  return getPagesFromDatabase(process.env.NOTION_ARTICLES_DATABASE_ID, {
    filter: {
      property: 'publish',
      checkbox: {
        equals: true,
      },
    },
  });
}

export function fetchProjects(): Promise<GetPageResponse[]> {
  return getPagesFromDatabase(process.env.NOTION_PROJECTS_DATABASE_ID, {
    filter: {
      property: 'publish',
      checkbox: {
        equals: true,
      },
    },
  });
}

