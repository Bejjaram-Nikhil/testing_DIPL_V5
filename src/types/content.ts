// Project slugs are validated by the auto-discovery registry at runtime.
// Keeping this open-ended means a new project does not require a type edit.
export type ProjectSlug = string;

export interface Project {
  slug: ProjectSlug;
  eyebrow: string;
  name: string;
  shortName: string;
  subtitle: string;
  summary: string;
  image: string;
  imageAlt: string;
  tone: "ocean" | "forest" | "sand";
  metrics: ReadonlyArray<{ value: string; label: string }>;
  capabilities: ReadonlyArray<{ title: string; description: string }>;
  seoDescription: string;
}

export interface Recognition {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  date: string;
  expandable?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  quote: string;
  image?: string;
  linkedin: string;
}
