import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { PIPELINE_STEPS } from "@/lib/portfolio-data";

export function Pipeline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % PIPELINE_STEPS.length), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="pipeline" className="relative border-b border-hairline bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-14 grid gap-6 border-b border-hairline pb-8 md:grid-cols-[10rem_1fr] md:items-end">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">— 06 / flow</div>
            <div>
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Every commit walks the same path.
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
                One reproducible flow from <code className="font-mono text-[0.9em]">git push</code> to a monitored pod. No manual steps. No snowflake environments.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-hairline bg-background p-6 sm:p-10">
            {/* Animated flow */}
            <div className="relative">
              <div className="flex flex-wrap items-stretch gap-3 sm:flex-nowrap">
                {PIPELINE_STEPS.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <div key={s.id} className="flex flex-1 items-center gap-3">
                      <div
                        className={`flex min-w-0 flex-1 flex-col rounded-xl border p-3 transition-all duration-500 ${
                          isActive
                            ? "border-foreground/40 bg-foreground text-background shadow-sm"
                            : "border-hairline bg-surface"
                        }`}
                      >
                        <div className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-70">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="mt-1 truncate text-sm font-semibold">{s.label}</div>
                      </div>
                      {i < PIPELINE_STEPS.length - 1 && (
                        <svg width="22" height="10" viewBox="0 0 22 10" className="shrink-0 text-muted-foreground">
                          <line
                            x1="0" y1="5" x2="22" y2="5"
                            stroke="currentColor" strokeWidth="1.5"
                            className={i === active ? "flow-line" : ""}
                          />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-lg border border-hairline bg-surface p-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Step {String(active + 1).padStart(2, "0")} · {PIPELINE_STEPS[active].label}
                </div>
                <p className="mt-1 text-sm text-foreground">{PIPELINE_STEPS[active].detail}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
