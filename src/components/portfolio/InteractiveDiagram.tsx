import { useState } from "react";
import type { ArchNode, ArchEdge } from "@/lib/portfolio-data";

const GROUP_COLORS: Record<ArchNode["group"], string> = {
  edge: "bg-amber-500/15 border-amber-500/40 text-amber-900",
  compute: "bg-primary/10 border-primary/40 text-primary",
  data: "bg-emerald-500/15 border-emerald-500/40 text-emerald-900",
  pipeline: "bg-foreground/10 border-foreground/40 text-foreground",
  observability: "bg-fuchsia-500/15 border-fuchsia-500/40 text-fuchsia-900",
};

export function InteractiveDiagram({
  nodes,
  edges,
}: {
  nodes: ArchNode[];
  edges: ArchEdge[];
}) {
  const [activeId, setActiveId] = useState<string>(nodes[0]?.id ?? "");
  const active = nodes.find((n) => n.id === activeId) ?? nodes[0];

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-4 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          Interactive architecture — click a component
        </div>
        <div className="hidden gap-3 sm:flex">
          {(["edge", "compute", "data", "pipeline", "observability"] as const).map((g) => (
            <span key={g} className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              <span className={`size-2 rounded-sm border ${GROUP_COLORS[g]}`} />
              {g}
            </span>
          ))}
        </div>
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-hairline bg-background">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 56" preserveAspectRatio="none">
          {edges.map((e, i) => {
            const from = nodes.find((n) => n.id === e.from);
            const to = nodes.find((n) => n.id === e.to);
            if (!from || !to) return null;
            const isActive = activeId === from.id || activeId === to.id;
            return (
              <line
                key={i}
                x1={from.x} y1={(from.y * 56) / 100}
                x2={to.x} y2={(to.y * 56) / 100}
                stroke="currentColor"
                strokeWidth={isActive ? 0.35 : 0.2}
                className={isActive ? "text-foreground flow-line" : "text-muted-foreground/50"}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        {nodes.map((n) => {
          const isActive = n.id === activeId;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => setActiveId(n.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border px-2.5 py-1.5 font-mono text-[10px] font-medium whitespace-nowrap transition-all sm:text-xs ${
                GROUP_COLORS[n.group]
              } ${isActive ? "scale-110 ring-2 ring-foreground/30 shadow-sm" : "hover:scale-105"}`}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              aria-pressed={isActive}
            >
              {n.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-lg border border-hairline bg-background p-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {active.group} · {active.label}
        </div>
        <p className="mt-1 text-sm text-foreground">{active.role}</p>
      </div>
    </div>
  );
}
