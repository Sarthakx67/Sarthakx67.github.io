import { Link } from "@tanstack/react-router";
import { PROJECTS } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";

export function Projects() {
  const list = PROJECTS.filter((p) => p.featured);
  return (
    <section id="work" className="relative border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-14 grid gap-6 border-b border-hairline pb-8 md:grid-cols-[10rem_1fr] md:items-end">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">— 02 / work</div>
            <div>
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Production-style systems I built end-to-end.
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Each entry links to a full case study — architecture, CI/CD, infra, and what I learned when it broke.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-12">
          {list.map((p, i) => {
            const isPriority = p.priority;
            return (
              <Reveal key={p.slug} delay={i * 60} className="md:col-span-12">
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/30 sm:p-8 min-h-[280px]"
                >
                  {isPriority && (
                    <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-background px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-success" /> Flagship
                    </span>
                  )}
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{p.year}</div>
                    <h3 className={`mt-3 font-semibold tracking-[-0.02em] ${isPriority ? "text-2xl sm:text-3xl" : "text-xl"}`}>
                      {p.title}
                    </h3>
                    <p className={`mt-3 max-w-2xl text-muted-foreground ${isPriority ? "text-base" : "text-sm"}`}>
                      {p.tagline}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.tech.slice(0, isPriority ? 6 : 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-hairline bg-background px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    Read case study
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
