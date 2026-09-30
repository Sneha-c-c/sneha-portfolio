"use client";

import type { MouseEvent } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  BrainCircuit,
  Cloud,
  Film,
  Gauge,
  Layers,
  Plug,
  RadioTower,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { highlights } from "@/data/highlights";
import type { Highlight, HighlightIcon } from "@/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/effects/Reveal";

const icons: Record<HighlightIcon, LucideIcon> = {
  layers: Layers,
  plug: Plug,
  radio: RadioTower,
  gauge: Gauge,
  cloud: Cloud,
  shield: ShieldCheck,
  brain: BrainCircuit,
  film: Film,
};

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -18 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const iconVariants: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 15, delay: 0.2 },
  },
};

function trackSpotlight(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--x",
    `${event.clientX - rect.left}px`,
  );
  event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
}

function StrengthCard({ item, index }: { item: Highlight; index: number }) {
  const Icon = icons[item.icon];

  return (
    <motion.li variants={cardVariants} className="[perspective:800px]">
      <article
        onMouseMove={trackSpotlight}
        className="group border-border bg-bg-elevated/80 hover:border-accent/40 relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklab, var(--accent) 16%, transparent), transparent 70%)",
          }}
        />

        <div className="relative flex items-center justify-between">
          <motion.span
            variants={iconVariants}
            className="bg-accent-soft text-accent flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
          >
            <Icon size={22} />
          </motion.span>
          <span className="text-fg-muted group-hover:text-accent font-mono text-xs transition-colors">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="font-display text-fg relative mt-5 text-lg leading-snug font-semibold">
          {item.title}
        </h3>
        <p className="text-fg-muted relative mt-3 text-sm leading-relaxed">
          {item.description}
        </p>

        <span
          aria-hidden="true"
          className="accent-gradient absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        />
      </article>
    </motion.li>
  );
}

export function Highlights() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="highlights"
      className="relative scroll-mt-24 overflow-clip py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="bg-accent-2/10 pointer-events-none absolute top-1/3 -right-40 h-96 w-96 rounded-full blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <h2 className="font-display text-fg text-3xl leading-none font-semibold tracking-tight sm:text-4xl">
            Technical Strengths
          </h2>
          <div className="accent-gradient mt-3 h-1 w-16 rounded-full" />
          <p className="text-fg-muted mt-5 max-w-2xl text-base leading-relaxed">
            Engineering capabilities I apply across frontend, backend, cloud,
            data, and AI-driven applications.
          </p>
        </Reveal>

        <motion.ul
          variants={gridVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {highlights.map((item, index) => (
            <StrengthCard key={item.title} item={item} index={index} />
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
