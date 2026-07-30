import { Seo } from "../components/system/Seo";

export default function PoliciesPage() {
  return (
    <>
      <Seo
        title="Website Policies"
        description="Read Drith Infra's website privacy, accessibility, responsible claims, and AI-generated visual disclosures."
        path="/policies"
      />

      <section className="section policies-page">
        <div className="shell policies-layout">
          <header className="policies-intro">
            <p className="eyebrow">Website policies</p>
            <h1>Clear information, responsibly presented.</h1>
            <p>
              These policies explain how this website handles enquiries and analytics, how we approach accessibility,
              and how technical, environmental, and visual claims should be understood.
            </p>
            <p className="policies-updated">Last updated: 24 July 2026</p>
          </header>

          <nav className="policies-nav glass-panel" aria-label="Policy sections">
            <a href="#privacy">Privacy</a>
            <a href="#accessibility">Accessibility</a>
            <a href="#responsible-claims">Responsible claims</a>
          </nav>

          <div className="policies-content">
            <article id="privacy" className="policy-card glass-panel">
              <p className="eyebrow">01 · Privacy</p>
              <h2>How information is handled</h2>

              <h3>Information you choose to provide</h3>
              <p>
                When you submit the contact form, we collect the details shown in the form, including your name,
                email address, phone number, enquiry type, message, and consent to be contacted. We also record the
                submission page, time, and basic browser information so the enquiry can be managed securely and
                followed up appropriately.
              </p>

              <h3>Website analytics</h3>
              <p>
                On the production website, limited first-party analytics may record page paths, page titles,
                referring domains, device category, a temporary session identifier, and performance measurements.
                This information helps us understand whether the website is useful and reliable. The temporary
                session identifier is stored in browser session storage rather than as an advertising profile.
              </p>

              <h3>Use, storage, and sharing</h3>
              <p>
                Information is used to respond to enquiries, operate the website, improve performance, and maintain
                records relevant to a potential collaboration. Contact submissions are processed through our hosted
                database and email-delivery providers. We do not use this website to sell personal information.
                Records are retained only for as long as reasonably necessary for these purposes or applicable
                obligations.
              </p>

              <h3>Your choices</h3>
              <p>
                You may ask us to access, correct, or delete personal information submitted through this website,
                subject to any information we must retain for legitimate operational or legal reasons. Contact
                <a href="mailto:drithinfra.pvt@gmail.com"> drithinfra.pvt@gmail.com</a> with a privacy request.
              </p>
            </article>

            <article id="accessibility" className="policy-card glass-panel">
              <p className="eyebrow">02 · Accessibility</p>
              <h2>Designed for wider access</h2>
              <p>
                Drith Infra aims to make this website usable across modern devices and with common assistive
                technologies. We work toward clear heading structures, keyboard access, visible focus states,
                descriptive alternative text, readable contrast, responsive layouts, and reduced-motion support.
              </p>
              <p>
                Accessibility is an ongoing practice. Some third-party media, linked platforms, or older materials
                may not fully meet the same standard. If any content, form, navigation, or interaction is difficult
                to use, email <a href="mailto:drithinfra.pvt@gmail.com">drithinfra.pvt@gmail.com</a> and describe the
                page and the support you need. We will make a reasonable effort to provide the information in an
                accessible form.
              </p>
            </article>

            <article id="responsible-claims" className="policy-card glass-panel">
              <p className="eyebrow">03 · Responsible claims</p>
              <h2>Evidence, context, and visual disclosure</h2>

              <h3>Technical and environmental information</h3>
              <p>
                Performance indicators, environmental benefits, market estimates, and project outcomes on this
                website may be based on controlled testing, modelling, research assumptions, targets, preliminary
                evaluations, or third-party sources. They are presented to explain the direction and potential of
                our work, not as a universal guarantee of site-specific performance.
              </p>
              <p>
                Actual outcomes depend on local coastal conditions, design development, materials, installation,
                maintenance, monitoring, approvals, and project scope. Formal engineering, environmental, investment,
                procurement, or regulatory decisions should rely on project-specific studies and signed
                documentation.
              </p>

              <h3>AI-generated and illustrative visuals</h3>
              <p>
                Many visuals on this website are AI-generated, digitally composed, conceptual, or otherwise created
                for visual communication. These images may illustrate a possible setting, design intent, ecological
                relationship, or future condition; they should not be interpreted as documentary photographs,
                as-built records, or proof of a completed installation unless the surrounding caption explicitly
                identifies them that way.
              </p>
              <p>
                Where a comparison uses conceptual imagery, it is intended to help communicate an idea rather than
                claim a measured before-and-after outcome. Drith Infra is committed to distinguishing research,
                targets, concepts, and verified results as projects progress.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
