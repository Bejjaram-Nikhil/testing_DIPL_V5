import { useRef, useState, type UIEvent } from "react";
import { ContactCta } from "../../components/sections/ContactCta";
import { Seo } from "../../components/system/Seo";
import { Icon } from "../../components/ui/Icon";
import { Reveal } from "../../components/ui/Reveal";
import { OptimizedImage } from "../../components/ui/OptimizedImage";
import { assets } from "../../config/assets";
import type { Project } from "../../types/content";

const tatchaitanyaFocus = [
  "The importance of coastlines",
  "Coastal erosion awareness",
  "Mangroves, wetlands and marine ecosystems",
  "Climate and disaster-risk education",
  "Public campaigns, community workshops and shared learning",
] as const;

const coastalErosionVideos = [
  {
    title: "Wave pressure",
    description: "The repeated force acting on exposed shorelines.",
    src: assets.videos.coastalErosion[0],
    source: "https://www.pexels.com/video/dramatic-coastal-waves-and-cliffs-28905669/",
  },
  {
    title: "Rocky edges",
    description: "Water and weather meeting a resistant coast.",
    src: assets.videos.coastalErosion[1],
    source: "https://www.pexels.com/video/waves-crashing-against-rocky-shoreline-33307539/",
  },
  {
    title: "Moving shorelines",
    description: "Waves continually reshape the meeting point of land and sea.",
    src: assets.videos.coastalErosion[2],
    source: "https://www.pexels.com/video/sea-waves-hitting-the-beach-shore-3725883/",
  },
  {
    title: "Living coastlines",
    description: "Coastal ecosystems form part of the wider shoreline story.",
    src: assets.videos.coastalErosion[3],
    source: "https://www.pexels.com/video/mangrove-19460174/",
  },
] as const;

export default function TatchaitanyaPage({ project }: { project: Project }) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoGridRef = useRef<HTMLDivElement>(null);

  const handleVideoScroll = (event: UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const viewportCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(container.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - viewportCenter);

      if (distance < closestDistance) {
        closestIndex = index;
        closestDistance = distance;
      }
    });

    if (closestIndex !== activeVideoIndex) setActiveVideoIndex(closestIndex);
  };

  const showVideo = (index: number) => {
    const card = videoGridRef.current?.children.item(index) as HTMLElement | null;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <>
      <Seo title={project.name} description={project.seoDescription} path={`/projects/${project.slug}`} image={project.image} />

      <section className="section initiative-hero-section">
        <div className="shell initiative-hero initiative-hero--long-title glass-panel">
          <Reveal className="initiative-hero__copy">
            <p className="eyebrow">Coastal awareness · DRITH Infra</p>
            <h1>TATChaitanya</h1>
            <p className="initiative-hero__statement">Understand and create awareness about the coast.</p>
            <p className="initiative-hero__intro">
              DRITH Infra&apos;s coastal awareness, education and knowledge initiative—created to make coastal issues
              understandable to the public, communities, students, institutions and government stakeholders.
            </p>
          </Reveal>
          <Reveal className="initiative-hero__media" delay={0.08}>
            <OptimizedImage src={project.image} alt={project.imageAlt} loading="eager" decoding="async" fetchPriority="high" sizes="(max-width: 760px) 92vw, 48vw" />
          </Reveal>
        </div>
      </section>

      <section className="section initiative-section initiative-section--tight">
        <div className="shell initiative-message glass-panel">
          <Reveal>
            <p className="eyebrow">The idea</p>
            <h2>Understanding the coast is the first step towards protecting it.</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p>
              TATChaitanya is a public-awareness initiative that brings meaningful social and environmental ideas
              into everyday conversation. Through approachable communication, shared learning and outreach, it
              encourages people to notice, understand and take part.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section initiative-section initiative-section--tight">
        <div className="shell initiative-focus-layout">
          <Reveal className="initiative-section-heading">
            <p className="eyebrow">What it covers</p>
            <h2>Awareness, made accessible.</h2>
            <p>
              Beginning with the coast, TATChaitanya connects people with ideas that shape communities, nature and
              our shared future.
            </p>
          </Reveal>
          <div className="initiative-topic-list" aria-label="TATChaitanya focus areas">
            {tatchaitanyaFocus.map((item, index) => (
              <Reveal key={item} className="initiative-topic" delay={index * 0.035}>
                <span aria-hidden="true">0{index + 1}</span>
                <p>{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section initiative-section initiative-section--tight">
        <div className="shell initiative-context-grid">
          <Reveal className="initiative-context-card glass-panel">
            <p className="eyebrow">Public awareness</p>
            <h3>Important ideas should feel open to everyone.</h3>
            <p>
              TATChaitanya creates approachable spaces for people of different backgrounds to encounter meaningful
              ideas, ask questions and carry the conversation forward.
            </p>
          </Reveal>
          <Reveal className="initiative-context-card glass-panel" delay={0.06}>
            <p className="eyebrow">Our mission</p>
            <h3>To spread awareness that inspires understanding and participation.</h3>
            <p>
              Our mission is to bring social and environmental themes closer to everyday life through clear
              communication, shared learning and inclusive public engagement.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section initiative-section initiative-section--tight coastal-video-section">
        <div className="shell">
          <Reveal className="initiative-section-heading">
            <p className="eyebrow">Coastal erosion</p>
            <h2>A changing edge, observed.</h2>
            <p>A short visual collection of waves, shorelines and living coastal systems.</p>
          </Reveal>
          <div
            ref={videoGridRef}
            className="coastal-video-grid"
            onScroll={handleVideoScroll}
            aria-label="Coastal erosion video carousel"
          >
            {coastalErosionVideos.map((video, index) => (
              <Reveal key={video.title} className="coastal-video-card glass-panel" delay={index * 0.04}>
                <video
                  controls
                  muted
                  playsInline
                  preload="none"
                  aria-label={`${video.title}: stock footage illustrating coastal erosion`}
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                <div className="coastal-video-card__copy">
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                  </div>
                  <a href={video.source} target="_blank" rel="noreferrer">Source</a>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="coastal-video-dots" aria-label="Choose a coastal erosion video">
            {coastalErosionVideos.map((video, index) => (
              <button
                key={video.title}
                type="button"
                className={index === activeVideoIndex ? "is-active" : ""}
                aria-label={`Show video ${index + 1}: ${video.title}`}
                aria-current={index === activeVideoIndex ? "true" : undefined}
                onClick={() => showVideo(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section initiative-section initiative-section--tight">
        <div className="shell initiative-social glass-panel">
          <Reveal className="initiative-social__heading">
            <p className="eyebrow">Continue the conversation</p>
            <h2>Follow Drith Infra Private Limited.</h2>
            <p>
              <strong>Project TATChaitanya initiative</strong>
              <span>Awareness, learning and community-focused updates.</span>
            </p>
          </Reveal>
          <div className="initiative-social__links">
            <Reveal delay={0.04}>
              <a
                className="initiative-social-link"
                href="https://www.linkedin.com/company/drith-infra-pvt-ltd/posts/?feedView=all"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit DRITH Infra on LinkedIn"
              >
                <Icon name="linkedin" width="24" />
                <span><small>Company LinkedIn</small><strong>Drith Infra Private Limited</strong></span>
                <Icon name="arrow" width="20" />
              </a>
            </Reveal>
            <Reveal delay={0.08}>
              <a
                className="initiative-social-link"
                href="https://www.linkedin.com/showcase/tatchaitanya/posts/?feedView=all"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit TATChaitanya on LinkedIn"
              >
                <Icon name="linkedin" width="24" />
                <span><small>Initiative page</small><strong>TATChaitanya</strong></span>
                <Icon name="arrow" width="20" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
