import fs from "fs/promises";
import path from "path";
import type { NotionProjectData, Project } from "../types";
import { transformNotionDataToProject } from "../utils/project-utils";

const PROJECTS_FILE = path.resolve(process.cwd(), "src/_generated/data/site/projects.json");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadProjectsData(): Promise<NotionProjectData[]> {
  try {
    const fileContent = await fs.readFile(PROJECTS_FILE, "utf-8");
    return JSON.parse(fileContent) as NotionProjectData[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error loading projects data:", error);
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  const notionProjects = await loadProjectsData();
  return notionProjects.map(transformNotionDataToProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((project) => project.learnMoreLink === `/projects/${slug}`) || null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const notionProjects = await loadProjectsData();
  const notionProject = notionProjects.find((project) => project.id === id);
  if (!notionProject) return null;
  return transformNotionDataToProject(notionProject);
}
