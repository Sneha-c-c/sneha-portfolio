"use client";

import { useEffect } from "react";
import { scrollToHash } from "@/lib/scroll";

export function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const timer = window.setTimeout(() => {
      scrollToHash(hash);
    }, 80);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
