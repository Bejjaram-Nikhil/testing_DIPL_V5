import { assets } from "../config/assets";

export const journeyArticle = {
  slug: "the-awareness-that-started-drith-infra",
  category: "Drith Infra Journey",
  title: "The awareness that started Drith Infra",
  dek: "Before there was a company or a product, there was a question: can coastal protection defend people while helping nature recover?",
  publishedAt: "26 May 2026",
  readingTime: "5 min read",
  sections: [
    {
      heading: "The first step was understanding the system",
      body: "Coastlines are becoming weaker, mangroves are disappearing, and conventional protection often ignores how waves, sediment, vegetation, and communities interact. Drith Infra began by observing those relationships - not by rushing toward a product.",
    },
    {
      heading: "Nature is not an external factor",
      body: "Mangroves support sediment stability, reduce wave impacts, create habitats, and strengthen natural coastal resilience. That ecological intelligence became design intelligence: infrastructure should support the systems already protecting the shore.",
    },
    {
      heading: "Awareness became TATChaitanya",
      body: "TATChaitanya represents the consciousness layer of Drith Infra. It translates research into shared understanding because protection lasts longer when institutions and communities understand why a coast is vulnerable and how interventions should behave.",
    },
  ],
} as const;

export type BlogPost = {
  title: string;
  image: string;
  alt: string;
  author: string;
  date: string;
  publishedAtISO: string;
  time: string;
  place: string;
  category: string;
  body: string;
  href?: string;
};

export const blogPosts: readonly BlogPost[] = [
  {
    title: journeyArticle.title,
    image: assets.projects.coast,
    alt: "Nature-integrated coastal protection supporting a living shoreline",
    author: "Drith Infra",
    date: journeyArticle.publishedAt,
    publishedAtISO: "2026-05-26",
    time: journeyArticle.readingTime,
    place: "Pune, India",
    category: journeyArticle.category,
    body: journeyArticle.dek,
    href: `/blogs/${journeyArticle.slug}`,
  },
  {
    title: "Me as an Engineer",
    image: assets.articles.engineer,
    alt: "Abhishek Giri using a surveying instrument during field work",
    author: "Abhishek Giri",
    date: "16 March 2025",
    publishedAtISO: "2025-03-16T10:30:00+05:30",
    time: "10:30 AM",
    place: "Pune, India",
    category: "Field Note",
    body:
      "Engineering begins when I stop looking at a site as a drawing and start reading it as a living system. Every measurement, level, and observation teaches me how infrastructure must respond to land, water, people, and time.",
  },
  {
    title: "Me as a CEO",
    image: assets.articles.ceo,
    alt: "Drith Infra presenting coastline resilience work in a meeting room",
    author: "Abhishek Giri",
    date: "16 March 2025",
    publishedAtISO: "2025-03-16T16:30:00+05:30",
    time: "04:30 PM",
    place: "Pune, India",
    category: "Leadership Note",
    body:
      "Being a CEO at this stage means carrying the vision into every room with clarity and responsibility. Drith Infra is not just building a product; it is building trust around nature-aligned coastal infrastructure.",
  },
].sort(
  (first, second) =>
    new Date(second.publishedAtISO).getTime() -
    new Date(first.publishedAtISO).getTime(),
);
