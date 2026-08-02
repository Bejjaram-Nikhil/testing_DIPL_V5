import { Link } from "react-router-dom";
import { ContactCta } from "../components/sections/ContactCta";
import { KpiBand } from "../components/sections/KpiBand";
import { Partners } from "../components/sections/Partners";
import { Seo } from "../components/system/Seo";
import { StructuredData } from "../components/system/StructuredData";
import { ButtonLink } from "../components/ui/ButtonLink";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { DeferredYouTube } from "../components/ui/DeferredYouTube";
import { OptimizedImage } from "../components/ui/OptimizedImage";
import { responsiveAssets } from "../config/assets";
import { companyProfile, siteUrl } from "../config/company";
import { team } from "../data";
import "../styles/company-facts.css";

// Cause and Enactment cards in the Vision & Mission section.
const missionCards = [
  {
    label: "Vision",
    body: "To be India's leading provider of sustainable, resilient, and innovative infrastructure solutions for governments, investors, and communities.",
  },
  {
    label: "Enactment",
    body: "To design and implement infrastructure that safeguards coastlines and communities while reducing environmental impact.",
  },
] as const;

export default function AboutPage() {
  const credentialFacts: ReadonlyArray<{
    label: string;
    value: string;
    note: string;
    href?: string;
    id?: string;
  }> = [
    {
      label: "Legal entity",
      value: companyProfile.name,
      note: "Indian private limited company",
    },
    {
      label: "Founder and leadership",
      value: companyProfile.founder.name,
      note: companyProfile.founder.role,
      href: companyProfile.founder.linkedin,
      id: "founder",
    },
    {
      label: "Quality certification",
      value: companyProfile.certifications[0],
      note: "Company certification",
    },
    {
      label: "Government recognition",
      value: companyProfile.certifications[1],
      note: "Government of India Startup India initiative",
      href: "/#recognitions",
    },
    {
      label: "Innovation recognition",
      value: companyProfile.award,
      note: "Building Bharat Sampark Innovation Boot Camp",
      href: "/#recognitions",
    },
    {
      label: "Business location",
      value: companyProfile.location,
      note: "Company contact location",
    },
  ];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/about#about-page`,
    url: `${siteUrl}/about`,
    name: `About ${companyProfile.name}`,
    description: companyProfile.description,
    inLanguage: "en-IN",
    mainEntity: { "@id": `${siteUrl}/#organization` },
    about: [
      { "@id": `${siteUrl}/#organization` },
      { "@id": `${siteUrl}/about#founder` },
    ],
  };

  return (
    <>
      <Seo
        title="About"
        description="Learn about Drith Infra Private Limited, founder and CEO Abhishek Giri, its ISO 9001:2015 certification, DPIIT recognition, team, and nature-aligned coastal infrastructure projects."
        path="/about"
        image={companyProfile.founder.image}
      />
      <StructuredData id="drith-about-schema" data={aboutSchema} />

      {/* Vision & Mission section. Text comes from missionCards above. */}
      <section className="section about-mission-section">
        <div className="shell">
          <SectionHeading eyebrow="Vision & Mission" />
          <Reveal className="about-mission-panel glass-panel">
            {missionCards.map((card) => (
              <article key={card.label} className="about-mission-card">
                <p className="eyebrow">{card.label}</p>
                <p>{card.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section company-profile-section" aria-labelledby="company-profile-title">
        <div className="shell">
          <Reveal className="company-profile glass-panel">
            <header className="company-profile__header">
              <p className="eyebrow">Company profile &amp; credentials</p>
              <h2 id="company-profile-title">A founder-led business built around coastal resilience.</h2>
              <p>
                {companyProfile.name} is based in Pimpri-Chinchwad, Pune, and works across coastline
                engineering, climate resilience, coastal awareness, and community-led ecological restoration.
                The facts below connect the company, its founder, its credentials, and its public initiatives in
                one verifiable profile.
              </p>
            </header>

            <dl className="company-profile__facts">
              {credentialFacts.map((fact) => (
                <div id={fact.id} key={fact.label} className="company-profile__fact">
                  <dt>{fact.label}</dt>
                  <dd>
                    {fact.href?.startsWith("/") ? (
                      <Link to={fact.href}>{fact.value}</Link>
                    ) : fact.href ? (
                      <a href={fact.href} target="_blank" rel="noopener noreferrer">{fact.value}</a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                  <p>{fact.note}</p>
                </div>
              ))}
            </dl>

            <div className="company-profile__initiatives">
              <div>
                <p className="eyebrow">Core initiatives</p>
                <nav aria-label="Drith Infra initiatives">
                  <Link to="/projects/tatchaitanya">TATChaitanya</Link>
                  <Link to="/projects/tatrakshak">TATRakshak</Link>
                  <Link to="/projects/tatsagarmitra">TATSagarMitra</Link>
                </nav>
              </div>
              <ButtonLink to="/#recognitions" variant="secondary">View recognition evidence</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section about-story-section">
        <div className="shell about-story-grid">
          <Reveal className="about-story-copy">
            <p className="eyebrow">Why?</p>
            <h2>Drith Infra</h2>
            <p>
              Drith Infra Pvt. Ltd. is working at the intersection of coastline engineering, climate resilience,
              and sustainable coastline infrastructure.
            </p>
            <ButtonLink to="/kpis" variant="secondary">Know More</ButtonLink>
          </Reveal>

          <Reveal className="about-video-card glass-panel" delay={0.08}>
            <span>Startup Video</span>
            <DeferredYouTube
              videoId="CwxaaeHy6Iw"
              title="Drith Infra startup video"
              preview={responsiveAssets.about.videoPreview}
            />
          </Reveal>
        </div>
      </section>

      {/* Team cards are generated from the team array in src/data/site.ts. */}
      <section className="section team-section about-team-section">
        <div className="shell">
          <SectionHeading
            eyebrow="Our Pillars of Impact"
            body="United by a Vision for Sustainable Growth"
          />
          <div className="team-grid">
            {team.map((member, index) => (
              <Reveal key={member.name} className="team-card glass-panel" delay={index * 0.05}>
                {member.image ? (
                  <OptimizedImage src={member.image} alt={member.name} loading="lazy" decoding="async" sizes="(max-width: 760px) 72vw, 260px" />
                ) : (
                  <div className="team-card__initials" aria-hidden="true">
                    {member.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                  </div>
                )}
                <span>{member.role}</span>
                <h3>{member.name}</h3>
                <p>“{member.quote}”</p>
                <a
                  className="button button--text"
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${member.name}'s LinkedIn profile`}
                >
                  Know Me
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <KpiBand />
      <Partners />
      <ContactCta />
    </>
  );
}
