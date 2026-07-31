import { absoluteSiteUrl, siteUrl } from "../../config/company";
import type { Project } from "../../types/content";
import { StructuredData } from "./StructuredData";

export function ProjectSchema({ project }: { project: Project }) {
  const projectUrl = absoluteSiteUrl(`/projects/${project.slug}`);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Project",
    "@id": `${projectUrl}#project`,
    name: project.name,
    alternateName: project.shortName,
    description: project.seoDescription,
    slogan: project.subtitle,
    url: projectUrl,
    image: absoluteSiteUrl(project.image),
    parentOrganization: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": projectUrl,
    },
    knowsAbout: project.capabilities.map((capability) => capability.title),
  };

  return <StructuredData id={`drith-project-schema-${project.slug}`} data={schema} />;
}
