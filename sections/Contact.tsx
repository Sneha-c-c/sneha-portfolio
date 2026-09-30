"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { Reveal } from "@/components/effects/Reveal";

type Status = "idle" | "submitting" | "sent" | "drafted" | "error";

const STATUS_TIMEOUT_MS = 5000;

const inputClasses =
  "w-full rounded-xl border border-border bg-bg px-4 text-fg outline-none transition-colors placeholder:text-fg-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/20";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  useEffect(() => {
    if (status === "idle" || status === "submitting") return;
    const timer = window.setTimeout(() => setStatus("idle"), STATUS_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!formspreeId) {
      const name = String(data.get("name") || "");
      const email = String(data.get("email") || "");
      const message = String(data.get("message") || "");
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("drafted");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error("Failed to send");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-clip py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="bg-accent/10 pointer-events-none absolute bottom-0 -left-40 h-96 w-96 rounded-full blur-3xl"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <h2 className="font-display text-fg text-3xl leading-none font-semibold tracking-tight sm:text-4xl">
              Let’s Connect
            </h2>
            <div className="accent-gradient mt-3 h-1 w-16 rounded-full" />
            <p className="text-fg-muted mt-5 max-w-md text-base leading-relaxed">
              Have a project, opportunity, or idea in mind? Let’s connect and
              talk about building scalable, reliable, and user-focused
              applications.
            </p>

            <ul className="mt-10 space-y-4">
              <li className="border-border bg-bg-elevated/70 flex items-center gap-4 rounded-2xl border p-4">
                <span className="bg-accent-soft text-accent flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                  <Mail size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-fg-muted text-xs tracking-wider uppercase">
                    Email
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-fg hover:text-accent mt-0.5 block truncate transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="border-border text-fg-muted hover:border-accent/50 hover:text-accent flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs transition-colors"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </li>

              <li className="border-border bg-bg-elevated/70 flex items-center gap-4 rounded-2xl border p-4">
                <span className="bg-accent-soft text-accent flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="text-fg-muted text-xs tracking-wider uppercase">
                    Location
                  </p>
                  <p className="text-fg mt-0.5">{profile.location}</p>
                </div>
              </li>

              <li className="flex gap-3 pt-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border text-fg-muted hover:border-accent/50 hover:bg-accent-soft hover:text-accent inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors"
                >
                  <GithubIcon size={16} /> GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border text-fg-muted hover:border-accent/50 hover:bg-accent-soft hover:text-accent inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors"
                >
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={handleSubmit}
              className="border-border bg-bg-elevated/80 space-y-5 rounded-2xl border p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="text-fg-muted mb-2 block text-sm"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={`${inputClasses} h-11`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-fg-muted mb-2 block text-sm"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`${inputClasses} h-11`}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-fg-muted mb-2 block text-sm"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Write your message here…"
                  className={`${inputClasses} resize-none py-3`}
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="bg-accent text-bg inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium transition-all hover:brightness-110 disabled:opacity-70 sm:w-auto"
              >
                {status === "submitting" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>

              <div aria-live="polite" className="min-h-0">
                <AnimatePresence mode="wait">
                  {status === "sent" || status === "drafted" ? (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="border-accent/30 bg-accent-soft text-fg flex items-start gap-2 rounded-xl border px-4 py-3 text-sm"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-accent mt-0.5 shrink-0"
                      />
                      {status === "sent"
                        ? "Thanks! Your message has been sent — I’ll get back to you soon."
                        : "Your email app should open with the message ready to send. If it didn’t, use Copy next to my email."}
                    </motion.p>
                  ) : null}
                  {status === "error" ? (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="text-fg flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm"
                    >
                      <AlertCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-red-400"
                      />
                      Something went wrong. Please email {profile.email}{" "}
                      directly.
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
