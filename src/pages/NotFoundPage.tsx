import { Seo } from "../components/system/Seo";
import { ButtonLink } from "../components/ui/ButtonLink";

export default function NotFoundPage() {
  return (
    <section className="not-found not-found--professional shell" aria-labelledby="not-found-title">
      <Seo
        title="Page not found"
        description="The requested Drith Infra page could not be found."
        path="/404"
        robots="noindex, follow"
      />

      <div className="not-found__panel glass-panel">
        <p className="not-found__code">Error 404</p>
        <h1 id="not-found-title">Page not found</h1>
        <p>
          The page you requested is unavailable or may have moved. Use one of the options below to continue
          exploring Drith Infra.
        </p>
        <div className="not-found__actions">
          <ButtonLink to="/">Return home</ButtonLink>
          <ButtonLink to="/projects" variant="secondary">View projects</ButtonLink>
        </div>
      </div>
    </section>
  );
}
