"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Activity,
  Cloud,
  Database,
  Monitor,
  Server,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { skillCategories } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/effects/Reveal";

const categoryIcons: Record<string, LucideIcon> = {
  Frontend: Monitor,
  Backend: Server,
  Databases: Database,
  "Messaging & Caching": Zap,
  "Cloud & DevOps": Cloud,
  "Architecture & Security": ShieldCheck,
  "AI & LLM": Sparkles,
  "Enterprise & Monitoring": Activity,
  Tools: Wrench,
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      delay: (index % 3) * 0.08,
      staggerChildren: 0.03,
      delayChildren: (index % 3) * 0.08 + 0.2,
    },
  }),
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

export function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="expertise"
      className="relative scroll-mt-24 overflow-clip py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="bg-accent/10 pointer-events-none absolute top-20 -right-40 h-96 w-96 rounded-full blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <h2 className="font-display text-fg text-3xl leading-none font-semibold tracking-tight sm:text-4xl">
            Expertise
          </h2>
          <div className="accent-gradient mt-3 h-1 w-16 rounded-full" />
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = categoryIcons[category.title] ?? Wrench;

            return (
              <motion.article
                key={category.title}
                custom={index}
                variants={cardVariants}
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="group relative"
              >
                <div
                  aria-hidden="true"
                  className="accent-gradient absolute -inset-px rounded-2xl opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-60"
                />
                <div className="border-border bg-bg-elevated/80 relative flex h-full flex-col rounded-2xl border p-6 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <span className="bg-accent-soft text-accent inline-flex h-10 w-10 items-center justify-center rounded-xl">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-display text-fg text-lg font-semibold">
                      {category.title}
                    </h3>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <motion.li
                        key={skill}
                        variants={chipVariants}
                        className="border-border bg-bg/60 text-fg-muted hover:border-accent/50 hover:bg-accent-soft hover:text-accent rounded-lg border px-3 py-1.5 text-sm transition-colors duration-200"
                      >
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
