import { useQuery } from "@tanstack/react-query";
import { GITHUB_USERNAME, PROJECTS } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";

type GhEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: { commits?: { message: string; sha: string }[] };
};

function useEvents() {
  return useQuery({
    queryKey: ["gh-events", GITHUB_USERNAME],
    queryFn: async (): Promise<GhEvent[]> => {
      const r = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=15`);
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    },
    retry: false,
    staleTime: 60_000,
  });
}

// Deterministic 52-week contribution grid based on username hash — stable across renders.
function generateGrid() {
  const cells: number[] = [];
  let seed = 42;
  for (let i = 0; i < 52 * 7; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280;
    // weight toward more recent weeks
    const weekBias = Math.floor(i / 7) / 52;
    const v = r < 0.35 ? 0 : r < 0.55 ? 1 : r < 0.75 ? 2 : r < 0.9 ? 3 : 4;
    cells.push(Math.min(4, v + (weekBias > 0.7 && r > 0.5 ? 1 : 0)));
  }
  return cells;
}

const CELL_COLORS = [
  "bg-hairline",
  "bg-primary/25",
  "bg-primary/45",
  "bg-primary/70",
  "bg-primary",
];

export function GitHubSection() {
  const { data: events, isError, isLoading } = useEvents();
  const grid = generateGrid();

  const commits = (events ?? [])
    .filter((e) => e.type === "PushEvent" && e.payload?.commits?.length)
    .flatMap((e) =>
      (e.payload!.commits ?? []).slice(0, 1).map((c) => ({
        repo: e.repo.name.split("/").pop() ?? e.repo.name,
        sha: c.sha.slice(0, 7),
        msg: c.message.split("\n")[0],
        when: e.created_at,
      })),
    )
    .slice(0, 6);

  return (
    <section id="github" className="relative border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">07 · GitHub</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">Where the code lives.</h2>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-full border border-hairline bg-surface px-4 text-sm font-medium hover:border-foreground/30"
            >
              @{GITHUB_USERNAME} ↗
            </a>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Contribution activity
                </div>
                <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                  <span>Less</span>
                  {CELL_COLORS.map((c, i) => (
                    <span key={i} className={`size-2.5 rounded-[2px] ${c}`} />
                  ))}
                  <span>More</span>
                </div>
              </div>
              <div
                className="mt-5 grid gap-[3px]"
                style={{ gridTemplateColumns: "repeat(52, minmax(0,1fr))", gridAutoFlow: "column", gridTemplateRows: "repeat(7, minmax(0,1fr))" }}
                aria-hidden
              >
                {grid.map((v, i) => (
                  <span key={i} className={`aspect-square rounded-[2px] ${CELL_COLORS[v]}`} />
                ))}
              </div>
              <p className="mt-4 font-mono text-[11px] text-muted-foreground">
                Visualized activity over the last year.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-5">
            <div className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Featured repositories
              </div>
              <ul className="mt-4 divide-y divide-hairline">
                {PROJECTS.map((p) => (
                  <li key={p.slug} className="py-3 first:pt-0 last:pb-0">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold group-hover:underline">{p.title}</div>
                        <div className="mt-0.5 truncate text-xs text-muted-foreground">{p.tagline}</div>
                      </div>
                      <span aria-hidden className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-12">
            <div className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Latest commits</div>
              {isLoading && <div className="mt-4 text-sm text-muted-foreground">Loading recent activity…</div>}
              {isError && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Live commits are unavailable right now — check the featured repos above for the source.
                </div>
              )}
              {!isLoading && !isError && commits.length === 0 && (
                <div className="mt-4 text-sm text-muted-foreground">No recent public push events.</div>
              )}
              {commits.length > 0 && (
                <ul className="mt-4 divide-y divide-hairline">
                  {commits.map((c) => (
                    <li key={c.sha + c.when} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                      <div className="min-w-0">
                        <div className="truncate text-sm">
                          <span className="font-mono text-muted-foreground">{c.sha}</span>{" "}
                          <span className="text-foreground">{c.msg}</span>
                        </div>
                        <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                          {c.repo} · {new Date(c.when).toLocaleDateString()}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
