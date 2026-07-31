import { absoluteSiteUrl, companyProfile, siteUrl } from "../../config/company";
import { StructuredData } from "./StructuredData";

export function OrganizationSchema() {
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const founderId = `${siteUrl}/about#founder`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Corporation",
        "@id": organizationId,
        name: companyProfile.name,
        legalName: companyProfile.name,
        alternateName: companyProfile.alternateName,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: absoluteSiteUrl(companyProfile.logo),
        },
        image: absoluteSiteUrl(companyProfile.logo),
        description: companyProfile.description,
        slogan: companyProfile.slogan,
        email: companyProfile.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: companyProfile.address.locality,
          addressRegion: companyProfile.address.region,
          addressCountry: companyProfile.address.country,
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "business enquiries",
          email: companyProfile.email,
          availableLanguage: "English",
        },
        sameAs: [companyProfile.profiles.linkedin, companyProfile.profiles.instagram],
        founder: { "@id": founderId },
        knowsAbout: companyProfile.expertise,
        award: companyProfile.award,
        hasCertification: companyProfile.certifications.map((name) => ({
          "@type": "Certification",
          name,
          about: { "@id": organizationId },
        })),
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: companyProfile.founder.name,
        jobTitle: companyProfile.founder.role,
        description: companyProfile.founder.description,
        image: companyProfile.founder.image,
        url: `${siteUrl}/about#founder`,
        sameAs: [companyProfile.founder.linkedin],
        worksFor: { "@id": organizationId },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: companyProfile.name,
        alternateName: companyProfile.alternateName,
        description: companyProfile.description,
        inLanguage: "en-IN",
        publisher: { "@id": organizationId },
      },
    ],
  };

  return <StructuredData id="drith-organization-schema" data={schema} />;
}
