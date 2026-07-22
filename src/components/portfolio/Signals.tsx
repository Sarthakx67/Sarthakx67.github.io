import { Reveal } from "./Reveal";

const signals = [
  { value: "12 → 1.5", unit: "min", label: "Deploy time after startup-probe tuning" },
  { value: "15", unit: "modules", label: "Terraform modules across RoboShop" },
  { value: "10", unit: "subcharts", label: "Helm umbrella on EKS retail stack" },
  { value: "0", unit: "static keys", label: "IRSA-only pod → AWS access" },
];

export function Signals() {
  return (
    <section aria-label="Key results" className="border-b border-hairline bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-hairline sm:grid-cols-4 sm:divide-y-0">
        {signals.map((s, i) => (
          <Reveal key={s.label} delay={i * 60} className="p-6 sm:p-8">
            <div className="flex items-baseline gap-1.5 font-mono text-2xl font-medium tracking-tight sm:text-3xl">
              <span>{s.value}</span>
              <span className="text-sm text-muted-foreground sm:text-base">{s.unit}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
