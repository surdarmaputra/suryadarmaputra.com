import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';

import { getPagesFromDatabase } from '../app/libs/notion/index.server';

export function fetchPosts(): Promise<GetPageResponse[]> {
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

export function fetchProjects(): Promise<GetPageResponse[]> {
  return getPagesFromDatabase(process.env.NOTION_PROJECT_DATABASE_ID, {
    filter: {
      property: 'publish',
      checkbox: {
        equals: true,
      },
    },
  });
}

export function fetchCampaigns(): Promise<GetPageResponse[]> {
  return getPagesFromDatabase(process.env.NOTION_CAMPAIGN_DATABASE_ID, {
    filter: {
      property: 'publish',
      checkbox: {
        equals: true,
      },
    },
  });
}
