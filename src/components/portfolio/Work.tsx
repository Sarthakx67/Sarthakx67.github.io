import { Reveal } from "./Reveal";

type Project = {
  index: string;
  title: string;
  kicker: string;
  summary: string;
  bullets: string[];
  tech: string[];
  href: string;
};

const projects: Project[] = [
  {
    index: "01",
    title: "AWS Retail Store",
    kicker: "Production-style EKS platform",
    summary:
      "5-microservice e-commerce platform on AWS EKS across 3 AZs, with GitOps, IRSA, and a full observability stack.",
    bullets: [
      "Helm umbrella charts split across dev and prod value files",
      "Jenkins shared library auto-detects Maven / Go / Node builds — 12 → 2 min",
      "GitOps via Argo CD; IRSA + OIDC replaces static AWS credentials",
      "kube-prometheus-stack dashboards for RPS, 5xx, P95/P99, throttling",
    ],
    tech: ["EKS", "Terraform", "Helm", "Jenkins", "Argo CD", "Prometheus", "Grafana", "IRSA"],
    href: "https://github.com/Sarthakx67/retail-store-aws-deployment",
  },
  {
    index: "02",
    title: "RoboShop",
    kicker: "Multi-environment AWS infra & CI/CD",
    summary:
      "Isolated dev and prod AWS environments provisioned with 15+ Terraform modules, blue-green Jenkins pipeline, Ansible for config.",
    bullets: [
      "S3 remote state + DynamoDB locking so changes never collide",
      "3-tier VPC — public ALB, private ASGs (2–5), isolated DB subnets",
      "Blue-green deploy with manual prod gate and instant rollback",
      "8 microservices configured by idempotent Ansible roles",
    ],
    tech: ["Terraform", "AWS VPC", "ALB", "ASG", "Route 53", "Jenkins", "Ansible"],
    href: "https://github.com/Sarthakx67/RoboShop-Infra-Standard",
  },
  {
    index: "03",
    title: "Kubernetes Labs",
    kicker: "CKA-grade troubleshooting scenarios",
    summary:
      "Hands-on cluster troubleshooting covering RBAC, networking, storage, scheduling, security, and etcd backup / restore.",
    bullets: [
      "RBAC and service-account failure modes",
      "CNI, DNS, and NetworkPolicy debugging",
      "Scheduling: taints, tolerations, affinity, resource pressure",
      "etcd snapshot, restore, and cluster recovery drills",
    ],
    tech: ["Kubernetes", "RBAC", "etcd", "Networking", "Storage", "Security"],
    href: "https://github.com/Sarthakx67",
  },
];

export function Work() {
  return (
    <section id="work" className="border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                § Selected work
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Things I&rsquo;ve shipped.
              </h2>
            </div>
            <a
              href="https://github.com/Sarthakx67"
              target="_blank"
              rel="noreferrer"
              className="hidden font-mono text-xs text-muted-foreground underline decoration-hairline underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground sm:inline"
            >
              github.com/Sarthakx67 ↗
            </a>
          </div>
        </Reveal>

        <ul className="flex flex-col gap-4">
          {projects.map((p, i) => (
            <Reveal key={p.title} as="article" delay={i * 80}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group relative block overflow-hidden rounded-2xl border border-hairline bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_20px_60px_-30px_rgb(0_0_0/0.15)] sm:p-10"
              >
                <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      <span>{p.index} / 03</span>
                      <span className="size-1 rounded-full bg-hairline" />
                      <span>{p.kicker}</span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {p.summary}
                    </p>

                    <ul className="mt-6 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-foreground/40" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-hairline bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1 self-start font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                    View repo
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↗</span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
