/**
 * Seeds `src/_generated/` (and the matching public images) with deterministic
 * fixture content so the site can be built and e2e-tested without Notion
 * credentials. Run via `bun run test:seed`.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { blockGallery, paragraphBlock, richText } from "./notion-blocks";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const articlesDirectory = path.join(rootDirectory, "src/_generated/data/articles");
const siteDirectory = path.join(rootDirectory, "src/_generated/data/site");
const articleImagesDirectory = path.join(rootDirectory, "public/images/articles");
const projectImagesDirectory = path.join(rootDirectory, "public/images/projects");

/** Stands in for the images the Notion fetch scripts download. */
const placeholderImagePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "placeholder-image.png"
);

export const ARTICLE_FIXTURES = [
  {
    slug: "block-showcase-article",
    title: "Block Showcase Article",
    excerpt: "Every supported Notion block, rendered on one page.",
    readingTime: "4 mins read",
    createdAt: "2024-03-01T00:00:00.000Z",
    updatedAt: "2024-03-02T00:00:00.000Z",
    categories: ["Engineering"],
    tags: ["astro", "notion"],
    // heading_1 is omitted: the page layout already renders the article title
    // as the page's only <h1>.
    blocks: blockGallery
      .flatMap((entry) => entry.blocks)
      .filter(({ block }) => !("type" in block && block.type === "heading_1")),
  },
  {
    slug: "second-test-article",
    title: "Second Test Article",
    excerpt: "A short second article used to exercise previous/next navigation.",
    readingTime: "1 mins read",
    createdAt: "2024-02-01T00:00:00.000Z",
    updatedAt: "2024-02-01T00:00:00.000Z",
    categories: ["Notes"],
    tags: ["testing"],
    blocks: [
      { block: paragraphBlock([richText("A short second article.")], "second-p1"), children: null },
    ],
  },
] as const;

export const PROJECT_FIXTURES = [
  {
    id: "project-alpha",
    slug: "project-alpha",
    title: "Project Alpha",
    company: "personal",
    summary: "A personal open source project used in tests.",
    link: "https://example.com/alpha",
    tags: ["typescript", "astro"],
    categories: ["Web"],
  },
  {
    id: "project-beta",
    slug: "project-beta",
    title: "Project Beta",
    company: "kargo",
    summary: "A work project used in tests.",
    link: "https://example.com/beta",
    tags: ["react"],
    categories: ["Web"],
  },
] as const;

function toArticleFile(article: (typeof ARTICLE_FIXTURES)[number]) {
  return {
    title: article.title,
    excerpt: article.excerpt,
    readingTime: article.readingTime,
    properties: {
      created_at: article.createdAt,
      custom_created_at: article.createdAt,
      updated_at: article.updatedAt,
      categories: article.categories.map((name) => ({ name })),
      tags: [...article.tags],
    },
    blocks: article.blocks,
  };
}

function toProjectFile(project: (typeof PROJECT_FIXTURES)[number]) {
  return {
    id: project.id,
    title: project.title,
    properties: {
      slug: [{ type: "text", plain_text: project.slug }],
      summary: [{ type: "text", plain_text: project.summary }],
      link: project.link,
      company: { name: project.company },
      tags: [...project.tags],
      categories: project.categories.map((name) => ({ name })),
      thumbnail: [{ file: { url: `https://notion.example/${project.id}.png` } }],
    },
    blocks: [
      {
        block: paragraphBlock([richText(`About ${project.title}.`)], `${project.id}-p1`),
        children: null,
      },
    ],
  };
}

/** Every local image path the fixture content references. */
function fixtureImagePaths(): string[] {
  const blockImageIds = ARTICLE_FIXTURES.flatMap((article) =>
    article.blocks
      .map(({ block }) => block)
      .filter((block) => "type" in block && block.type === "image")
      .map((block) => block.id)
  );

  return [
    ...blockImageIds.map((id) => path.join(articleImagesDirectory, `${id}.png`)),
    ...PROJECT_FIXTURES.map((project) => path.join(projectImagesDirectory, `${project.id}-0.png`)),
  ];
}

export async function seedGeneratedData(): Promise<void> {
  await fs.rm(articlesDirectory, { force: true, recursive: true });
  await fs.mkdir(articlesDirectory, { recursive: true });
  await fs.mkdir(siteDirectory, { recursive: true });
  await fs.mkdir(articleImagesDirectory, { recursive: true });
  await fs.mkdir(projectImagesDirectory, { recursive: true });

  for (const article of ARTICLE_FIXTURES) {
    await fs.writeFile(
      path.join(articlesDirectory, `${article.slug}.json`),
      JSON.stringify(toArticleFile(article), null, 2)
    );
  }

  await fs.writeFile(
    path.join(siteDirectory, "projects.json"),
    JSON.stringify(PROJECT_FIXTURES.map(toProjectFile), null, 2)
  );

  const placeholderImage = await fs.readFile(placeholderImagePath);
  for (const imagePath of fixtureImagePaths()) {
    await fs.writeFile(imagePath, placeholderImage);
  }
}

if (import.meta.main) {
  await seedGeneratedData();
  console.log(`Seeded fixture data into ${path.relative(rootDirectory, articlesDirectory)}`);
}
