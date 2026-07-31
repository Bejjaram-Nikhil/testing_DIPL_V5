import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ProjectSchema } from "../components/system/ProjectSchema";
import { projects } from "../data";
import type { Project } from "../types/content";
import GenericProjectPage from "./projects/GenericProjectPage";
import "../styles/initiative-pages.css";

interface ProjectPageProps {
  project: Project;
}

type ProjectPageComponent = LazyExoticComponent<ComponentType<ProjectPageProps>>;

const customPageModules = import.meta.glob<{ default: ComponentType<ProjectPageProps> }>([
  "./projects/*.tsx",
  "!./projects/GenericProjectPage.tsx",
]);

const customProjectPages = Object.fromEntries(
  Object.entries(customPageModules)
    .map(([filePath, loadPage]) => {
      const slug = filePath.split("/").pop()?.replace(/\.tsx$/, "");

      if (!slug) {
        throw new Error(`Could not determine the project slug for "${filePath}".`);
      }

      return [slug, lazy(loadPage)] as const;
    }),
) as Record<string, ProjectPageComponent>;

export default function ProjectDetailPage() {
  const { projectSlug } = useParams();
  const project = projects.find((item) => item.slug === projectSlug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const ProjectPage = customProjectPages[project.slug] ?? GenericProjectPage;

  return (
    <>
      <ProjectSchema project={project} />
      <ProjectPage project={project} />
    </>
  );
}
