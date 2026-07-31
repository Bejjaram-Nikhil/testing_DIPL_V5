import { Reveal } from "../../components/ui/Reveal";
import { OptimizedImage } from "../../components/ui/OptimizedImage";
import { getKpiImage, getKpiResponsiveImage } from "../../config/assets";
import type { kpiCards } from "./kpiCards";

type KpiCardData = (typeof kpiCards)[number];

type KpiCardProps = {
  index: number;
  isOpen: boolean;
  kpi: KpiCardData;
  onToggle: () => void;
};

export function KpiCard({ index, isOpen, kpi, onToggle }: KpiCardProps) {
  const detailsId = `kpi-details-${index + 1}`;

  return (
    <Reveal delay={index * 0.025}>
      <article
        className={`kpi-flip-card kpi-flip-card--${kpi.icon} ${isOpen ? "kpi-flip-card--open" : ""}`.trim()}
      >
        <span className="kpi-flip-card__index">{String(index + 1).padStart(2, "0")}</span>
        <div className="kpi-flip-card__summary">
          <figure className="kpi-flip-card__visual">
            <OptimizedImage asset={getKpiResponsiveImage(index)} src={getKpiImage(index)} alt={`${kpi.title} KPI illustration`} width="128" height="128" loading="lazy" decoding="async" sizes="128px" />
          </figure>
          <div className="kpi-flip-card__heading">
            <strong>{kpi.value}</strong>
            <h2>{kpi.title}</h2>
          </div>
        </div>
        <p>{kpi.summary}</p>
        <div
          id={detailsId}
          className="kpi-flip-card__details"
          aria-hidden={!isOpen}
          aria-label={`Read more about ${kpi.title}`}
        >
          <h3>{kpi.title}</h3>
          <ul>
            {kpi.details.map((detail) => <li key={detail}>{detail}</li>)}
          </ul>
        </div>
        <button
          type="button"
          className="kpi-flip-card__read-more"
          aria-expanded={isOpen}
          aria-controls={detailsId}
          aria-label={`${isOpen ? "Close details for" : "Read more about"} ${kpi.title}`}
          onClick={onToggle}
        >
          <span>{isOpen ? "Close details" : "Read more"}</span>
          <span aria-hidden="true" className="kpi-flip-card__read-more-dot" />
        </button>
      </article>
    </Reveal>
  );
}
