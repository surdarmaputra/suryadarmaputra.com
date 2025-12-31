import fs from 'fs/promises';

import { getFileExtensionFromUrl, getTextFromProperties } from '~/libs/notion';

import { PROJECTS_FILE } from '../../constants';
import { Project } from '../../types';

export async function getProjects(): Promise<Project[]> {
  const fileContent: Buffer = await fs.readFile(PROJECTS_FILE);
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
    const company = project.properties.company?.name;
    const slug = getTextFromProperties(project.properties, 'slug');
    const highlightMessage = getTextFromProperties(
      project.properties,
      'highlight_message',
    );

    return {
      category,
      company,
      date,
      id: project.id,
      link,
      summary,
      tags,
      thumbnailUrl,
      thumbnailPlaceholderUrl,
      title: project.title,
      updatedAt,
      blocks: project.blocks,
      isHighlighted: project.properties.highlighted,
      highlightMessage,
      slug: slug || project.id,
    };
  });
}
