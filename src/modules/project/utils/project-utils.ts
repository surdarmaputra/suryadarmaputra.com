import { getFileExtensionFromUrl, getTextFromProperties } from "../../core/libs/notion";

import type { Project, ProjectGroup } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NotionProjectData = {
  id: string;
  title: string | null;
  // biome-ignore lint/suspicious/noExplicitAny: expected
  properties: Record<string, any>;
  // biome-ignore lint/suspicious/noExplicitAny: expected
  blocks?: any[];
};

export function transformNotionDataToProject(notionData: NotionProjectData): Project {
  const { id, title, properties } = notionData;

  // Get thumbnail URL
  const thumbnailExtension = getFileExtensionFromUrl(properties.thumbnail?.[0]?.file?.url);
  const thumbnail = thumbnailExtension
    ? `/images/projects/${id}-0.${thumbnailExtension}`
    : undefined;

  // Get description from summary or use empty string
  const description = properties.summary
    ? // biome-ignore lint/suspicious/noExplicitAny: expected
      (properties.summary as any[])
        // biome-ignore lint/suspicious/noExplicitAny: expected
        .map((item: Record<string, any>) => item.plain_text)
        .join(" ")
    : "";

  // Get slug or use id
  const slug = getTextFromProperties(properties, "slug") || id;

  // Generate learnMoreLink
  const learnMoreLink = `/projects/${slug}`;

  // Get previewLink from link property
  const previewLink = properties.link || undefined;

  // Get company name
  const company = properties.company?.name || undefined;

  // Get tags - tags is an array of strings
  // biome-ignore lint/suspicious/noExplicitAny: expected
  const tagsArray = properties.tags as any[];
  const tags =
    Array.isArray(tagsArray) && tagsArray.length > 0
      ? tagsArray.map((tag) => (typeof tag === "string" ? tag : String(tag)))
      : undefined;

  // Get categories - categories is an array of objects with name property
  // biome-ignore lint/suspicious/noExplicitAny: expected
  const categoriesArray = properties.categories as any[];
  const categories =
    Array.isArray(categoriesArray) && categoriesArray.length > 0
      ? categoriesArray.map((cat) => cat?.name || String(cat)).filter(Boolean)
      : undefined;

  return {
    thumbnail,
    title: title || "",
    description,
    learnMoreLink,
    previewLink,
    company,
    slug,
    tags,
    categories,
  };
}

export function groupProjectByCompany(projects: Project[]): ProjectGroup[] {
  // Group projects by company
  const grouped = projects.reduce(
    (acc, project) => {
      const companyName = project.company || "personal";
      const companyId = companyName.toLowerCase().replace(/\s+/g, "-");

      if (!acc[companyName]) {
        acc[companyName] = {
          id: companyId,
          title: companyName === "personal" ? "Personal & Open Source" : companyName,
          projects: [],
        };
      }

      acc[companyName].projects.push(project);
      return acc;
    },
    {} as Record<string, ProjectGroup>
  );

  // Convert to array and sort: personal first, then alphabetically
  const groups = Object.values(grouped);
  const personalGroup = groups.find((g) => g.id === "personal");
  const otherGroups = groups
    .filter((g) => g.id !== "personal")
    .sort((a, b) => a.title.localeCompare(b.title));

  return personalGroup ? [personalGroup, ...otherGroups] : otherGroups;
}
