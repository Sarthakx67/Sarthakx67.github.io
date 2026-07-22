import { Reveal } from "./Reveal";
import { PHILOSOPHY } from "@/lib/portfolio-data";

// A $whoami-style spec block, translated to a polished terminal card.
const rows: { key: string; value: string }[] = [
  { key: "name", value: "Sarthak Singh" },
  { key: "role", value: "Cloud & DevOps Engineer · CKA" },
  { key: "degree", value: "B.Tech Computer Engineering" },
  { key: "location", value: "Mathura, India" },
  { key: "journey", value: "VM infra → Kubernetes → Production CI/CD" },
  { key: "goal", value: "Cloud / DevOps architect — systems-focused" },
  { key: "status", value: "Open to DevOps / Cloud Engineering internships" },
];

export function Philosophy() {
  return (
    <section aria-label="whoami" className="relative border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                $ whoami
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                The short version.
              </h2>
              <blockquote className="mt-6 border-l-2 border-foreground/40 pl-4 text-base leading-relaxed text-foreground">
                &ldquo;{PHILOSOPHY}&rdquo;
              </blockquote>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                — Personal engineering principle
              </p>
            </div>

            <div className="md:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-hairline bg-surface font-mono text-sm">
                <div className="flex items-center gap-1.5 border-b border-hairline bg-background/60 px-4 py-2">
                  <span className="size-2.5 rounded-full bg-foreground/20" />
                  <span className="size-2.5 rounded-full bg-foreground/20" />
                  <span className="size-2.5 rounded-full bg-foreground/20" />
                  <span className="ml-2 text-[11px] text-muted-foreground">~/sarthak — zsh</span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="text-muted-foreground">
                    <span className="text-foreground">$</span> cat identity.yaml
                  </div>
                  <dl className="mt-3 grid grid-cols-[minmax(6.5rem,auto)_1fr] gap-x-4 gap-y-2">
                    {rows.map((r) => (
                      <div key={r.key} className="contents">
                        <dt className="text-muted-foreground">{r.key}:</dt>
                        <dd className="text-foreground">{r.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
