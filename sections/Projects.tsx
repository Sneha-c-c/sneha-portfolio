"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import type { Project } from "@/types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/effects/Reveal";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { projectIcons } from "@/components/projects/projectIcons";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const MAX_CHIPS = 4;

export function Projects() {
  const projects = getFeaturedProjects();
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<Project | null>(null);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section
      id="projects"
      className="relative scroll-mt-24 overflow-clip py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="bg-accent/10 pointer-events-none absolute bottom-10 -left-32 h-96 w-96 rounded-full blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <h2 className="font-display text-fg text-3xl leading-none font-semibold tracking-tight sm:text-4xl">
            Projects
          </h2>
          <div className="accent-gradient mt-3 h-1 w-16 rounded-full" />
          <p className="text-fg-muted mt-5 max-w-2xl text-base leading-relaxed">
            Selected work across enterprise products — from AI-powered video
            workflows to event-driven platforms. Click a project for the brief.
          </p>
        </Reveal>

        <motion.ul
          variants={gridVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-6"
        >
          {projects.map((project, index) => {
            const Icon = projectIcons[project.icon];
            const extraChips = project.technologies.length - MAX_CHIPS;

            return (
              <motion.li
                key={project.slug}
                variants={cardVariants}
                className={cn(
                  "group relative",
                  index < 2 ? "lg:col-span-3" : "lg:col-span-2",
                  index === projects.length - 1 &&
                    projects.length % 2 === 1 &&
                    "md:col-span-2 lg:col-span-2",
                )}
              >
                <div
                  aria-hidden="true"
                  className="accent-gradient absolute -inset-px rounded-2xl opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-60"
                />
                <motion.button
                  type="button"
                  onClick={() => setSelected(project)}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  aria-haspopup="dialog"
                  className="border-border bg-bg-elevated relative flex h-full w-full flex-col overflow-hidden rounded-2xl border p-6 text-left sm:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="accent-gradient absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  />

                  <div className="flex items-start justify-between gap-3">
                    <span className="bg-accent-soft text-accent flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon size={22} />
                    </span>
                    <span className="text-fg-muted font-mono text-xs">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="text-accent mt-5 font-mono text-xs">
                    {project.company}
                  </p>
                  <h3 className="font-display text-fg mt-1.5 text-lg leading-snug font-semibold sm:text-xl">
                    {project.name}
                  </h3>
                  <p className="text-fg-muted mt-3 flex-1 text-sm leading-relaxed">
                    {project.shortDescription}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.slice(0, MAX_CHIPS).map((tech) => (
                      <span
                        key={tech}
                        className="border-border bg-bg/60 text-fg-muted rounded-md border px-2 py-0.5 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {extraChips > 0 ? (
                      <span className="border-border text-accent rounded-md border px-2 py-0.5 text-xs">
                        +{extraChips}
                      </span>
                    ) : null}
                  </div>

                  <span className="text-fg group-hover:text-accent mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
                    View details
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </motion.button>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>

      <ProjectModal project={selected} onClose={handleClose} />
    </section>
  );
}
