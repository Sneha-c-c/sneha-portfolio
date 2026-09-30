"use client";

import { useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Target, Workflow, Sparkles, X } from "lucide-react";
import type { Project } from "@/types";
import { projectIcons } from "./projectIcons";

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 26,
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
  exit: { opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.2 } },
};

const blockVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, staggerChildren: 0.07 },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  const Icon = project ? projectIcons[project.icon] : null;

  return (
    <AnimatePresence>
      {project && Icon ? (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            variants={panelVariants}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            exit="exit"
            onClick={(event) => event.stopPropagation()}
            className="border-border bg-bg-elevated relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border shadow-2xl sm:rounded-3xl"
          >
            <div className="accent-gradient h-1 w-full" />

            <div className="p-6 sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <motion.div
                  variants={blockVariants}
                  className="flex items-center gap-4"
                >
                  <span className="bg-accent-soft text-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                    <Icon size={24} />
                  </span>
                  <div>
                    <p className="text-accent font-mono text-xs">
                      {project.company}
                    </p>
                    <h3
                      id="project-modal-title"
                      className="font-display text-fg mt-1 text-xl leading-tight font-semibold sm:text-2xl"
                    >
                      {project.name}
                    </h3>
                  </div>
                </motion.div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close project details"
                  className="border-border text-fg-muted hover:border-accent/50 hover:text-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <motion.section variants={blockVariants} className="mt-8">
                <h4 className="text-fg flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                  <Target size={16} className="text-accent" /> Overview
                </h4>
                <p className="text-fg-muted mt-3 leading-relaxed">
                  {project.overview}
                </p>
              </motion.section>

              <motion.section variants={blockVariants} className="mt-8">
                <h4 className="text-fg flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                  <Workflow size={16} className="text-accent" /> How it works
                </h4>
                <ol className="relative mt-4 space-y-3 before:absolute before:top-3 before:bottom-3 before:left-[13px] before:w-px before:bg-gradient-to-b before:from-[#e879f9] before:to-[#6366f1]">
                  {project.flow.map((step, index) => (
                    <motion.li
                      key={step}
                      variants={stepVariants}
                      className="relative flex items-center gap-4"
                    >
                      <span className="border-accent/40 bg-bg text-accent relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs">
                        {index + 1}
                      </span>
                      <span className="text-fg text-sm">{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </motion.section>

              <motion.section variants={blockVariants} className="mt-8">
                <h4 className="text-fg flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
                  <Sparkles size={16} className="text-accent" /> Key highlights
                </h4>
                <ul className="mt-4 space-y-3">
                  {project.highlights.map((item) => (
                    <motion.li
                      key={item}
                      variants={stepVariants}
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
              </motion.section>

              <motion.section variants={blockVariants} className="mt-8">
                <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                  {project.technologies.map((tech) => (
                    <motion.li
                      key={tech}
                      variants={stepVariants}
                      className="border-border bg-bg/60 text-fg-muted rounded-lg border px-2.5 py-1 text-xs"
                    >
                      {tech}
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
