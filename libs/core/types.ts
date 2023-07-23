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

export interface Project {
  category?: string;
  date: Date;
  id: string;
  link: string;
  summary: string;
  tags?: Array<string>;
  thumbnailUrl?: string | null;
  thumbnailPlaceholderUrl?: string | null;
  title: string;
  updatedAt: Date;
}
