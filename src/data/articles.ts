import { assets } from "../config/assets";

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
