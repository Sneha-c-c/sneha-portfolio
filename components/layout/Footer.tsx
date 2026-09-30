import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <Container>
        <p className="font-display text-lg font-semibold text-fg">{profile.name}</p>
        <p className="mt-1 text-sm text-fg-muted">{profile.title}</p>
        <p className="mt-4 text-xs text-fg-muted">
          © {year} {profile.name}. Built with Next.js.
        </p>
      </Container>
    </footer>
  );
}
