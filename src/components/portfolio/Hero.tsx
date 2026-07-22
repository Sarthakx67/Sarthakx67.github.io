import { Reveal } from "./Reveal";
import { CloudBackdrop } from "./CloudBackdrop";

const spec = [
  { k: "role", v: "Cloud & DevOps Engineer" },
  { k: "certified", v: "CKA · Linux Foundation" },
  { k: "stack", v: "AWS · Kubernetes · Terraform" },
  { k: "pipeline", v: "Jenkins · Argo CD · Prometheus" },
  { k: "projects", v: "Retail store on EKS · RoboShop IaC" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-hairline">
      <CloudBackdrop />

      <div className="relative mx-auto max-w-7xl px-6 pt-36 pb-24 sm:pt-44 sm:pb-32">
        {/* Meta line */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              System · online
            </span>
            <span aria-hidden className="h-px w-8 bg-hairline" />
            <span>2026 — current</span>
          </div>
        </Reveal>

        {/* Two-column headline */}
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div>
            <Reveal delay={80}>
              <h1 className="text-balance text-[3rem] font-semibold leading-[0.98] tracking-[-0.035em] text-foreground sm:text-[5.5rem] lg:text-[6.5rem]">
                Sarthak
                <br />
                <span className="text-muted-foreground/80">Singh.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-foreground/85 sm:text-xl">
                I build production-style infrastructure — the part that autoscales,
                self-heals, and keeps the pager silent. AWS, Kubernetes, and
                Terraform, wired with real operational discipline.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform hover:-translate-y-px"
                >
                  See the work
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline bg-surface px-5 text-sm font-medium text-foreground transition-colors hover:border-foreground/30"
                >
                  Résumé
                  <span aria-hidden>↓</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex h-11 items-center px-2 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  Say hello →
                </a>
              </div>
            </Reveal>
          </div>

          {/* Spec card */}
          <Reveal delay={200} className="lg:pt-4">
            <div className="rounded-2xl border border-hairline bg-surface/80 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-hairline pb-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  ~/whoami.yaml
                </span>
                <div className="flex gap-1.5" aria-hidden>
                  <span className="size-2 rounded-full bg-foreground/15" />
                  <span className="size-2 rounded-full bg-foreground/15" />
                  <span className="size-2 rounded-full bg-foreground/15" />
                </div>
              </div>
              <dl className="mt-4 space-y-2.5 font-mono text-[13px]">
                {spec.map((row) => (
                  <div key={row.k} className="flex items-baseline gap-3">
                    <dt className="w-20 shrink-0 text-muted-foreground">{row.k}:</dt>
                    <dd className="min-w-0 flex-1 text-foreground">{row.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 border-t border-hairline pt-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  motto
                </div>
                <p className="mt-2 text-sm italic leading-relaxed text-foreground">
                  “Build production-grade systems. Sleep through the on-call.”
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Marquee-style scroll hint */}
      <div className="relative border-t border-hairline bg-surface/40">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-hidden px-6 py-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          {[
            "AWS",
            "EKS",
            "Terraform",
            "Helm",
            "Jenkins",
            "Argo CD",
            "Prometheus",
            "Grafana",
            "IRSA",
            "GitOps",
          ].map((t, i) => (
            <span key={t} className="flex items-center gap-6">
              {i > 0 && <span aria-hidden className="size-1 rounded-full bg-muted-foreground/40" />}
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
