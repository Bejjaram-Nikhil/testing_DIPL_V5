import { assets } from "./assets";

const configuredSiteUrl = import.meta.env.VITE_SITE_URL || "https://drithinfra.in";

export const siteUrl = configuredSiteUrl.replace(/\/+$/, "");

export function absoluteSiteUrl(path: string) {
  return new URL(path, `${siteUrl}/`).toString();
}

export const companyProfile = {
  name: "Drith Infra Private Limited",
  alternateName: "Drith Infra",
  description:
    "A founder-led Indian company developing nature-aligned coastal infrastructure, coastal awareness, and community-led shoreline restoration.",
  slogan: "What Matters The Most? Nature Matters!",
  email: "drithinfra.pvt@gmail.com",
  location: "Pimpri-Chinchwad, Pune, Maharashtra, India",
  address: {
    locality: "Pimpri-Chinchwad",
    region: "Maharashtra",
    country: "IN",
  },
  logo: assets.brand.logo,
  founder: {
    name: "Abhishek Giri",
    role: "Founder & CEO",
    image: assets.team.abhishekGiri,
    linkedin: "https://www.linkedin.com/in/abhishekgiri9552/",
    description:
      "Founder and CEO of Drith Infra, leading the company's nature-first coastal infrastructure direction.",
  },
  profiles: {
    linkedin: "https://www.linkedin.com/company/drith-infra-pvt-ltd/",
    instagram: "https://www.instagram.com/drithinfra/",
  },
  certifications: [
    "ISO 9001:2015 Certified Quality Research Organization",
    "DPIIT Certified | Startup India",
  ],
  award: "All India Rank 1 in Innovation in Resilient Infrastructure | IIT Kanpur",
  expertise: [
    "nature-aligned coastal infrastructure",
    "coastal resilience",
    "wave attenuation",
    "mangrove regeneration",
    "coastal awareness",
    "community-led shoreline restoration",
  ],
} as const;
