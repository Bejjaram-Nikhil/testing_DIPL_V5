import { partners } from "../../data";
import { OptimizedImage } from "../ui/OptimizedImage";
import { SectionHeading } from "../ui/SectionHeading";
import "../../styles/partners.css";

export function Partners() {
  return (
    <section className="section partners-section">
      <div className="shell">
        <SectionHeading eyebrow="Research & Innovation" title="Our Knowledge Partners" align="center" />
      </div>
      <div className="partner-marquee" aria-label="Knowledge partner logos">
        <div className="partner-marquee__track">
          {[...partners, ...partners].map((partner, index) => (
            <figure key={`${partner.name}-${index}`}>
              <OptimizedImage
                src={partner.image}
                alt={partner.name}
                loading="lazy"
                decoding="async"
                sizes="256px"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
