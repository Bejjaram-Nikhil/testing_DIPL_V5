import { ContactCta } from "../../components/sections/ContactCta";
import { Seo } from "../../components/system/Seo";
import { Reveal } from "../../components/ui/Reveal";
import { OptimizedImage } from "../../components/ui/OptimizedImage";
import type { Project } from "../../types/content";

export default function GenericProjectPage({ project }: { project: Project }) {
  return (
    <>
      <Seo title={project.name} description={project.seoDescription} path={`/projects/${project.slug}`} image={project.image} />

      <section className="section project-simple-section">
        <div className="shell project-simple-hero glass-panel">
          <Reveal className="project-simple-hero__copy">
            <p className="eyebrow">{project.eyebrow} · Drith Infra project</p>
            <h1>{project.name}</h1>
            <p className="project-simple-hero__lead">{project.summary}</p>
          </Reveal>
          <Reveal className="project-simple-hero__media" delay={0.08}>
            <OptimizedImage src={project.image} alt={project.imageAlt} loading="eager" decoding="async" fetchPriority="high" sizes="(max-width: 760px) 92vw, 48vw" />
          </Reveal>
        </div>
      </section>

      <section className="section project-simple-section project-simple-section--tight">
        <div className="shell project-simple-grid">
          <Reveal className="project-simple-panel glass-panel">
            <p className="eyebrow">Why it exists</p>
            <h2>{project.subtitle}</h2>
            <p>{project.seoDescription}</p>
          </Reveal>

          <div className="project-simple-list">
            {project.capabilities.map((capability, index) => (
              <Reveal key={capability.title} className="project-simple-card glass-panel" delay={index * 0.05}>
                <span>0{index + 1}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProjectMetrics project={project} />
      <ContactCta />
    </>
  );
}

function ProjectMetrics({ project }: { project: Project }) {
  return (
    <section className="section project-simple-section project-simple-section--tight">
      <div className="shell project-simple-metrics glass-panel">
        {project.metrics.map((metric) => (
          <div key={metric.value + metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
