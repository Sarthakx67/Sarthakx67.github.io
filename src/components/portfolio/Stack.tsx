import { Reveal } from "./Reveal";

const stack = [
  { label: "Cloud", values: "AWS · EKS · EC2 · VPC · IAM · S3 · Route 53 · ALB · ASG · EBS · DynamoDB" },
  { label: "Orchestration", values: "Kubernetes · Docker · Docker Compose · Helm (umbrella charts, multi-env)" },
  { label: "Infrastructure", values: "Terraform (modules, remote state, DynamoDB locking) · Ansible (roles, playbooks)" },
  { label: "CI/CD & GitOps", values: "Jenkins (pipelines, shared libraries, Groovy) · Argo CD · Git" },
  { label: "Observability", values: "Prometheus · Grafana · kube-prometheus-stack · Alertmanager · IRSA" },
  { label: "Languages", values: "Python · Java · Bash · Groovy · Linux (systemd, networking, permissions)" },
];

export function Stack() {
  return (
    <section id="stack" className="border-b border-hairline bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <div className="mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              § Stack
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              The toolkit I reach for.
            </h2>
          </div>
        </Reveal>

        <dl className="divide-y divide-hairline border-y border-hairline">
          {stack.map((row, i) => (
            <Reveal key={row.label} delay={i * 40}>
              <div className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8 sm:py-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {row.label}
                </dt>
                <dd className="text-sm leading-relaxed text-foreground sm:text-base">
                  {row.values}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
