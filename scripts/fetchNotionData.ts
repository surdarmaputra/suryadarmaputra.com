// @ts-nocheck
import dotenv from 'dotenv';
import fs from 'fs/promises';
import { identity, kebabCase } from 'lodash';
import path from 'path';

dotenv.config();

/* eslint-disable import/first */
import type { BlockWithChildren } from '../app/libs/notion';
import { getBlockChildren, getPagesFromDatabase } from '../app/libs/notion';
/* eslint-enable import/first */

interface PageData {
  title: string;
  excerpt: string | null;
  properties: Record<string, any>;
  blocks: BlockWithChildren[] | [];
}

const postsDirectory = path.resolve(__dirname, '../posts');

function joinStrings(strings: string[]): string {
  return strings.filter(Boolean).join(' ').trim();
}

function formatDateObject(date = {}): string | null {
  return date?.start || null;
}

function formatMultiSelect(items = []): string[] {
  return items.map(({ name }) => name);
}

function formatSelect(item = {}): string | null {
  return item?.name || null;
}

function getExcerpt(blocks) {
  const inspectedBlocks = blocks.slice(0, 10);

  const excerpt = inspectedBlocks.reduce((accumulator, { block, children }) => {
    const richTextBlocks = block[block.type]?.rich_text || [];
    let plainTexts = joinStrings(
      richTextBlocks.map((richText) => richText.plain_text),
    );

    if (children?.length) {
      plainTexts = joinStrings([plainTexts, getExcerpt(children)]);
    }

    return plainTexts ? joinStrings([accumulator, plainTexts]) : accumulator;
  }, '');

  return excerpt.length > 255 ? `${excerpt.slice(0, 255)}...` : excerpt;
}

const propertyFormatters = {
  tags: formatMultiSelect,
  custom_created_at: formatDateObject,
  language: formatSelect,
  category: formatSelect,
};

function getProperties(page) {
  const { properties } = page;

  return Object.keys(properties).reduce((accumulator, key) => {
    const valueProp = properties[key].type;

    if (key === 'title') return accumulator;

    const format = propertyFormatters[key] || identity;
    const value = format(properties[key][valueProp]);

    return {
      ...accumulator,
      [key]: value,
    };
  }, {});
}

function getTitle(page) {
  return joinStrings(
    page.properties.title.title.map((title) => title.plain_text),
  );
}

export async function run(): Promise<void> {
  const rawPages = await getPagesFromDatabase(process.env.NOTION_DATABASE_ID, {
    filter: {
      property: 'publish',
      checkbox: {
        equals: true,
      },
    },
  });

  await fs.rm(postsDirectory, { force: true, recursive: true });
  await fs.mkdir(postsDirectory, { recursive: true });

  for (let page of rawPages) {
    const title = getTitle(page);
    const properties = getProperties(page);
    const blocks = await getBlockChildren(page.id);
    const excerpt = getExcerpt(blocks);
    const pageData: PageData = {
      title,
      excerpt,
      properties,
      blocks,
    };
    const slug = kebabCase(title);
    const filePath = path.join(postsDirectory, `${slug}.json`);
    await fs.writeFile(filePath, JSON.stringify(pageData, null, 2));
  }
}

run();
