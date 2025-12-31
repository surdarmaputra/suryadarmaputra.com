import type { Article, NotionArticleData } from "../types";

/**
 * Transform Notion article data to Article type
 */
export function transformNotionDataToArticle(notionData: NotionArticleData, slug: string): Article {
  const { title, excerpt, properties, readingTime } = notionData;

  // Parse date - use custom_created_at if available, fallback to created_at
  const dateString =
    properties.custom_created_at || properties.created_at || new Date().toISOString();
  const date = new Date(dateString).toISOString();

  // Parse updatedAt
  const updatedAtString = properties.updated_at || dateString;
  const updatedAt = new Date(updatedAtString).toISOString();

  // Extract reading time minutes from string like "5 mins read"
  const minsReadMatch = readingTime.match(/(\d+)/);
  const minsRead = minsReadMatch ? parseInt(minsReadMatch[1], 10) : undefined;

  // Get tags - tags is an array of strings or objects with name property
  // biome-ignore lint/suspicious/noExplicitAny: expected
  const tagsArray = properties.tags as any[];
  const tags =
    Array.isArray(tagsArray) && tagsArray.length > 0
      ? tagsArray
          .map((tag) => (typeof tag === "string" ? tag : tag?.name || String(tag)))
          .filter(Boolean)
      : undefined;

  // Get categories - categories is an array of objects with name property or strings
  // biome-ignore lint/suspicious/noExplicitAny: expected
  const categoriesArray = properties.categories as any[];
  const categories =
    Array.isArray(categoriesArray) && categoriesArray.length > 0
      ? categoriesArray
          .map((cat) => (typeof cat === "string" ? cat : cat?.name || String(cat)))
          .filter(Boolean)
      : undefined;

  // Use excerpt as description, fallback to empty string
  const description = excerpt || "";

  // Generate ID from slug (or use a hash of the title)
  const id = slug;

  return {
    id,
    title: title || "",
    description,
    date,
    slug,
    minsRead,
    excerpt: excerpt || "",
    categories,
    tags,
    updatedAt,
  };
}
