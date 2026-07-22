import { useState } from "react";
import { CERTIFICATIONS } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";

export function Certifications() {
  const [openId, setOpenId] = useState<string | null>("cka");

  return (
    <section id="proof" className="relative border-b border-hairline bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-14 grid gap-6 border-b border-hairline pb-8 md:grid-cols-[10rem_1fr] md:items-end">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">— 01 / proof</div>
            <div>
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Credentials — and what they actually prove.
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Tap a card to expand into the skills the exam actually tested.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-12">
          {CERTIFICATIONS.map((c, i) => {
            const isOpen = openId === c.id;
            const isFeatured = c.featured;
            return (
              <Reveal key={c.id} delay={i * 60} className={isFeatured ? "md:col-span-8" : "md:col-span-4"}>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : c.id)}
                  aria-expanded={isOpen}
                  className={`group relative flex h-full w-full flex-col rounded-2xl border p-6 text-left transition-all sm:p-8 ${
                    isFeatured
                      ? "border-foreground/25 bg-background shadow-[0_1px_0_0_var(--hairline)]"
                      : "border-hairline bg-background"
                  } hover:border-foreground/40`}
                >
                  {isFeatured && (
                    <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-success" /> Flagship credential
                    </span>
                  )}
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {c.issuer} · 2026
                  </div>
                  <h3 className={`mt-3 font-semibold tracking-[-0.02em] ${isFeatured ? "text-2xl sm:text-3xl" : "text-lg"}`}>
                    {c.name}
                  </h3>

                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ${
                      isOpen ? "mt-6 grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        Demonstrates
                      </div>
                      <ul className="mt-3 space-y-2">
                        {c.demonstrates.map((d) => (
                          <li key={d} className="flex gap-3 text-sm text-foreground">
                            <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-foreground/60" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                      {c.link && (
                        <a
                          href={c.link}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
                        >
                          Verify credential ↗
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    {isOpen ? "Hide details" : "Show what this proves"}
                    <span aria-hidden>{isOpen ? "↑" : "↓"}</span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
