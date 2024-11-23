import fs from 'fs/promises';

import { getFileExtensionFromUrl } from '~/libs/notion';

const projectsFile = './extras/projects.json';

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

export async function getProjects(): Promise<Project[]> {
  const fileContent: Buffer = await fs.readFile(projectsFile);
  const projects = JSON.parse(fileContent.toString());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return projects.map((project: Record<string, any>) => {
    const { category, link, tags } = project.properties;
    const date = new Date(project.properties.created_at);
    const updatedAt = new Date(project.properties.updated_at);
    const thumbnailExtension = getFileExtensionFromUrl(
      project.properties.thumbnail?.[0]?.file?.url,
    );
    const thumbnailUrl = thumbnailExtension
      ? `/images/projects/${project.id}-0.${thumbnailExtension}`
      : null;
    const thumbnailPlaceholderUrl = thumbnailExtension
      ? `/images/projects/${project.id}-0-placeholder.png`
      : null;
    const summary = project.properties.summary
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: Record<string, any>) => item.plain_text)
      .join(' ');

    return {
      category,
      date,
      id: project.id,
      link,
      summary,
      tags,
      thumbnailUrl,
      thumbnailPlaceholderUrl,
      title: project.title,
      updatedAt,
    };
  });
}
