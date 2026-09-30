"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { getHashId, handleHashNavigation } from "@/lib/scroll";

const variants = {
  primary:
    "bg-accent text-bg hover:brightness-110 shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_40%,transparent)]",
  ghost:
    "border border-border bg-transparent text-fg hover:border-accent/40 hover:bg-accent-soft",
  link: "bg-transparent px-0 text-fg-muted hover:text-fg underline-offset-4 hover:underline",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  external?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  external,
  type = "button",
  onClick,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200",
    variants[variant],
    variant !== "link" && sizes[size],
    className,
  );

  if (href) {
    if (external || href.startsWith("http") || href.endsWith(".pdf")) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }

    if (getHashId(href)) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          onClick={(event) => {
            handleHashNavigation(event, href);
            onClick?.();
          }}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
