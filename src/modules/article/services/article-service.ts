import fs from "node:fs/promises";
import path from "node:path";
import type { Article, FullArticle, NotionArticleData } from "../types";
import { transformNotionDataToArticle } from "../utils/article-utils";

const ARTICLES_DIR = path.resolve(process.cwd(), "src/_generated/data/articles");

/**
 * Load all article data from JSON files
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadArticlesData(): Promise<Array<{ slug: string; data: NotionArticleData }>> {
  try {
    const files = await fs.readdir(ARTICLES_DIR);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    const articlesData = await Promise.all(
      jsonFiles.map(async (fileName) => {
        const slug = fileName.replace(/\.json$/, "");
        const filePath = path.join(ARTICLES_DIR, fileName);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileContent) as NotionArticleData;
        return { slug, data };
      })
    );

    return articlesData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error loading articles data:", error);
    return [];
  }
}

/**
 * Get all articles, sorted by date descending
 */
export async function getArticles(): Promise<Article[]> {
  const articlesData = await loadArticlesData();
  const articles = articlesData.map(({ slug, data }) => transformNotionDataToArticle(data, slug));

  // Sort by date descending (newest first)
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(slug: string): Promise<FullArticle | null> {
  const articlesData = await loadArticlesData();
  const articleData = articlesData.find((item) => item.slug === slug);

  if (!articleData) return null;

  const article = transformNotionDataToArticle(articleData.data, articleData.slug);
  return {
    ...article,
    blocks: articleData.data.blocks,
  };
}

/**
 * Get raw Notion article data by slug (including blocks)
 */
export async function getNotionArticleDataBySlug(slug: string): Promise<NotionArticleData | null> {
  const articlesData = await loadArticlesData();
  const articleData = articlesData.find((item) => item.slug === slug);

  return articleData?.data || null;
}

/**
 * Get article detail with previous/next navigation
 */
export async function getArticleDetailAndNavigationBySlug(slug: string): Promise<{
  article: FullArticle | null;
  previousArticle: Article | null;
  nextArticle: Article | null;
}> {
  const articles = await getArticles();
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      article: null,
      previousArticle: null,
      nextArticle: null,
    };
  }

  const currentArticleIndex = articles.findIndex((item) => item.slug === slug);
  const previousArticle = currentArticleIndex > 0 ? articles[currentArticleIndex - 1] : null;
  const nextArticle =
    currentArticleIndex < articles.length - 1 ? articles[currentArticleIndex + 1] : null;

  return {
    article,
    previousArticle,
    nextArticle,
  };
}
