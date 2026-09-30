import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="pt-28 pb-24">
      <Container className="max-w-3xl">
        <Link
          href="/#projects"
          className="text-fg-muted hover:text-fg inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft size={16} /> Back to projects
        </Link>

        <header className="border-border mt-8 border-b pb-8">
          <p className="text-accent text-xs font-medium tracking-[0.22em] uppercase">
            Featured project
          </p>
          <h1 className="font-display text-fg mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            {project.name}
          </h1>
          <p className="text-fg-muted mt-5 text-base leading-relaxed sm:text-lg">
            {project.shortDescription}
          </p>
        </header>

        <section className="mt-10 space-y-10">
          <div>
            <h2 className="font-display text-fg text-xl font-semibold">
              Overview
            </h2>
            <p className="text-fg-muted mt-3 leading-relaxed">
              {project.overview}
            </p>
          </div>

          <div>
            <h2 className="font-display text-fg text-xl font-semibold">
              How it works
            </h2>
            <ol className="mt-4 space-y-2">
              {project.flow.map((step, index) => (
                <li
                  key={step}
                  className="text-fg-muted flex items-center gap-3"
                >
                  <span className="text-accent font-mono text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="font-display text-fg text-xl font-semibold">
              Technologies
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="border-border bg-bg-elevated text-fg-muted rounded-md border px-2.5 py-1 text-xs"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-fg text-xl font-semibold">
              Key highlights
            </h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((item) => (
                <li key={item} className="text-fg-muted leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/#projects" variant="ghost">
            View all projects
          </Button>
          <Button href="/#contact">Contact Me</Button>
        </div>
      </Container>
    </article>
  );
}
