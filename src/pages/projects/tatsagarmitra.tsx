import { ContactCta } from "../../components/sections/ContactCta";
import { KpiBand } from "../../components/sections/KpiBand";
import { Seo } from "../../components/system/Seo";
import { Reveal } from "../../components/ui/Reveal";
import type { Project } from "../../types/content";

const tatsagarmitraFocus = [
  {
    title: "Coastline cleanups",
    description: "Cleanup and plastic-collection activities where local needs and suitable partnerships come together.",
  },
  {
    title: "Community participation",
    description: "Simple ways for volunteers and local groups to take part in caring for coastal places.",
  },
  {
    title: "Collaborative action",
    description: "Working with public bodies, organisations and responsible businesses when a shared effort is useful.",
  },
  {
    title: "Wider coastal care",
    description: "The initiative may gradually include other forms of stewardship beyond waste and cleanup.",
  },
] as const;

export default function TatsagarmitraPage({ project }: { project: Project }) {
  return (
    <>
      <Seo title={project.name} description={project.seoDescription} path={`/projects/${project.slug}`} image={project.image} />

      <section className="section initiative-hero-section">
        <div className="shell initiative-hero initiative-hero--sagarmitra glass-panel">
          <Reveal className="initiative-hero__copy">
            <p className="eyebrow">Coastal stewardship · DRITH Infra</p>
            <h1>TATSagarMitra</h1>
            <p className="initiative-hero__statement">Act together to care for and protect the coast.</p>
            <p className="initiative-hero__intro">
              DRITH Infra&apos;s broad coastal stewardship and direct-action initiative, envisioned as a flexible platform
              for coastline care, participation and responsible partnerships.
            </p>
          </Reveal>
          <Reveal className="initiative-hero__media" delay={0.08}>
            <img src={project.image} alt={project.imageAlt} loading="eager" decoding="async" />
          </Reveal>
        </div>
      </section>

      <section className="section initiative-section initiative-section--tight">
        <div className="shell initiative-message initiative-message--compact glass-panel">
          <Reveal>
            <p className="eyebrow">The idea</p>
            <h2>Protecting the coast requires direct and collective responsibility.</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p>
              TATSagarMitra reflects DRITH Infra&apos;s commitment to care for the coastal environment—not only through
              infrastructure, but also through thoughtful action alongside others.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section initiative-section initiative-section--tight">
        <div className="shell">
          <Reveal className="initiative-section-heading initiative-section-heading--center">
            <p className="eyebrow">Where it may begin</p>
            <h2>Practical ways to care for the coast.</h2>
            <p>
              These are possible starting points rather than fixed boundaries. The initiative can take shape around
              local needs, participation and the right collaborations.
            </p>
          </Reveal>
          <div className="initiative-action-grid">
            {tatsagarmitraFocus.map((item, index) => (
              <Reveal key={item.title} className="initiative-action-card glass-panel" delay={index * 0.045}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <KpiBand />
      <ContactCta />
    </>
  );
}
