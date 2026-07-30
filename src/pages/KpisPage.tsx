import { useState } from "react";
import { ContactCta } from "../components/sections/ContactCta";
import { Partners } from "../components/sections/Partners";
import { Seo } from "../components/system/Seo";
import { KpiCard } from "../features/kpis/KpiCard";
import { kpiCards } from "../features/kpis/kpiCards";
import "../styles/kpi-cards.css";
import "../styles/kpis-heading.css";

export default function KpisPage() {
  const [openCards, setOpenCards] = useState<Set<number>>(() => new Set());

  const toggleCard = (index: number) => {
    setOpenCards((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <>
      <Seo
        title="Key Performance Indicators"
        description="Explore Drith Infra's coastal resilience KPIs across wave performance, carbon value, ecology, lifecycle cost, and market potential."
        path="/kpis"
      />
      <section className="kpis-page-heading shell" aria-labelledby="kpis-page-title">
        <h1 id="kpis-page-title">Key Performance Indicators</h1>
      </section>

      {/* Interactive KPI grid. Clicking a card toggles the kpi-flip-card--open CSS state. */}
      <section className="section kpis-showcase">
        <div className="shell kpi-card-grid">
          {kpiCards.map((kpi, index) => (
            <KpiCard
              key={`${kpi.value}-${kpi.title}`}
              index={index}
              isOpen={openCards.has(index)}
              kpi={kpi}
              onToggle={() => toggleCard(index)}
            />
          ))}
        </div>
      </section>

      <Partners />
      <ContactCta />
    </>
  );
}

