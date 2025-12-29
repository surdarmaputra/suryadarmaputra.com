// Project module type definitions
export type NotionProjectData = {
  id: string;
  title: string | null;
  // biome-ignore lint/suspicious/noExplicitAny: expected
  properties: Record<string, any>;
  // biome-ignore lint/suspicious/noExplicitAny: expected
  blocks?: any[];
};

export type Project = {
  thumbnail?: string;
  title: string;
  description: string;
  learnMoreLink?: string;
  previewLink?: string;
  company?: string;
};

export type ProjectGroup = {
  id: string;
  title: string;
  projects: Project[];
};
