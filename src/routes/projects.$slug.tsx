import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PROJECTS, type Project } from "@/lib/portfolio-data";
import { Nav } from "@/components/portfolio/Nav";
import { Footer } from "@/components/portfolio/Footer";
import { InteractiveDiagram } from "@/components/portfolio/InteractiveDiagram";
import { Reveal } from "@/components/portfolio/Reveal";
import { ModeProvider } from "@/lib/mode";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — Sarthak Singh" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} — Sarthak Singh`;
    return {
      meta: [
        { title },
        { name: "description", content: project.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: project.tagline },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: project.tagline },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: ProjectNotFound,
});

function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: Project };
  return (
    <ModeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <main>
          <article className="mx-auto max-w-5xl px-6 pt-32 pb-24">
            <Reveal>
              <Link
                to="/"
                hash="work"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
              >
                ← All projects
              </Link>
            </Reveal>

            <Reveal delay={60}>
              <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {project.year} · Case study
              </div>
              <h1 className="mt-3 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{project.tagline}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background hover:-translate-y-px transition-transform"
                >
                  View on GitHub ↗
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex h-11 items-center rounded-full border border-hairline bg-surface px-5 text-sm font-medium hover:border-foreground/30"
                >
                  Download Resume ↓
                </a>
              </div>
            </Reveal>

            <Section title="Overview" index="01">
              <p>{project.overview}</p>
            </Section>

            {project.repos.length > 0 && (
              <Section title="Repositories" index="01a">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {project.repos.map((r) => (
                    <li key={r.url}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex h-full flex-col rounded-lg border border-hairline bg-surface p-4 transition-colors hover:border-foreground/30"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="truncate font-mono text-sm font-semibold group-hover:underline">
                            {r.label}
                          </span>
                          <span aria-hidden className="shrink-0 text-muted-foreground">↗</span>
                        </div>
                        <span className="mt-1 text-xs text-muted-foreground">{r.note}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section title="Problem" index="02">
              <p>{project.problem}</p>
            </Section>

            <Section title="Architecture" index="03">
              <InteractiveDiagram nodes={project.arch.nodes} edges={project.arch.edges} />
            </Section>

            <Section title="CI/CD Flow" index="04">
              <ol className="space-y-3">
                {project.cicd.map((step, i) => (
                  <li key={i} className="flex gap-4 rounded-lg border border-hairline bg-surface p-4">
                    <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </Section>

            <Section title="Infrastructure" index="05">
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.infra.map((item) => (
                  <li key={item} className="rounded-lg border border-hairline bg-surface p-4 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Technologies Used" index="06">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-full border border-hairline bg-surface px-3 py-1.5 font-mono text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="Challenges" index="07">
              <div className="space-y-4">
                {project.challenges.map((c, i) => (
                  <div key={i} className="rounded-lg border border-hairline bg-surface p-5">
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Challenge</div>
                    <div className="mt-1 text-base font-medium">{c.q}</div>
                    <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Resolution</div>
                    <div className="mt-1 text-sm text-muted-foreground">{c.a}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Lessons Learned" index="08">
              <ul className="space-y-3">
                {project.lessons.map((l) => (
                  <li key={l} className="flex gap-3 text-base">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-foreground" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Reveal>
              <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-hairline bg-surface p-6">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    Source code
                  </div>
                  <div className="mt-1 text-base font-medium">Full repository on GitHub</div>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background"
                >
                  Open repo ↗
                </a>
              </div>
            </Reveal>
          </article>
        </main>
        <Footer />
      </div>
    </ModeProvider>
  );
}

function Section({ title, index, children }: { title: string; index: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="mt-16">
        <div className="mb-5 flex items-baseline gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{index}</span>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{title}</h2>
        </div>
        <div className="text-base leading-relaxed text-foreground">{children}</div>
      </section>
    </Reveal>
  );
}

function ProjectNotFound() {
  return (
    <ModeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">404</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.02em]">Project not found</h1>
          <p className="mt-3 text-muted-foreground">That case study doesn&rsquo;t exist. Head back to the project index.</p>
          <Link
            to="/"
            hash="work"
            className="mt-8 inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background"
          >
            ← Back to projects
          </Link>
        </div>
        <Footer />
      </div>
    </ModeProvider>
  );
}
