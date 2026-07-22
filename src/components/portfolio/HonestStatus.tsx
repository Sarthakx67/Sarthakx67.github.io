import { Reveal } from "./Reveal";
import { HONEST_STATUS } from "@/lib/portfolio-data";

const dotByTone: Record<string, string> = {
  ready: "bg-success",
  learning: "bg-foreground/50",
  next: "bg-hairline",
};

const iconByTone: Record<string, string> = {
  ready: "✓",
  learning: "◐",
  next: "○",
};

export function HonestStatus() {
  return (
    <section id="status" className="relative border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-14 grid gap-6 border-b border-hairline pb-8 md:grid-cols-[10rem_1fr] md:items-end">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">— 07 / status</div>
            <div>
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                What ships. What I&rsquo;m learning. What&rsquo;s next.
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
                No fluff. If it&rsquo;s on the left column, I can defend it in a live design review.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {HONEST_STATUS.map((col, i) => (
            <Reveal key={col.heading} delay={i * 80}>
              <div className="h-full rounded-2xl border border-hairline bg-surface p-6 sm:p-7">
                <div className="flex items-center gap-2">
                  <span aria-hidden className={`size-2 rounded-full ${dotByTone[col.tone]}`} />
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {col.heading}
                  </div>
                </div>
                <ul className="mt-5 space-y-3">
                  {col.items.map((it) => (
                    <li key={it} className="flex gap-3 text-sm leading-relaxed">
                      <span
                        aria-hidden
                        className="mt-0.5 w-4 shrink-0 font-mono text-xs text-muted-foreground"
                      >
                        {iconByTone[col.tone]}
                      </span>
                      <span className="text-foreground">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
