import type { Project } from "../types/content";

interface ProjectModule {
  default: Project;
  projectOrder?: number;
}

const projectModules = import.meta.glob<ProjectModule>("./projects/*.ts", { eager: true });

const projectEntries = Object.entries(projectModules)
  .map(([filePath, module]) => {
    const fileSlug = filePath.split("/").pop()?.replace(/\.ts$/, "");

    if (!fileSlug || fileSlug !== module.default.slug) {
      throw new Error(`Project file "${filePath}" must match its exported slug "${module.default.slug}".`);
    }

    return {
      order: module.projectOrder ?? Number.MAX_SAFE_INTEGER,
      project: module.default,
    };
  })
  .sort((left, right) => left.order - right.order || left.project.slug.localeCompare(right.project.slug));

const seenSlugs = new Set<string>();

for (const { project } of projectEntries) {
  if (seenSlugs.has(project.slug)) {
    throw new Error(`Duplicate project slug "${project.slug}". Each project must have a unique URL slug.`);
  }

  seenSlugs.add(project.slug);
}

/**
 * Automatically discovered project catalogue.
 *
 * Add or remove a file in src/data/projects and every public project list updates.
 * A matching custom page at src/pages/projects/<slug>.tsx is loaded automatically;
 * projects without one use the reusable generic detail page.
 */
export const projects: readonly Project[] = projectEntries.map(({ project }) => project);

