import { useEffect, useRef, useState, type UIEvent } from "react";
import { ContactCta } from "../../components/sections/ContactCta";
import { KpiBand } from "../../components/sections/KpiBand";
import { Seo } from "../../components/system/Seo";
import { Icon } from "../../components/ui/Icon";
import { Reveal } from "../../components/ui/Reveal";
import { AdaptiveVideo } from "../../components/ui/AdaptiveVideo";
import { assets, responsiveAssets } from "../../config/assets";
import type { Project } from "../../types/content";

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

const tatrakshakComputationalTesting = [
  {
    title: "Sectional flow study",
    description: "A controlled simulation view used to assess indicative velocity patterns around the model.",
    image: assets.testing.ansysVelocitySection,
    alt: "ANSYS velocity magnitude contour showing simulated flow around a coastal protection model",
    width: 1019,
    height: 429,
  },
  {
    title: "Three-dimensional flow study",
    description: "A wider simulation view used to assess flow behaviour around the geometry.",
    image: assets.testing.ansysVelocityVolume,
    alt: "Three-dimensional ANSYS velocity contour showing simulated flow around a coastal protection model",
    width: 1057,
    height: 741,
  },
] as const;

export default function TatrakshakPage({ project }: { project: Project }) {
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
            <AdaptiveVideo
              className="project-adaptive-video"
              poster={responsiveAssets.hero.home}
              posterSizes="(max-width: 760px) 92vw, 48vw"
              sources={assets.videos.tatrakshakHero}
              eagerPoster
              playLabel="Play TATRakshak video"
            />
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
                    <img src={item.image} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
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
                    <img src={goal.image} alt={`SDG ${goal.id}: ${goal.title}`} width="300" height="300" loading="lazy" decoding="async" />
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
