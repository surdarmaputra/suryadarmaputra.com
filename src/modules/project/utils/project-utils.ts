import { getFileExtensionFromUrl, getTextFromProperties } from "../../core/libs/notion";

import type { Project, ProjectGroup } from "../types";

// Map company names from Notion to display titles
export const COMPANY_NAME_MAP: Record<string, string> = {
  personal: "Personal & Open Source",
  artcak: "Artcak Technology",
  kargo: "Kargo Technologies",
  freelance: "Freelancing & Consultation",
  bukalapak: "Bukalapak",
  goto: "GoTo Financial",
} as const;

// Define the order of companies
export const COMPANY_ORDER = [
  "personal",
  "goto",
  "kargo",
  "bukalapak",
  "artcak",
  "freelance",
] as const;

/**
 * Normalize company name to lowercase key for mapping
 */
export function normalizeCompanyName(name: string | undefined | null): string {
  if (!name) return "personal";
  return name.toLowerCase().trim();
}

/**
 * Get display title for a company name (from Notion key or display title)
 */
export function getCompanyDisplayTitle(companyName: string | undefined | null): string {
  if (!companyName) return COMPANY_NAME_MAP.personal;
  const normalized = normalizeCompanyName(companyName);
  return COMPANY_NAME_MAP[normalized] || companyName;
}

/**
 * Get normalized company key from display title or Notion name
 * This is useful for reverse lookup when you have a display title and need the key
 */
export function getCompanyKey(companyName: string | undefined | null): string {
  if (!companyName) return "personal";
  const normalized = normalizeCompanyName(companyName);

  // If it's already a key in the map, return it
  if (COMPANY_NAME_MAP[normalized]) {
    return normalized;
  }

  // Otherwise, try to find it in the map values (reverse lookup)
  const foundKey = Object.entries(COMPANY_NAME_MAP).find(
    ([, value]) => value.toLowerCase() === normalized
  )?.[0];

  return foundKey || normalized;
}

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
      const rawCompanyName = project.company;
      const normalizedName = normalizeCompanyName(rawCompanyName);
      const companyId = normalizedName.replace(/\s+/g, "-");

      // Get display title from map
      const displayTitle = getCompanyDisplayTitle(rawCompanyName);

      if (!acc[normalizedName]) {
        acc[normalizedName] = {
          id: companyId,
          title: displayTitle,
          projects: [],
        };
      }

      acc[normalizedName].projects.push(project);
      return acc;
    },
    {} as Record<string, ProjectGroup>
  );

  // Convert to array and sort by predefined order
  const groups = Object.values(grouped);

  // Sort groups according to COMPANY_ORDER
  const sortedGroups = groups.sort((a, b) => {
    const indexA = COMPANY_ORDER.indexOf(a.id as (typeof COMPANY_ORDER)[number]);
    const indexB = COMPANY_ORDER.indexOf(b.id as (typeof COMPANY_ORDER)[number]);

    // If both are in the order list, sort by their position
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    // If only A is in the order list, A comes first
    if (indexA !== -1) return -1;
    // If only B is in the order list, B comes first
    if (indexB !== -1) return 1;
    // If neither is in the order list, sort alphabetically
    return a.title.localeCompare(b.title);
  });

  return sortedGroups;
}
