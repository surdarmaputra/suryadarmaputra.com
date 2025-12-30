// Article module type definitions

import type { BlockWithChildren } from "../../core/libs/notion/types";

// Raw Notion article data structure from generated JSON files
export type NotionArticleData = {
  title: string | null;
  excerpt: string | null;
  // biome-ignore lint/suspicious/noExplicitAny: expected
  properties: Record<string, any>;
  readingTime: string;
  blocks: BlockWithChildren[];
};

// Article type for list views
export type Article = {
  id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  minsRead?: number;
  excerpt: string;
  categories?: string[];
  tags?: string[];
  updatedAt: string;
};

// Full article with blocks for detail views
export type FullArticle = Article & {
  blocks: BlockWithChildren[];
};
