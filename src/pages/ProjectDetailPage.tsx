import { useEffect, useRef, useState, type UIEvent } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ContactCta } from "../components/sections/ContactCta";
import { KpiBand } from "../components/sections/KpiBand";
import { Seo } from "../components/system/Seo";
import { Icon } from "../components/ui/Icon";
import { Reveal } from "../components/ui/Reveal";
import { assets } from "../config/assets";
import { projects } from "../data";
import "../styles/initiative-pages.css";

type Project = (typeof projects)[number];

const tatrakshakRoles = [
  {
    title: "Coastal Protection",
    label: "Engineering Role",
    icon: "shield" as const,
    summary: "Reduces erosion and absorbs wave energy through modular coastline protection.",
    details:
      "TATRakshak is designed to reduce coastline erosion, absorb wave energy, and support shorelines exposed to storm surges, tidal action, and long-term coastal vulnerability.",
  },
  {
    title: "Ecological Regeneration",
    label: "Natural Role",
    icon: "leaf" as const,
    summary: "Creates conditions for coastline ecosystems to recover over time.",
    details:
      "The system works with nature by supporting sediment stability, mangrove growth, and ecological recovery, turning protection into a living infrastructure response.",
  },
  {
    title: "Lifecycle & Circular Value",
    label: "System Role",
    icon: "wave" as const,
    summary: "Connects durability, reuse, and low-carbon coastline resilience.",
    details:
      "Its modular lifecycle approach is intended to reduce material waste, support adaptive deployment, and keep long-term infrastructure decisions accountable.",
  },
] as const;

const sdgGoals = [
  { id: "09", title: "Industry, Innovation and Infrastructure", image: assets.sdgs.industry },
  { id: "11", title: "Sustainable Cities and Communities", image: assets.sdgs.cities },
  { id: "13", title: "Climate Action", image: assets.sdgs.climate },
  { id: "14", title: "Life Below Water", image: assets.sdgs.water },
] as const;

const tatrakshakTesting = [
  {
    title: "Breakwater scale model",
    description: "A physical coastal cross-section observed under controlled laboratory conditions.",
    image: assets.testing.breakwaterModel,
    alt: "Physical breakwater scale model configured inside a laboratory flume",
  },
  {
    title: "Model units assessed",
    description: "Different unit forms arranged and reviewed through comparative physical testing.",
    image: assets.testing.modelUnits,
    alt: "Assorted coloured scale-model coastal armour units arranged for testing",
  },
  {
    title: "Comparative model series",
    description: "A wider set of concepts prepared and observed during the completed laboratory study.",
    image: assets.testing.modelSeries,
    alt: "Multiple coastal protection unit forms arranged beside a laboratory flume",
  },
] as const;

export default function ProjectDetailPage() {
  const { projectSlug } = useParams();
  const project = projects.find((item) => item.slug === projectSlug);
  if (!project) return <Navigate to="/projects" replace />;

  if (project.slug === "tatrakshak") return <TatrakshakDetail project={project} />;
  if (project.slug === "tatchaitanya") return <TatchaitanyaDetail project={project} />;
  if (project.slug === "tatsagarmitra") return <TatsagarmitraDetail project={project} />;

  return <SimpleProjectDetail project={project} />;
}

const tatchaitanyaFocus = [
  "The importance of coastlines",
  "Coastal erosion awareness",
  "Mangroves, wetlands and marine ecosystems",
  "Climate and disaster-risk education",
  "Public campaigns, community workshops and shared learning",
] as const;

const tatrakshakComputationalTesting = [
  {
    title: "Sectional flow study",
    description: "A controlled simulation view used to assess indicative velocity patterns around the model.",
    image: assets.testing.ansysVelocitySection,
    alt: "ANSYS velocity magnitude contour showing simulated flow around a coastal protection model",
  },
  {
    title: "Three-dimensional flow study",
    description: "A wider simulation view used to assess flow behaviour around the geometry.",
    image: assets.testing.ansysVelocityVolume,
    alt: "Three-dimensional ANSYS velocity contour showing simulated flow around a coastal protection model",
  },
] as const;

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

function TatchaitanyaDetail({ project }: { project: Project }) {
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
        <div className="shell initiative-hero glass-panel">
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
            <img src={project.image} alt={project.imageAlt} loading="eager" decoding="async" />
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
                  preload="metadata"
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

function TatsagarmitraDetail({ project }: { project: Project }) {
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

      <ContactCta />
    </>
  );
}

function SimpleProjectDetail({ project }: { project: Project }) {
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
            <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
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

function TatrakshakDetail({ project }: { project: Project }) {
  const [openRole, setOpenRole] = useState<string | null>(null);
  const [sdgsOpen, setSdgsOpen] = useState(false);
  const [activeComputationalIndex, setActiveComputationalIndex] = useState(0);
  const [activeTestingIndex, setActiveTestingIndex] = useState(0);
  const computationalGridRef = useRef<HTMLDivElement>(null);
  const testingGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousels = [computationalGridRef.current, testingGridRef.current].filter(
      (carousel): carousel is HTMLDivElement => Boolean(carousel),
    );
    if (!carousels.length) return;

    const mobileQuery = window.matchMedia("(max-width: 820px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers = new Map<HTMLDivElement, number>();

    const stop = (carousel: HTMLDivElement) => {
      const timer = timers.get(carousel);
      if (timer) window.clearTimeout(timer);
      timers.delete(carousel);
    };
    const schedule = (carousel: HTMLDivElement, delay = 3800) => {
      stop(carousel);
      if (!mobileQuery.matches || motionQuery.matches) return;

      const timer = window.setTimeout(() => {
        const cards = Array.from(carousel.children) as HTMLElement[];
        if (cards.length < 2) return;

        const viewportCenter = carousel.scrollLeft + carousel.clientWidth / 2;
        let currentIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
          const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - viewportCenter);
          if (distance < closestDistance) {
            currentIndex = index;
            closestDistance = distance;
          }
        });

        const nextCard = cards[(currentIndex + 1) % cards.length];
        if (!nextCard) return;

        carousel.scrollTo({
          left: nextCard.offsetLeft - (carousel.clientWidth - nextCard.offsetWidth) / 2,
          behavior: "smooth",
        });
        schedule(carousel);
      }, delay);
      timers.set(carousel, timer);
    };

    const listeners = carousels.map((carousel) => {
      const pause = () => stop(carousel);
      const resume = () => schedule(carousel, 5000);
      carousel.addEventListener("touchstart", pause, { passive: true });
      carousel.addEventListener("touchend", resume, { passive: true });
      carousel.addEventListener("focusin", pause);
      carousel.addEventListener("focusout", resume);
      schedule(carousel);
      return { carousel, pause, resume };
    });
    const sync = () => carousels.forEach((carousel) => schedule(carousel));

    mobileQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);

    return () => {
      listeners.forEach(({ carousel, pause, resume }) => {
        stop(carousel);
        carousel.removeEventListener("touchstart", pause);
        carousel.removeEventListener("touchend", resume);
        carousel.removeEventListener("focusin", pause);
        carousel.removeEventListener("focusout", resume);
      });
      mobileQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  const getClosestCarouselIndex = (carousel: HTMLDivElement) => {
    const viewportCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(carousel.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - viewportCenter);
      if (distance < closestDistance) {
        closestIndex = index;
        closestDistance = distance;
      }
    });

    return closestIndex;
  };

  const handleComputationalScroll = (event: UIEvent<HTMLDivElement>) => {
    const closestIndex = getClosestCarouselIndex(event.currentTarget);
    if (closestIndex !== activeComputationalIndex) setActiveComputationalIndex(closestIndex);
  };

  const handleTestingScroll = (event: UIEvent<HTMLDivElement>) => {
    const closestIndex = getClosestCarouselIndex(event.currentTarget);
    if (closestIndex !== activeTestingIndex) setActiveTestingIndex(closestIndex);
  };

  const showCarouselCard = (carousel: HTMLDivElement | null, index: number) => {
    const card = carousel?.children.item(index) as HTMLElement | null;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const showComputationalCard = (index: number) => {
    showCarouselCard(computationalGridRef.current, index);
  };

  const showTestingCard = (index: number) => {
    showCarouselCard(testingGridRef.current, index);
  };

  return (
    <>
      <Seo
        title={project.name}
        description={project.seoDescription}
        path={`/projects/${project.slug}`}
        image={assets.projects.tatrakshakCoast}
      />

      <section className="section project-simple-section">
        <div className="shell project-simple-hero project-simple-hero--tat glass-panel">
          <Reveal className="project-simple-hero__copy">
            <p className="eyebrow">Project</p>
            <h1>TATRakshak</h1>
            <p className="project-simple-hero__lead">
              TATRakshak is a sustainable coastal protection system that defends shorelines while restoring natural ecosystems. It reimagines coastal infrastructure by working with nature — not against it — creating protection that strengthens over time.
            </p>
          </Reveal>
          <Reveal className="project-simple-hero__media project-simple-hero__media--video" delay={0.08}>
            <video autoPlay muted loop playsInline preload="auto" poster={assets.projects.tatrakshakCoast}>
              <source src={assets.videos.tatrakshakHero} type="video/mp4" />
            </video>
          </Reveal>
        </div>
      </section>

      <section className="section project-simple-section project-simple-section--tight">
        <div className="shell">
          <Reveal className="project-simple-heading">
            <p className="eyebrow">Click for more details</p>
            <h2>How TATRakshak works.</h2>
          </Reveal>

          <div className="project-expand-grid">
            {tatrakshakRoles.map((role, index) => {
              const isOpen = openRole === role.title;
              return (
                <Reveal key={role.title} delay={index * 0.05}>
                  <button
                    className={`project-expand-card glass-panel ${isOpen ? "project-expand-card--open" : ""}`.trim()}
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenRole(isOpen ? null : role.title)}
                  >
                    <span className="project-expand-card__index">0{index + 1}</span>
                    <Icon name={role.icon} width="28" />
                    <span className="eyebrow">{role.label}</span>
                    <strong>{role.title}</strong>
                    <span className="project-expand-card__summary">{role.summary}</span>
                    <span className="project-expand-card__details">{role.details}</span>
                    <span className="project-expand-card__hint">{isOpen ? "Click to close" : "Click to read more"}</span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section project-simple-section project-simple-section--tight">
        <div className="shell tatrakshak-validation">
          <Reveal className="project-simple-heading tatrakshak-testing-heading">
            <h2>Completed testing &amp; validation.</h2>
          </Reveal>

          <div className="tatrakshak-computational-block">
            <Reveal className="tatrakshak-test-subheading">
              <p className="eyebrow">Computational simulation</p>
              <h3>Flow behaviour assessed.</h3>
              <p>Selected ANSYS views present indicative flow patterns examined during the completed simulation work.</p>
            </Reveal>

            <div
              ref={computationalGridRef}
              className="tatrakshak-computational-grid"
              role="region"
              aria-label="Completed computational testing"
              onScroll={handleComputationalScroll}
            >
              {tatrakshakComputationalTesting.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <figure className="tatrakshak-computational-card glass-panel">
                    <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                    <figcaption>
                      <span>0{index + 1}</span>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>

            <div className="tatrakshak-testing-dots" aria-label="Choose a computational testing image">
              {tatrakshakComputationalTesting.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={index === activeComputationalIndex ? "is-active" : ""}
                  aria-label={`Show computational testing image ${index + 1}: ${item.title}`}
                  aria-current={index === activeComputationalIndex ? "true" : undefined}
                  onClick={() => showComputationalCard(index)}
                />
              ))}
            </div>
          </div>

          <Reveal className="tatrakshak-test-subheading tatrakshak-physical-heading">
            <p className="eyebrow">Physical model testing</p>
            <h3>Miniature model testing completed.</h3>
            <p>Miniature coastal models were observed under controlled conditions to support measured comparison and design refinement.</p>
          </Reveal>

          <div
            ref={testingGridRef}
            className="tatrakshak-testing-grid"
            role="region"
            aria-label="Completed physical testing"
            onScroll={handleTestingScroll}
          >
            {tatrakshakTesting.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <figure className="tatrakshak-testing-card glass-panel">
                  <img src={item.image} alt={item.alt} width="1280" height="960" loading="lazy" decoding="async" />
                  <figcaption>
                    <span>0{index + 1}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="tatrakshak-testing-dots" aria-label="Choose a physical testing image">
            {tatrakshakTesting.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={index === activeTestingIndex ? "is-active" : ""}
                aria-label={`Show testing image ${index + 1}: ${item.title}`}
                aria-current={index === activeTestingIndex ? "true" : undefined}
                onClick={() => showTestingCard(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section project-simple-section project-simple-section--tight">
        <div className="shell tatrakshak-resource-grid">
          <Reveal className={`sdg-disclosure glass-panel ${sdgsOpen ? "sdg-disclosure--open" : ""}`.trim()}>
            <div className="sdg-disclosure__heading">
              <div>
                <p className="eyebrow">Sustainable development</p>
                <h2>SDG Goals</h2>
                <p>See the global goals connected with the direction of TATRakshak.</p>
              </div>
              <button
                type="button"
                className="sdg-disclosure__toggle"
                aria-expanded={sdgsOpen}
                aria-controls="tatrakshak-sdg-goals"
                onClick={() => setSdgsOpen((current) => !current)}
              >
                <span>{sdgsOpen ? "Read less" : "Read more"}</span>
                <span className="sdg-disclosure__chevron" aria-hidden="true" />
              </button>
            </div>

            <div id="tatrakshak-sdg-goals" className="sdg-disclosure__content" aria-hidden={!sdgsOpen}>
              <div className="sdg-gallery" aria-label="Sustainable Development Goals">
                {sdgGoals.map((goal) => (
                  <figure key={goal.id} className="sdg-gallery__item">
                    <img src={goal.image} alt={`SDG ${goal.id}: ${goal.title}`} loading="lazy" decoding="async" />
                    <figcaption>SDG {goal.id}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      <KpiBand />
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
