import { assets } from "../../config/assets";
import type { Project } from "../../types/content";

export const projectOrder = 3;

const project = {
  slug: "tatsagarmitra",
  eyebrow: "Restoration",
  name: "Project TATSagarMitra",
  shortName: "TATSagarMitra",
  subtitle: "Coastal stewardship and action",
  summary:
    "Where waste becomes wisdom and people unite with purpose, coastlines heal and balance is restored naturally.",
  image: assets.projects.sagarMitra,
  imageAlt: "Coastal restoration worker collecting plastic waste near mangroves",
  tone: "sand",
  metrics: [
    { value: "Restore", label: "shorelines and coastal habitat" },
    { value: "Sustain", label: "community-led stewardship" },
    { value: "Divert", label: "plastic away from ocean pathways" },
    { value: "Balance", label: "ecological systems over time" },
  ],
  capabilities: [
    {
      title: "Responsible recovery",
      description: "Coordinate collection and traceable diversion of plastic in coastal catchments.",
    },
    {
      title: "Material circularity",
      description: "Explore engineered applications that keep recovered material in accountable value chains.",
    },
    {
      title: "Community action",
      description: "Connect practitioners, partners, and coastal residents around shared restoration outcomes.",
    },
  ],
  seoDescription:
    "Learn about TATSagarMitra, DRITH Infra's evolving coastal stewardship and collective-action initiative.",
} satisfies Project;

export default project;

