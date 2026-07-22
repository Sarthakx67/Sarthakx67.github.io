import { SKILLS } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="stack" className="relative border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-14 grid gap-6 border-b border-hairline pb-8 md:grid-cols-[10rem_1fr] md:items-end">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">— 04 / stack</div>
            <div>
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                What I actually reach for.
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Grouped, not ranked — percentage bars lie. This is the toolbox that ships production.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group, i) => (
            <Reveal key={group.group} delay={i * 40}>
              <div className="rounded-2xl border border-hairline bg-surface p-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{group.group}</div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-hairline bg-background px-2.5 py-1 text-xs text-foreground"
                    >
                      {item}
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
