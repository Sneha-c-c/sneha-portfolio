export type SkillCategory = {
  title: string;
  skills: string[];
};

export type ExperienceRole = {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  projects?: string[];
  technologies: string[];
  highlights: string[];
};

export type ProjectIcon =
  "layout" | "languages" | "clapperboard" | "users" | "landmark";

export type Project = {
  slug: string;
  name: string;
  company: string;
  icon: ProjectIcon;
  shortDescription: string;
  overview: string;
  flow: string[];
  highlights: string[];
  technologies: string[];
  featured: boolean;
};

export type HighlightIcon =
  "layers" | "plug" | "radio" | "gauge" | "cloud" | "shield" | "brain" | "film";

export type Highlight = {
  title: string;
  description: string;
  icon: HighlightIcon;
};

export type NavItem = {
  label: string;
  href: string;
};
