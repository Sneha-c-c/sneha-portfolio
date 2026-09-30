import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "digital-product-investment-platforms",
    name: "Digital Product & Investment Platforms",
    company: "Bespoke Technologies - Bajaj Finserv",
    icon: "layout",
    shortDescription:
      "Built dynamic product experiences and APIs using SolidJS, TypeScript, Node.js, and AEM, with reusable frontend components and content-driven workflows.",
    overview:
      "Content-managed product experiences where business teams author content in AEM and the frontend renders product listings and details dynamically from APIs — no code changes needed for content updates.",
    flow: [
      "Content authored in AEM",
      "Node.js APIs for listings & details",
      "Reusable SolidJS components",
      "Dynamic product pages",
    ],
    highlights: [
      "Built a library of reusable frontend components shared across product experiences.",
      "Developed APIs for product listings, product details, and media processing.",
      "Integrated AEM with the frontend to deliver dynamic, content-driven pages.",
    ],
    technologies: [
      "SolidJS",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "AEM",
      "AWS",
    ],
    featured: true,
  },
  {
    slug: "video-translation-platform",
    name: "Video Translation Platform",
    company: "Bespoke Technologies - Bajaj Finserv",
    icon: "languages",
    shortDescription:
      "Developed an end-to-end multilingual video translation workflow covering video processing, AWS S3 storage, reviewer and auditor validation, retranslation, and publishing workflows.",
    overview:
      "An internal operations portal that localizes English videos into Indian languages — Hindi, Tamil, Telugu, Kannada, Malayalam, and Marathi — with a controlled review workflow, replacing a slow, manual, and hard-to-audit process.",
    flow: [
      "Bulk upload of videos & metadata",
      "Source assets stored in AWS S3",
      "AI translation of video + title/description",
      "Reviewer QC within word quotas",
      "Optional auditor second pass",
      "Publish approved videos",
    ],
    highlights: [
      "Dual-track translation: video and metadata run independently; a job passes only when both succeed.",
      "Six roles (admins, product owners, QC reviewers, auditors) secured with JWT cookies and RBAC on both UI routes and APIs.",
      "Capacity-aware QC assignment with monthly word quotas, plus retry and retranslation for failed jobs.",
      "Full audit trail of who uploaded, reviewed, approved, or rejected each asset.",
    ],
    technologies: [
      "SolidJS",
      "TypeScript",
      "Node.js",
      "AWS S3",
      "REST APIs",
      "JWT",
      "RBAC",
    ],
    featured: true,
  },
  {
    slug: "video-generation-platform",
    name: "Scenario-Based Video Generation Platform",
    company: "Bespoke Technologies - Bajaj Finserv",
    icon: "clapperboard",
    shortDescription:
      "Built scenario-based video generation workflows integrating LLM-based processing, prompt configuration, avatar and thumbnail selection, video composition, review, and publishing.",
    overview:
      "Creates new branded videos from a structured brief. A staged AI pipeline with quality gates replaces the manual scripting, shooting, and editing cycle for every campaign.",
    flow: [
      "Brief submission",
      "Format & template selection",
      "Avatar generation",
      "Scene prompt generation",
      "AI video composition",
      "Thumbnail selection",
      "AI quality scorecard",
      "Review & publish",
    ],
    highlights: [
      "Long-running AI stages run as background workflows with a tracked status for every step.",
      "Deterministic QC: the LLM only reports issues by severity; the app applies a scoring policy and passes videos scoring 85 or above.",
      "Reusable libraries of formats, templates, avatars, and prompts power the step-by-step wizard.",
      "Optional lead review before publishing, with role-gated access on shared authentication.",
    ],
    technologies: [
      "SolidJS",
      "TypeScript",
      "Node.js",
      "LLM Integration",
      "Prompt Engineering",
      "AWS",
      "REST APIs",
    ],
    featured: true,
  },
  {
    slug: "vymo-lead-management-system",
    name: "Lead Management System (LMS) – VYMO",
    company: "MetaZ Digital - Vymo",
    icon: "users",
    shortDescription:
      "Built a MERN-based lead management platform with REST/GraphQL APIs, Kafka-driven event processing, Redis caching, and optimized MongoDB data access for workflow automation.",
    overview:
      "A lead management platform that automates lead assignment, routing, and sales workflows in real time so sales teams act on leads the moment they arrive.",
    flow: [
      "Leads captured via APIs",
      "Events published to Kafka",
      "Real-time routing & assignment",
      "Sales workflow dashboards",
    ],
    highlights: [
      "Designed REST and GraphQL APIs for leads, assignments, and workflow actions.",
      "Kafka-driven event processing for real-time lead routing and automation.",
      "Improved performance with Redis caching and optimized MongoDB indexes and aggregation pipelines.",
    ],
    technologies: [
      "React.js",
      "Redux Toolkit",
      "TypeScript",
      "Node.js",
      "Express.js",
      "GraphQL",
      "Kafka",
      "Redis",
      "MongoDB",
    ],
    featured: true,
  },
  {
    slug: "loan-origination-system",
    name: "Loan Origination System (LOS)",
    company: "MetaZ Digital-Decimal Technologies",
    icon: "landmark",
    shortDescription:
      "Developed backend services supporting loan onboarding, credit assessment, and eligibility workflows, with external verification integrations and automated notification workflows.",
    overview:
      "Backend services that take an applicant from onboarding through verification and credit assessment to an eligibility decision, with automated updates at every stage.",
    flow: [
      "Applicant onboarding",
      "Identity verification",
      "Credit assessment",
      "Eligibility decision",
      "Automated notifications",
    ],
    highlights: [
      "Integrated external identity verification and credit assessment services with retry handling and robust error management.",
      "Secured APIs with JWT-based authentication.",
      "Automated SMS and email notifications through scheduled background jobs.",
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "REST APIs",
      "MongoDB",
      "JWT",
    ],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
