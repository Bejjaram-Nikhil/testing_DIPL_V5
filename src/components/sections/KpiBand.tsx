import { useEffect, useRef, useState, type UIEvent } from "react";
import { ButtonLink } from "../ui/ButtonLink";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { OptimizedImage } from "../ui/OptimizedImage";
import { getKpiImage, getKpiResponsiveImage } from "../../config/assets";
import "../../styles/kpi-preview-carousel.css";

// Homepage-only KPI preview. The full KPI page has the expanded 18-card version.
const previewKpis = [
  {
    value: "16+",
    title: "Coastal & Natural Configurations Tested",
    summary: "Scientific evaluation across natural, conventional, and hybrid ecological shoreline systems.",
  },
  {
    value: "~800-1,200",
    title: "Tons CO2 Reduction per km per Year",
    summary: "Climate-positive infrastructure integrating blue-carbon sequestration and lower-emission materials.",
  },
  {
    value: "80%+",
    title: "Mangrove Survival Rate",
    summary: "Field-validated biological design supporting sapling stability in tidal and wave conditions.",
  },
  {
    value: "25-30%",
    title: "Reduction in Wave Run-Up",
    summary: "Lab-validated Tripot performance dissipating energy instead of reflecting it.",
  },
  {
    value: "30%",
    title: "Lower Embodied CO2",
    summary: "GreenMix material strategy reduces construction-stage emissions while retaining durability.",
  },
  {
    value: "75%",
    title: "Infrastructure Lifecycle Reusability",
    summary: "Repairable, relocatable, and redeployable units designed for circular infrastructure.",
  },
] as const;

interface KpiBandProps {
  compactHeading?: boolean;
}

export function KpiBand({ compactHeading = false }: KpiBandProps = {}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeKpiIndex, setActiveKpiIndex] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const mobileQuery = window.matchMedia("(max-width: 720px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;

    const stop = () => window.clearTimeout(timer);
    const schedule = (delay = 3200) => {
      stop();
      if (!mobileQuery.matches || motionQuery.matches) return;

      timer = window.setTimeout(() => {
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
        schedule();
      }, delay);
    };

    const pause = () => stop();
    const resume = () => schedule(4600);
    const sync = () => schedule();

    carousel.addEventListener("touchstart", pause, { passive: true });
    carousel.addEventListener("touchend", resume, { passive: true });
    carousel.addEventListener("focusin", pause);
    carousel.addEventListener("focusout", resume);
    mobileQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);
    schedule();

    return () => {
      stop();
      carousel.removeEventListener("touchstart", pause);
      carousel.removeEventListener("touchend", resume);
      carousel.removeEventListener("focusin", pause);
      carousel.removeEventListener("focusout", resume);
      mobileQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  const handleCarouselScroll = (event: UIEvent<HTMLDivElement>) => {
    const carousel = event.currentTarget;
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

    if (closestIndex !== activeKpiIndex) setActiveKpiIndex(closestIndex);
  };

  const showKpi = (index: number) => {
    const card = carouselRef.current?.children.item(index) as HTMLElement | null;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section className={`section kpi-preview-section ${compactHeading ? "kpi-preview-section--compact-heading" : ""}`.trim()}>
      <div className="shell">
        {compactHeading ? (
          <SectionHeading title="KPI snapshot" />
        ) : (
          <SectionHeading
            eyebrow="Key performance indicators"
          />
        )}

        <div
          ref={carouselRef}
          className="kpi-preview-grid"
          role="region"
          aria-label="KPI preview carousel"
          onScroll={handleCarouselScroll}
        >
          {previewKpis.map((kpi, index) => (
            <Reveal key={kpi.title} delay={index * 0.04}>
              <article className="kpi-preview-card">
                <div className="kpi-preview-card__topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>Validated indicator</span>
                </div>
                <div className="kpi-preview-card__body">
                  <figure>
                    <OptimizedImage asset={getKpiResponsiveImage(index)} src={getKpiImage(index)} alt="" width="128" height="128" loading="lazy" decoding="async" sizes="128px" />
                  </figure>
                  <div className={`kpi-preview-card__metric ${kpi.value.length > 6 ? "kpi-preview-card__metric--compact" : ""}`.trim()}>
                    <strong>{kpi.value}</strong>
                    <h3>{kpi.title}</h3>
                  </div>
                </div>
                <p>{kpi.summary}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="kpi-preview-dots" aria-label="Choose a KPI">
          {previewKpis.map((kpi, index) => (
            <button
              key={kpi.title}
              type="button"
              className={index === activeKpiIndex ? "is-active" : ""}
              aria-label={`Show KPI ${index + 1}: ${kpi.title}`}
              aria-current={index === activeKpiIndex ? "true" : undefined}
              onClick={() => showKpi(index)}
            />
          ))}
        </div>

        <div className="kpi-preview-section__action">
          <ButtonLink to="/kpis">Know more</ButtonLink>
        </div>
      </div>
    </section>
  );
}
