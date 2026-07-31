import { Navigate, useParams } from "react-router-dom";
import { ContactCta } from "../components/sections/ContactCta";
import { Seo } from "../components/system/Seo";
import { StructuredData } from "../components/system/StructuredData";
import { ButtonLink } from "../components/ui/ButtonLink";
import { absoluteSiteUrl, siteUrl } from "../config/company";
import { assets } from "../config/assets";
import { journeyArticle } from "../data";

export default function ArticlePage() {
  const { articleSlug } = useParams();

  if (articleSlug !== journeyArticle.slug) {
    return <Navigate to="/blogs" replace />;
  }

  const articlePath = `/blogs/${journeyArticle.slug}`;
  const articleUrl = absoluteSiteUrl(articlePath);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    headline: journeyArticle.title,
    description: journeyArticle.dek,
    image: absoluteSiteUrl(assets.projects.coast),
    datePublished: journeyArticle.publishedAtISO,
    dateModified: journeyArticle.publishedAtISO,
    inLanguage: "en-IN",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: journeyArticle.author,
      url: absoluteSiteUrl(journeyArticle.authorUrl),
    },
    publisher: { "@id": `${siteUrl}/#organization` },
    about: ["coastal resilience", "mangrove regeneration", "nature-aligned coastal infrastructure"],
  };

  return (
    <>
      <Seo
        title={journeyArticle.title}
        description={journeyArticle.dek}
        path={articlePath}
        type="article"
      />
      <StructuredData id="drith-article-schema" data={articleSchema} />

      <article className="article shell">
        <header>
          <p className="eyebrow">{journeyArticle.category}</p>
          <h1>{journeyArticle.title}</h1>
          <p className="article__dek">{journeyArticle.dek}</p>
          <div>
            <a href={journeyArticle.authorUrl}>By {journeyArticle.author}</a>
            <span>{journeyArticle.publishedAt}</span>
            <span>{journeyArticle.readingTime}</span>
          </div>
        </header>

        <figure>
          <img
            src={assets.projects.coast}
            alt="Coastal vegetation integrated with protective infrastructure"
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            An AI-generated concept image for visual representation, expressing the relationship between coast,
            community, and protection.
          </figcaption>
        </figure>

        <div className="article__body">
          <p className="article__lead">
            Drith Infra&apos;s journey began with awareness: coastlines are dynamic systems, and effective
            infrastructure has to understand those systems before it intervenes.
          </p>

          {journeyArticle.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}

          <blockquote>“Nature is not an add-on. Nature is the core design principle.”</blockquote>

          <section>
            <h2>One direction, three initiatives</h2>
            <p>
              TATChaitanya builds awareness. TATRakshak develops physical protection. TATSagarMitra turns
              shared responsibility into restoration action. Together they form the operating idea behind
              Drith Infra.
            </p>
          </section>

          <ButtonLink to="/projects" variant="secondary">Explore the initiatives</ButtonLink>
        </div>
      </article>

      <ContactCta />
    </>
  );
}
