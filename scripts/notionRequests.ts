import { getPagesFromDatabase } from '../libs/notion';

export function fetchPosts() {
  return getPagesFromDatabase(process.env.NOTION_POSTS_DATABASE_ID, {
    filter: {
      property: 'publish',
      checkbox: {
        equals: true,
      },
    },
  });
}

export function fetchProjects() {
  return getPagesFromDatabase(process.env.NOTION_PROJECTS_DATABASE_ID, {
    filter: {
      property: 'publish',
      checkbox: {
        equals: true,
      },
    },
  });
}
