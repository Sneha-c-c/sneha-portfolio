"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Award,
  Building2,
  Calendar,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/effects/Reveal";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 220, damping: 14, delay: 0.2 },
  },
};

export function Education() {
  const reduceMotion = useReducedMotion();
  const { degree, institution, university, graduated } = profile.education;

  const details = [
    { icon: Building2, label: "Institution", value: institution },
    { icon: Award, label: "University", value: university },
    { icon: Calendar, label: "Graduated", value: graduated },
    { icon: MapPin, label: "Location", value: "Hassan, Karnataka" },
  ];

  return (
    <section
      id="education"
      className="relative scroll-mt-24 overflow-clip py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="bg-accent-2/10 pointer-events-none absolute top-10 -right-32 h-80 w-80 rounded-full blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <h2 className="font-display text-fg text-3xl leading-none font-semibold tracking-tight sm:text-4xl">
            Education
          </h2>
          <div className="accent-gradient mt-3 h-1 w-16 rounded-full" />
        </Reveal>

        <motion.div
          variants={cardVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="group relative mt-12 rounded-2xl p-px"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden rounded-2xl"
          >
            <div className="edu-border-spin absolute top-1/2 left-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,#e879f9_60deg,#818cf8_120deg,transparent_180deg,transparent_360deg)] opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <article className="bg-bg-elevated relative flex flex-col gap-8 rounded-2xl p-6 sm:p-10 md:flex-row md:items-center">
            <motion.div
              variants={iconVariants}
              className="relative mx-auto shrink-0 md:mx-0"
            >
              <span
                aria-hidden="true"
                className="accent-gradient absolute inset-0 rounded-3xl opacity-40 blur-xl"
              />
              <motion.span
                animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="border-border bg-bg text-accent relative flex h-24 w-24 items-center justify-center rounded-3xl border sm:h-28 sm:w-28"
              >
                <GraduationCap size={48} strokeWidth={1.5} />
              </motion.span>
            </motion.div>

            <div className="min-w-0 flex-1">
              <motion.span
                variants={itemVariants}
                className="bg-accent-soft text-accent inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs"
              >
                Class of {graduated}
              </motion.span>
              <motion.h3
                variants={itemVariants}
                className="font-display text-fg mt-4 text-xl leading-snug font-semibold sm:text-2xl"
              >
                {degree}
              </motion.h3>

              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {details.map(({ icon: Icon, label, value }) => (
                  <motion.div
                    key={label}
                    variants={itemVariants}
                    className="border-border bg-bg/60 hover:border-accent/50 flex items-start gap-3 rounded-xl border p-3 transition-colors"
                  >
                    <Icon size={18} className="text-accent mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <dt className="text-fg-muted text-xs tracking-wider uppercase">
                        {label}
                      </dt>
                      <dd className="text-fg mt-0.5 text-sm">{value}</dd>
                    </div>
                  </motion.div>
                ))}
              </dl>
            </div>
          </article>
        </motion.div>
      </Container>
    </section>
  );
}
