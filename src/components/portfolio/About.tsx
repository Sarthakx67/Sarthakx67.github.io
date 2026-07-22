import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="border-b border-hairline">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 sm:py-28 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Reveal>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">— 08 / about</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              A CS student who treats infra like a product.
            </h2>
            <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                I&rsquo;m happiest when a deploy is boring — pipelines that just pass, dashboards that stay green, rollbacks
                that finish in seconds. I earned my CKA to prove I can operate real clusters, not just spin them up.
              </p>
              <p>
                I built RoboShop on EC2 first — 15 Terraform modules, 13 security groups, Ansible-pull — before touching
                Kubernetes. Then I rebuilt it properly on EKS with Helm umbrella charts, IRSA, StatefulSets, and one
                Jenkins shared library that ships every service in every language.
              </p>
              <p>
                Currently studying B.Tech Computer Engineering and looking for internships or entry-level roles in Cloud,
                DevOps, Platform Engineering, and SRE.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-hairline bg-surface p-6">
              <div className="flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-foreground font-mono text-[11px] font-semibold text-background">
                  CKA
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">Certified Kubernetes Administrator</p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    The Linux Foundation · CNCF · 2025
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-hairline bg-surface p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">In progress</p>
              <p className="mt-3 text-sm font-medium">AWS Solutions Architect — Associate</p>
              <p className="mt-1 text-sm text-muted-foreground">Well-Architected Framework, multi-AZ, IAM boundaries.</p>
            </div>

            <div className="rounded-2xl border border-hairline bg-surface p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Education</p>
              <p className="mt-3 text-sm font-medium">B.Tech, Computer Engineering</p>
              <p className="mt-1 text-sm text-muted-foreground">India</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
