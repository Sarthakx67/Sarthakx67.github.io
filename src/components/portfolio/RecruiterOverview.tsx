import { Reveal } from "./Reveal";
import { CERTIFICATIONS, PROJECTS, SKILLS } from "@/lib/portfolio-data";

export function RecruiterOverview() {
  const cka = CERTIFICATIONS.find((c) => c.id === "cka")!;
  const flagship = PROJECTS.find((p) => p.priority)!;
  return (
    <section id="overview" className="relative border-b border-hairline bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/25 bg-background px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em]">
            <span className="size-1.5 rounded-full bg-success" /> Recruiter mode · One-page overview
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Sarthak Singh — at a glance.</h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="rounded-2xl border border-hairline bg-background p-6 sm:p-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Headline</div>
              <p className="mt-3 text-lg leading-relaxed">
                Cloud &amp; DevOps engineer with <span className="font-semibold">CKA certification</span> and hands-on
                experience shipping production-style workloads on AWS EKS with Terraform, Jenkins, Argo CD, and full
                Prometheus/Grafana observability.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <Stat label="Certification" value="CKA" />
                <Stat label="Flagship project" value="EKS Retail" />
                <Stat label="Status" value="Open to roles" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="md:col-span-5">
            <div className="rounded-2xl border border-hairline bg-background p-6 sm:p-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Top credential</div>
              <div className="mt-2 text-lg font-semibold">{cka.name}</div>
              <div className="mt-1 text-sm text-muted-foreground">{cka.issuer} · {cka.year}</div>
              <ul className="mt-4 space-y-2 text-sm">
                {cka.demonstrates.slice(0, 3).map((d) => (
                  <li key={d} className="flex gap-2">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-foreground/60" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120} className="md:col-span-12">
            <div className="rounded-2xl border border-hairline bg-background p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    Flagship project
                  </div>
                  <div className="mt-1 text-lg font-semibold">{flagship.title}</div>
                </div>
                <a
                  href={`/projects/${flagship.slug}`}
                  className="inline-flex h-9 items-center rounded-full border border-hairline px-3 text-xs font-medium hover:border-foreground/30"
                >
                  Read case study →
                </a>
              </div>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{flagship.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {flagship.tech.slice(0, 8).map((t) => (
                  <span key={t} className="rounded-full border border-hairline bg-surface px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={160} className="md:col-span-12">
            <div className="rounded-2xl border border-hairline bg-background p-6 sm:p-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Toolkit</div>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {SKILLS.map((g) => (
                  <div key={g.group}>
                    <div className="text-xs font-semibold">{g.group}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{g.items.join(" · ")}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-hairline bg-surface p-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-base font-semibold">{value}</div>
    </div>
  );
}
