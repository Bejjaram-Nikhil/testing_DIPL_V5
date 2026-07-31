import { assets } from "../../config/assets";
import type { Project } from "../../types/content";

export const projectOrder = 2;

const project = {
  slug: "tatrakshak",
  eyebrow: "Protection",
  name: "Project TATRakshak",
  shortName: "TATRakshak",
  subtitle: "Nature-integrated coastal protection",
  summary:
    "Where we know engineers can't stop disasters, but we can reduce their impact through our knowledge, innovation, and consciousness.",
  image: assets.projects.coast,
  imageAlt: "Concept rendering of vegetated modular coastal armour protecting a shoreline",
  tone: "ocean",
  metrics: [
    { value: "Protection", label: "Reduces erosion and wave impact." },
    { value: "Carbon", label: "Supports coastal carbon capture." },
    { value: "Regeneration", label: "Enables natural ecosystem recovery." },
    { value: "Resilience", label: "Strengthens long-term coastal defence." },
  ],
  capabilities: [
    {
      title: "Coastal protection",
      description: "Modular eco-armour units reduce direct shoreline impact while adapting to local wave climates.",
    },
    {
      title: "Ecological regeneration",
      description: "Planting chambers, sediment capture, and root anchoring help coastal vegetation re-establish.",
    },
    {
      title: "Circular lifecycle",
      description: "Units are designed for repair, relocation, and redeployment instead of demolition and replacement.",
    },
  ],
  seoDescription:
    "Discover TATRakshak, Drith Infra's modular nature-aligned coastal protection system for wave attenuation and mangrove regeneration.",
} satisfies Project;

export default project;

