"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import type { ExperienceRole } from "@/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/effects/Reveal";

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
      delayChildren: 0.25,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function RoleCard({ role }: { role: ExperienceRole }) {
  const reduceMotion = useReducedMotion();
  const isCurrent = role.endDate === "Present";

  return (
    <motion.li
      variants={cardVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative pl-10 sm:pl-14"
    >
      <span className="absolute top-7 left-0 flex h-[18px] w-[18px] -translate-x-1/2 items-center justify-center sm:top-8">
        {isCurrent ? (
          <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-50" />
        ) : null}
        <span className="border-bg bg-accent relative h-3.5 w-3.5 rounded-full border-2 shadow-[0_0_12px_var(--accent)]" />
      </span>

      <div className="group relative">
        <div
          aria-hidden="true"
          className="accent-gradient absolute -inset-px rounded-2xl opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-50"
        />
        <article className="border-border bg-bg-elevated/80 relative rounded-2xl border p-6 backdrop-blur-sm sm:p-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-fg text-xl font-semibold sm:text-2xl">
                  {role.title}
                </h3>
                {isCurrent ? (
                  <span className="bg-accent-soft text-accent rounded-full px-2.5 py-0.5 text-xs font-medium">
                    Current
                  </span>
                ) : null}
              </div>
              <p className="text-fg-muted mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <span className="text-fg inline-flex items-center gap-1.5 font-medium">
                  <Briefcase size={14} className="text-accent" />
                  {role.company}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-accent" />
                  {role.location}
                </span>
              </p>
            </div>
            <span className="border-border bg-bg/60 text-fg-muted inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border px-3 py-1 font-mono text-xs">
              <Calendar size={13} className="text-accent" />
              {role.startDate} – {role.endDate}
            </span>
          </header>

          {role.projects?.length ? (
            <p className="text-fg-muted mt-4 text-sm">
              <span className="text-fg font-medium">Projects: </span>
              {role.projects.join(" · ")}
            </p>
          ) : null}

          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
            {role.technologies.map((tech) => (
              <motion.li
                key={tech}
                variants={itemVariants}
                className="border-border bg-bg/60 text-fg-muted hover:border-accent/50 hover:text-accent rounded-lg border px-2.5 py-1 text-xs transition-colors"
              >
                {tech}
              </motion.li>
            ))}
          </ul>

          <ul className="mt-6 space-y-3">
            {role.highlights.map((item) => (
              <motion.li
                key={item}
                variants={itemVariants}
                className="text-fg-muted flex gap-3 text-[15px] leading-7"
              >
                <span
                  aria-hidden="true"
                  className="bg-accent mt-[11px] h-1.5 w-1.5 shrink-0 rotate-45"
                />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </article>
      </div>
    </motion.li>
  );
}

export function Experience() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.5"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  return (
    <section
      id="experience"
      className="relative scroll-mt-24 overflow-clip py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="bg-accent/10 pointer-events-none absolute top-1/4 -left-40 h-96 w-96 rounded-full blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <h2 className="font-display text-fg text-3xl leading-none font-semibold tracking-tight sm:text-4xl">
            Professional Experience
          </h2>
          <div className="accent-gradient mt-3 h-1 w-16 rounded-full" />
          <p className="text-fg-muted mt-5 max-w-2xl text-base leading-relaxed">
            Building scalable frontend applications, backend services, APIs, and
            event-driven workflows across diverse enterprise products.
          </p>
        </Reveal>

        <div className="relative mt-12 ml-2 sm:ml-3">
          <div
            aria-hidden="true"
            className="bg-border absolute top-0 bottom-0 left-0 w-px"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineProgress }}
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-[#e879f9] via-[#a855f7] to-[#6366f1]"
          />

          <ol ref={timelineRef} className="space-y-10">
            {experience.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
