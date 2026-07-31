import { assets } from "../../config/assets";
import type { Project } from "../../types/content";

export const projectOrder = 1;

const project = {
  slug: "tatchaitanya",
  eyebrow: "Awareness",
  name: "Project TATChaitanya",
  shortName: "TATChaitanya",
  subtitle: "Coastal awareness and knowledge",
  summary:
    "Where awareness is the first line of defence, empowering communities to protect nature before disasters even begin.",
  image: assets.projects.chaitanya,
  imageAlt: "Community learning session about nature and coastal stewardship",
  tone: "forest",
  metrics: [
    { value: "1 cause", label: "building awareness" },
    { value: "3 areas", label: "Awareness • Learning • Stewardship" },
    { value: "1 outcome", label: "shared sustainability practice" },
    { value: "Open", label: "to institutions and communities" },
  ],
  capabilities: [
    {
      title: "Awareness",
      description: "Make coastal risk, erosion, and ecosystem relationships legible to non-specialists.",
    },
    {
      title: "Learning",
      description: "Translate Drith Infra's research into workshops, field learning, and institutional programs.",
    },
    {
      title: "Stewardship",
      description: "Equip communities to take part in long-term care, observation, and resilience planning.",
    },
  ],
  seoDescription:
    "Explore TATChaitanya, DRITH Infra's coastal awareness, education and knowledge initiative for communities, students, institutions and public stakeholders.",
} satisfies Project;

export default project;

