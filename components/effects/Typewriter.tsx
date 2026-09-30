"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypewriterProps = {
  text: string;
  className?: string;
  typingMs?: number;
  startDelayMs?: number;
  /** When true, runs the typing animation. When false, resets. */
  active?: boolean;
  showCursor?: boolean;
  onComplete?: () => void;
};

export function Typewriter({
  text,
  className,
  typingMs = 150,
  startDelayMs = 200,
  active = true,
  showCursor = true,
  onComplete,
}: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(
    reduceMotion && active ? text : "",
  );
  const [done, setDone] = useState(Boolean(reduceMotion && active));

  useEffect(() => {
    if (reduceMotion) {
      if (active) {
        setDisplayed(text);
        setDone(true);
        onComplete?.();
      } else {
        setDisplayed("");
        setDone(false);
      }
      return;
    }

    if (!active) {
      setDisplayed("");
      setDone(false);
      return;
    }

    let cancelled = false;
    let index = 0;
    let intervalId = 0;

    setDisplayed("");
    setDone(false);

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        if (cancelled) return;

        index += 1;
        setDisplayed(text.slice(0, index));

        if (index >= text.length) {
          window.clearInterval(intervalId);
          setDone(true);
          onComplete?.();
        }
      }, typingMs);
    }, startDelayMs);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [text, typingMs, startDelayMs, active, reduceMotion, onComplete]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">
        {displayed}
        {showCursor ? (
          <span
            className={`ml-0.5 inline-block h-[0.9em] w-[0.08em] translate-y-[0.08em] bg-accent align-baseline ${
              done ? "animate-pulse" : ""
            }`}
          />
        ) : null}
      </span>
    </span>
  );
}
