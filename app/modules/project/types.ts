export interface Project {
  category?: string;
  company?: string;
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
