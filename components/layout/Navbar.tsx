"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { handleHashNavigation, NAV_HEIGHT } from "@/lib/scroll";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const clickLockUntil = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // A section is active once its top edge passes this line under the navbar.
    const probe = NAV_HEIGHT + 120;

    const updateActive = () => {
      if (Date.now() < clickLockUntil.current) return;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      let current: string | null = null;
      for (const item of navItems) {
        const section = document.getElementById(item.href.slice(1));
        if (!section) continue;
        if (section.getBoundingClientRect().top <= probe) current = item.href;
      }

      if (atBottom) current = navItems[navItems.length - 1].href;
      setActiveHref(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setOpen(false);
    setActiveHref(href);
    // Keep the clicked item highlighted while smooth scrolling passes other sections.
    clickLockUntil.current = Date.now() + 1000;
    handleHashNavigation(event, href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-border/60 bg-bg/80 border-b backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <button
          type="button"
          className="text-fg hover:bg-accent-soft hover:text-accent inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav
          className="border-border/70 bg-bg-elevated/60 hidden items-center gap-1 rounded-full border p-1 backdrop-blur-sm md:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const active = activeHref === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 lg:px-4",
                  active
                    ? "bg-accent text-bg"
                    : "text-fg-muted hover:bg-accent-soft hover:text-accent",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={toggleTheme}
          className="border-border/70 bg-bg-elevated/60 text-fg hover:border-accent/50 hover:bg-accent-soft hover:text-accent inline-flex h-10 w-10 translate-x-2 items-center justify-center rounded-full border transition-colors sm:translate-x-3 lg:translate-x-5 xl:translate-x-16"
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </Container>

      {open ? (
        <nav
          className="bg-bg flex flex-col gap-1 px-5 py-4 sm:px-6 md:hidden"
          aria-label="Mobile"
        >
          {navItems.map((item) => {
            const active = activeHref === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-fg-muted hover:bg-accent-soft hover:text-accent",
                )}
                onClick={(event) => handleNavClick(event, item.href)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
