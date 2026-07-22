import { Reveal } from "./Reveal";
import { EMAIL, GITHUB_USERNAME, LINKEDIN_URL } from "@/lib/portfolio-data";

export function Contact() {
  const items = [
    { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { label: "LinkedIn", value: "sarthak-singh-a0aa62322", href: LINKEDIN_URL },
    { label: "GitHub", value: `@${GITHUB_USERNAME}`, href: `https://github.com/${GITHUB_USERNAME}` },
    { label: "Resume", value: "Download PDF", href: "/resume.pdf" },
  ];
  return (
    <section id="contact" className="relative border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">— 03 / contact</div>
          <h2 className="mt-4 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.035em] sm:text-7xl">
            Let&rsquo;s build something you can sleep through.
          </h2>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            CKA-certified · B.Tech CSE student · open to DevOps and Cloud Engineering internships. Email lands fastest.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {items.map((c, i) => (
            <Reveal key={c.label} delay={i * 50}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-foreground/30"
              >
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{c.label}</div>
                  <div className="mt-1 break-all text-base font-medium">{c.value}</div>
                </div>
                <span aria-hidden className="text-muted-foreground transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
