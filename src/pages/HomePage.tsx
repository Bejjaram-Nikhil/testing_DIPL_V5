import { lazy, Suspense } from "react";
import { ButtonLink } from "../components/ui/ButtonLink";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { assets } from "../config/assets";
import { projects } from "../data";
import { Seo } from "../components/system/Seo";
import { AdaptiveVideo } from "../components/ui/AdaptiveVideo";
import { OptimizedImage } from "../components/ui/OptimizedImage";
import { responsiveAssets } from "../config/assets";

const ComparisonShowcase = lazy(() => import("../components/sections/ComparisonShowcase").then((module) => ({ default: module.ComparisonShowcase })));
const RecognitionGrid = lazy(() => import("../components/sections/RecognitionGrid").then((module) => ({ default: module.RecognitionGrid })));
const KpiBand = lazy(() => import("../components/sections/KpiBand").then((module) => ({ default: module.KpiBand })));
const Partners = lazy(() => import("../components/sections/Partners").then((module) => ({ default: module.Partners })));
const ContactCta = lazy(() => import("../components/sections/ContactCta").then((module) => ({ default: module.ContactCta })));

export default function HomePage() {
  return (
    <>
      <Seo
        title="Nature-Aligned Coastal Infrastructure"
        description="Drith Infra combines engineering, ecological intelligence, and coastal awareness to build resilient shorelines and communities."
      />

      {/* Full-screen landing section. CSS classes starting with home-video-hero control the video, overlay, and text layout. */}
      <section className="home-video-hero">
        <AdaptiveVideo
          className="home-adaptive-video"
          mediaClassName="home-video-hero__media"
          poster={responsiveAssets.hero.homeVideoPoster}
          posterSizes="100vw"
          sources={assets.videos.homeHero}
          startAt={0.25}
          eagerPoster
          playLabel="Play background video"
        />
        <div className="home-video-hero__overlay" aria-hidden="true" />
        <div className="home-video-hero__content home-video-hero__content--animated shell">
          <h1 className="home-video-hero__wordmark">Drith Infra Private Limited</h1>
          <p className="eyebrow">Partner in Sustainable Coastline Infrastructure</p>
          <p className="home-video-hero__certification">
            ISO 9001:2015 Certified Quality Research Organization
          </p>
        
          <div className="button-row">
            <ButtonLink to="/projects" variant="secondary">Our Projects</ButtonLink>
            <ButtonLink to="/contact" variant="secondary">Contact Us</ButtonLink>
          </div>
        </div>
      </section>

      {/* Homepage project cards are generated from the auto-discovered project modules. */}
      <section className="section principles-section">
        <div className="shell">
          <SectionHeading title="Our Projects" />
          <div className="principle-grid">
            {projects.map((project, index) => (
              <Reveal key={project.slug} className="principle-card glass-panel" delay={index * 0.06}>
                <span>0{index + 1}</span>
                <OptimizedImage className="principle-card__image" src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" sizes="(max-width: 760px) 88vw, 31vw" />
                <h3>{project.shortName}</h3>
                <p className="eyebrow">{project.eyebrow}</p>
                <p>{project.summary}</p>
                <ButtonLink
                  to={`/projects/${project.slug}`}
                  variant="text"
                  className="project-glass-button"
                  showArrow={false}
                >
                  View project
                </ButtonLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={null}><ComparisonShowcase /></Suspense>

      {/* Founder card. Visual styling comes from founder-section and founder-card CSS classes. */}
      <section className="section founder-section">
        <div className="shell founder-card">
          <Reveal className="founder-card__portrait">
            <OptimizedImage src={assets.team.abhishekGiri} alt="Abhishek Giri, founder and CEO of Drith Infra" loading="lazy" decoding="async" sizes="(max-width: 760px) 72vw, 360px" />
          </Reveal>
          <Reveal className="founder-card__copy" delay={0.08}>
            <p className="eyebrow">Founder and CEO</p>
            <blockquote>“What Matters the Most? Nature Matters!”</blockquote>
            <p>
              Leading Drith Infra with a mission to integrate engineering precision with ecological intelligence — building sustainable coastline infrastructure that protects communities while restoring nature.
            </p>
            <div className="founder-card__actions">
              <ButtonLink to="/about" variant="secondary">Meet the team</ButtonLink>
              <a
                className="button button--secondary"
                href="https://www.linkedin.com/in/abhishekgiri9552/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Abhishek Giri's LinkedIn profile"
              >
                <span>LinkedIn</span>
                <span className="founder-card__button-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Suspense fallback={null}><RecognitionGrid /></Suspense>
      {/* KPI evidence follows recognition milestones in the homepage story. */}
      <Suspense fallback={null}><KpiBand /></Suspense>
      <Suspense fallback={null}><Partners /></Suspense>
      <Suspense fallback={null}><ContactCta /></Suspense>
    </>
  );
}
