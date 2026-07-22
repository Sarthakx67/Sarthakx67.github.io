export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              — end of file
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              Sarthak Singh
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Cloud &amp; DevOps Engineer · Built with intent, deployed with GitOps.
            </p>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-success" />
              All systems nominal
            </span>
            <span aria-hidden className="h-px w-6 bg-hairline" />
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
