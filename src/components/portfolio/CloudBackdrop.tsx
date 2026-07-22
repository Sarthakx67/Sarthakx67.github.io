// Animated cloud-infrastructure inspired backdrop. SVG, GPU-friendly, respects reduced-motion via CSS.
export function CloudBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="dot-grid absolute inset-0 opacity-60" />

      {/* Soft glow blobs */}
      <div
        className="float-slow absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 28%, transparent), transparent 70%)" }}
      />
      <div
        className="float-slow absolute -right-16 top-40 h-80 w-80 rounded-full blur-3xl"
        style={{ animationDelay: "1.5s", background: "radial-gradient(circle, color-mix(in oklab, var(--success) 22%, transparent), transparent 70%)" }}
      />

      {/* Drifting infra lattice */}
      <svg
        className="drift-slow absolute inset-0 h-full w-full opacity-[0.55]"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="line" x1="0" x2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="text-foreground/40" stroke="url(#line)" strokeWidth="1" fill="none">
          <path d="M0,120 C300,80 600,180 900,120 S1200,140 1200,140" />
          <path d="M0,260 C300,220 600,320 900,260 S1200,280 1200,280" />
          <path d="M0,400 C300,360 600,460 900,400 S1200,420 1200,420" />
        </g>
        {/* Nodes */}
        <g className="text-foreground/45" fill="currentColor">
          {[
            [120, 120], [340, 260], [560, 120], [780, 260], [1000, 120],
            [220, 400], [500, 400], [820, 400], [1080, 400],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={3} className="pulse-node" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </g>
      </svg>
    </div>
  );
}
