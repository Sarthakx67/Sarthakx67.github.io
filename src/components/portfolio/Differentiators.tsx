import { Reveal } from "./Reveal";
import { DIFFERENTIATORS } from "@/lib/portfolio-data";

export function Differentiators() {
  return (
    <section id="receipts" className="relative border-b border-hairline bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-14 grid gap-6 border-b border-hairline pb-8 md:grid-cols-[10rem_1fr] md:items-end">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">— 04 / receipts</div>
            <div>
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Most students who <span className="italic text-muted-foreground">“know Kubernetes”</span> ran{" "}
                <code className="font-mono text-[0.85em]">kubectl apply</code> on a tutorial.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Here&rsquo;s what I did differently — with the receipts to back it up.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {DIFFERENTIATORS.map((d, i) => (
            <Reveal key={d.title} delay={i * 60}>
              <article className="h-full rounded-2xl border border-hairline bg-background p-6 sm:p-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em]">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
