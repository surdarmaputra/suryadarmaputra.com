import { BlockWithChildren } from '~/libs/notion';

export interface Post {
  category?: string;
  date: Date;
  excerpt: string;
  href: string;
  readingTime?: string;
  slug: string;
  tags?: Array<string>;
  title: string;
  updatedAt: Date;
}

export interface FullPost extends Post {
  blocks: BlockWithChildren[];
}