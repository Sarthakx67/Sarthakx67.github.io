import { JOURNEY } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";

export function Journey() {
  return (
    <section id="arc" className="relative border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-14 grid gap-6 border-b border-hairline pb-8 md:grid-cols-[10rem_1fr] md:items-end">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">— 05 / arc</div>
            <div>
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Layered one abstraction at a time.
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
                From bare Linux to production-style Kubernetes — a path built on purpose, not shortcuts.
              </p>
            </div>
          </div>
        </Reveal>

        <ol className="relative">
          <div aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-hairline sm:left-24" />
          {JOURNEY.map((step, i) => (
            <Reveal key={step.year} delay={i * 40}>
              <li className="relative grid grid-cols-[1fr] gap-4 pb-10 sm:grid-cols-[7rem_1fr] sm:gap-8">
                <div className="hidden font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground sm:block sm:pt-1">
                  {step.year}
                </div>
                <div className="relative pl-6 sm:pl-8">
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 size-3.5 rounded-full border-2 border-background bg-foreground sm:-left-[9px]"
                  />
                  <div className="sm:hidden font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {step.year}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
