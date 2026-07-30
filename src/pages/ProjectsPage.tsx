import { ContactCta } from "../components/sections/ContactCta";
import { KpiBand } from "../components/sections/KpiBand";
import { Partners } from "../components/sections/Partners";
import { ProjectCard } from "../components/sections/ProjectCard";
import { Seo } from "../components/system/Seo";
import { projects } from "../data";

const projectsPageOrder = ["tatchaitanya", "tatrakshak", "tatsagarmitra"] as const;

export default function ProjectsPage() {
  const orderedProjects = projectsPageOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  return (
    <>
      <Seo
        title="Projects"
        description="Explore Drith Infra's connected coastal protection, awareness, and restoration projects."
        path="/projects"
      />

      {/* Projects listing page. Cards are generated from src/data/site.ts and rendered by ProjectCard. */}
      <section className="section projects-showcase-section">
        <div className="shell">
          <header className="projects-showcase-heading">
            <h1>Our Projects</h1>
          </header>

          <div className="projects-showcase-grid">
            {orderedProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} compact />
            ))}
          </div>
        </div>
      </section>

      <KpiBand compactHeading />
      <Partners />
      <ContactCta />
    </>
  );
}
