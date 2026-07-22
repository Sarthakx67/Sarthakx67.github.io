import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { href: "/#proof", label: "Proof" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
  { href: "/#receipts", label: "Receipts" },
  { href: "/#arc", label: "Arc" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "border-b border-hairline bg-background/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-md border border-hairline bg-surface font-mono text-[13px] font-semibold">
            s.
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold tracking-tight">Sarthak Singh</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Cloud · DevOps · CKA
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            download
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-foreground px-3 text-xs font-medium text-background transition-transform hover:-translate-y-px"
          >
            Resume <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </header>
  );
}
