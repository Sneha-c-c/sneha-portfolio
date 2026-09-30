import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/effects/Reveal";

function renderBold(text: string) {
  return text.split("**").map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="text-fg font-semibold">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

const codeLines: { key: string; value: string | string[] }[] = [
  { key: "role", value: "Software Development Engineer" },
  { key: "experience", value: `${profile.yearsExperience} years` },
  { key: "location", value: "Bengaluru, India" },
  { key: "stack", value: ["React", "Next.js", "Node.js", "Python"] },
  { key: "focus", value: "Scalable full-stack systems" },
];

function ProfileCard() {
  return (
    <div className="group relative">
      <div
        aria-hidden="true"
        className="accent-gradient absolute -inset-px rounded-2xl opacity-40 blur-md transition-opacity duration-500 group-hover:opacity-70"
      />
      <div className="border-border bg-bg-elevated/90 relative overflow-hidden rounded-2xl border backdrop-blur-sm">
        <div className="border-border flex items-center gap-2 border-b px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="text-fg-muted ml-3 font-mono text-xs">about.ts</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:text-sm">
          <code>
            <span className="text-accent">const</span>{" "}
            <span className="text-fg">sneha</span>{" "}
            <span className="text-fg-muted">=</span>{" "}
            <span className="text-fg-muted">{"{"}</span>
            {"\n"}
            {codeLines.map(({ key, value }) => (
              <span key={key}>
                {"  "}
                <span className="text-indigo-300">{key}</span>
                <span className="text-fg-muted">: </span>
                {Array.isArray(value) ? (
                  <>
                    <span className="text-fg-muted">[</span>
                    {value.map((item, i) => (
                      <span key={item}>
                        <span className="text-emerald-300">
                          &quot;{item}&quot;
                        </span>
                        {i < value.length - 1 ? (
                          <span className="text-fg-muted">, </span>
                        ) : null}
                      </span>
                    ))}
                    <span className="text-fg-muted">]</span>
                  </>
                ) : (
                  <span className="text-emerald-300">&quot;{value}&quot;</span>
                )}
                <span className="text-fg-muted">,</span>
                {"\n"}
              </span>
            ))}
            <span className="text-fg-muted">{"};"}</span>
          </code>
        </pre>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-clip py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="bg-accent/10 pointer-events-none absolute top-1/3 -left-40 h-96 w-96 rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-accent-2/10 pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24">
            <h2 className="font-display text-fg text-3xl leading-none font-semibold tracking-tight sm:text-4xl">
              About Me
            </h2>
            <div className="accent-gradient mt-3 h-1 w-16 rounded-full" />
            <div className="mt-8">
              <ProfileCard />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="text-fg-muted space-y-4 text-[15px] leading-7 sm:text-base">
              {profile.about.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{renderBold(paragraph)}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
