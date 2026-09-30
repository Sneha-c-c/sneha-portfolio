"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { LineWave } from "@/components/effects/LineWave";
import { Typewriter } from "@/components/effects/Typewriter";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const identityRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [nameDone, setNameDone] = useState(false);

  useEffect(() => {
    const node = identityRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        setInView(visible);
        if (!visible) setNameDone(false);
      },
      { threshold: [0, 0.35, 0.6] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleNameComplete = useCallback(() => {
    setNameDone(true);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <LineWave className="pointer-events-none absolute inset-0 h-full w-full" />

      <Container className="relative z-10 flex min-h-[100svh] items-center pt-24 pb-40">
        <motion.div
          ref={identityRef}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start"
        >
          <div
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-neutral-200 font-sans text-3xl font-bold tracking-tight text-neutral-800 sm:h-28 sm:w-28"
            aria-hidden="true"
          >
            SC
          </div>

          <h1 className="text-fg mt-6 min-h-[1.15em] font-sans text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <Typewriter
              text={profile.heroGreeting}
              active={inView}
              typingMs={130}
              startDelayMs={250}
              onComplete={handleNameComplete}
            />
          </h1>

          <p className="text-fg relative mt-4 text-lg sm:text-xl">
            <span className="invisible">{profile.title}</span>
            <span className="absolute inset-0">
              <Typewriter
                text={profile.title}
                active={inView && nameDone}
                typingMs={60}
                startDelayMs={150}
                showCursor={false}
              />
            </span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#projects">
              View Projects <ArrowRight size={16} />
            </Button>
            <Button href={profile.resumeUrl} variant="ghost" external>
              <FileText size={16} /> View Resume
            </Button>
            <Button href="#contact" variant="ghost">
              <Mail size={16} /> Contact Me
            </Button>
          </div>
        </motion.div>
      </Container>

      <div className="absolute inset-x-0 bottom-8 z-10 sm:bottom-10">
        <Container className="flex justify-end">
          <div className="flex flex-col items-center gap-3">
            <p className="text-accent font-mono text-sm sm:text-base">
              <span className="text-fg-muted">$ </span>
              <span className="relative inline-block text-left">
                <span className="invisible">Connect with me_</span>
                <span className="absolute inset-0 whitespace-nowrap">
                  <Typewriter
                    text="Connect with me"
                    active={inView}
                    typingMs={90}
                    startDelayMs={600}
                  />
                </span>
              </span>
            </p>
            <div className="flex items-center gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border bg-bg-elevated/70 text-fg hover:border-accent/60 hover:bg-accent-soft hover:text-accent inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-sm transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border bg-bg-elevated/70 text-fg hover:border-accent/60 hover:bg-accent-soft hover:text-accent inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-sm transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
