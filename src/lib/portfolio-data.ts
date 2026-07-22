// Central portfolio content — edit here, everything updates.

export const GITHUB_USERNAME = "Sarthakx67";
export const LINKEDIN_URL = "https://linkedin.com/in/sarthak-singh-a0aa62322";
export const EMAIL = "sarthaksingh6700@gmail.com";

export const PHILOSOPHY =
  "I don't want to know how to use the tools. I want to know what happens when they fail.";

export type ArchNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  role: string;
  group: "edge" | "compute" | "data" | "pipeline" | "observability";
};

export type ArchEdge = { from: string; to: string };

export type ProjectRepo = { label: string; url: string; note: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  featured?: boolean;
  priority?: boolean;
  github: string;
  repos: ProjectRepo[];
  overview: string;
  problem: string;
  cicd: string[];
  infra: string[];
  tech: string[];
  challenges: { q: string; a: string }[];
  lessons: string[];
  arch: { nodes: ArchNode[]; edges: ArchEdge[] };
};

const gh = (path: string) => `https://github.com/${GITHUB_USERNAME}/${path}`;

export const PROJECTS: Project[] = [
  {
    slug: "retail-store-eks",
    title: "AWS Retail Store — EKS Production Deployment",
    tagline:
      "The flagship. Multi-language microservices on EKS with Helm umbrella charts, IRSA, HPA, StatefulSets, and full Prometheus/Grafana observability — driven by a single Jenkins shared library.",
    year: "2026",
    featured: true,
    priority: true,
    github: gh("retail-store-aws-deployment"),
    repos: [
      {
        label: "retail-store-aws-deployment",
        url: gh("retail-store-aws-deployment"),
        note: "Main EKS deployment — Helm umbrella charts, IRSA, observability.",
      },
    ],
    overview:
      "Everything I learned building RoboShop on VMs, rebuilt properly on Kubernetes. A 5-service polyglot retail app (UI, Catalog, Cart, Orders, Checkout) plus MySQL, Postgres, RabbitMQ, Redis, and DynamoDB — all deployed to Amazon EKS with zero static credentials, dynamic storage, autoscaling, and dashboards that ship with the workload.",
    problem:
      "Most students who 'know Kubernetes' have run kubectl apply on a tutorial manifest. The goal here was the opposite: prove I can operate a real cluster — OIDC-backed identity, StatefulSet storage, health-probe-driven rollouts, and a CI/CD system that scales across every service in every language from one shared codebase.",
    cicd: [
      "Jenkins shared library exposes three reusable Groovy functions: detectVersion(), dockerBuildPush(), deployK8s().",
      "detectVersion() reads pom.xml for Java, main.go for Go, package.json for Node — one pipeline definition works across every service.",
      "dockerBuildPush() builds and pushes SHA-tagged images to DockerHub; deployK8s() runs helm upgrade with env-specific values.",
      "When the deployment process changes, it changes in one place — not five Jenkinsfiles.",
    ],
    infra: [
      "Umbrella Helm chart with 10 subcharts: cart, catalog, checkout, orders, ui, mysql, postgresql, rabbitmq, redis, dynamodb.",
      "Env values: dev uses local DynamoDB + static creds; prod uses AWS DynamoDB + IRSA. Zero secret sprawl.",
      "IRSA fully implemented: OIDC provider on EKS, trust policy scoped to a single ServiceAccount, IAM policy scoped to a specific DynamoDB table ARN. Verified via env | grep AWS inside the pod.",
      "StatefulSets with volumeClaimTemplates + EBS CSI (gp3, WaitForFirstConsumer) for MySQL and PostgreSQL — each replica gets its own volume.",
      "HPA on all 5 application services at 70% CPU. Startup + liveness + readiness probes on every workload.",
    ],
    tech: [
      "AWS EKS",
      "Helm (umbrella + subcharts)",
      "IRSA + OIDC",
      "EBS CSI / gp3",
      "StatefulSets + HPA",
      "Jenkins Shared Library",
      "Prometheus kube-prometheus-stack",
      "Grafana",
      "Docker",
      "Terraform",
    ],
    challenges: [
      {
        q: "Deploys took 12 minutes because pods restarted before dependencies were ready.",
        a: "Added startup probes tuned per service; Kubernetes stopped killing pods mid-DB-connect. Deploy time dropped to ~1.5 minutes. The lesson: startup probes, not liveness, were the missing piece.",
      },
      {
        q: "How do you actually prove IRSA is working end-to-end?",
        a: "Exec into the pod and check AWS_ROLE_ARN and AWS_WEB_IDENTITY_TOKEN_FILE in the environment. If they are set and the token exists, the OIDC chain resolved. That's the ground truth — not the trust policy JSON.",
      },
      {
        q: "One Jenkinsfile per service does not scale.",
        a: "Wrote a shared library with language-aware version detection. Every service's Jenkinsfile is now three lines: @Library, detectVersion(), deploy pipeline. Adding a new service is a Jenkinsfile stub, not a Jenkinsfile.",
      },
    ],
    lessons: [
      "IRSA is a habit, not a feature. Once the OIDC → trust policy → SA annotation chain is muscle memory, static AWS keys become unthinkable.",
      "Observability is a deploy-time concern. ServiceMonitors and dashboards ship inside the Helm chart, not as a follow-up ticket.",
      "Shared libraries pay off the moment you have a second service. Write the abstraction before you write the second Jenkinsfile.",
    ],
    arch: {
      nodes: [
        { id: "dev", label: "GitHub", x: 6, y: 50, group: "pipeline", role: "Source of truth — push to main triggers Jenkins via webhook." },
        { id: "jenkins", label: "Jenkins + Shared Lib", x: 22, y: 50, group: "pipeline", role: "detectVersion() → dockerBuildPush() → deployK8s(). One library, every service." },
        { id: "dh", label: "DockerHub", x: 38, y: 30, group: "pipeline", role: "SHA-tagged images built by the shared library." },
        { id: "helm", label: "Helm Umbrella", x: 38, y: 70, group: "pipeline", role: "10 subcharts + env-specific values.yaml drive every release." },
        { id: "alb", label: "ALB Ingress", x: 55, y: 20, group: "edge", role: "TLS termination + path routing to the UI service." },
        { id: "eks", label: "EKS + IRSA", x: 62, y: 50, group: "compute", role: "5 app services (cart, catalog, checkout, orders, ui) with HPA + startup/liveness/readiness probes." },
        { id: "ebs", label: "StatefulSets · EBS", x: 82, y: 30, group: "data", role: "MySQL + Postgres via volumeClaimTemplates on gp3 (WaitForFirstConsumer)." },
        { id: "ddb", label: "DynamoDB (IRSA)", x: 82, y: 60, group: "data", role: "Cart / Orders scoped to one table ARN via IAM + OIDC — no static keys." },
        { id: "prom", label: "Prometheus", x: 62, y: 85, group: "observability", role: "kube-prometheus-stack scrapes ServiceMonitors shipped in each subchart." },
        { id: "graf", label: "Grafana", x: 82, y: 85, group: "observability", role: "5xx rate, JVM memory, RED metrics, deploy health — dashboards live with the chart." },
      ],
      edges: [
        { from: "dev", to: "jenkins" },
        { from: "jenkins", to: "dh" },
        { from: "jenkins", to: "helm" },
        { from: "dh", to: "eks" },
        { from: "helm", to: "eks" },
        { from: "alb", to: "eks" },
        { from: "eks", to: "ebs" },
        { from: "eks", to: "ddb" },
        { from: "eks", to: "prom" },
        { from: "prom", to: "graf" },
      ],
    },
  },
  {
    slug: "roboshop-infra",
    title: "RoboShop — VM-Based Multi-Environment AWS Infrastructure",
    tagline:
      "The foundation. Before touching Kubernetes, I built the entire platform on EC2 — 15 Terraform modules, 13 security groups, Ansible-pull config, custom AMI baking, and dev/prod parity.",
    year: "2025",
    featured: true,
    github: gh("RoboShop-Infra-Standard"),
    repos: [
      { label: "RoboShop-Infra-Standard", url: gh("RoboShop-Infra-Standard"), note: "Main infrastructure — Terraform modules, Jenkins CI/CD." },
      { label: "Roboshop-Dev-Prod-Infra-CICD-Deployment", url: gh("Roboshop-Dev-Prod-infra-cicd-Deployment.git"), note: "Infra CI/CD promotion pipeline." },
      { label: "Terraform-AWS-VPC-Advanced", url: gh("Terraform-AWS-VPC-Advanced"), note: "Reusable VPC module — dual-mode, region-agnostic." },
      { label: "RoboShop-Security-Group-Module", url: gh("RoboShop-Security-Group-Module"), note: "Reusable security-group module." },
      { label: "RoboShop-Ansible-Roles-tf", url: gh("RoboShop-Ansible-Roles-tf"), note: "Ansible roles for configuration management." },
      { label: "RoboShop-Shell-Script-For-Alma-Linux", url: gh("RoboShop-Shell-Script-For-Alma-Linux"), note: "Bootstrap shell scripts for AlmaLinux." },
    ],
    overview:
      "An 11-service e-commerce stack provisioned end-to-end on AWS with modular Terraform, configured via Ansible-pull, deployed to Auto Scaling Groups behind internal + external ALBs, and promoted dev → prod through a Jenkins pipeline. This is where I learned why infrastructure has to be code, not clicks.",
    problem:
      "Rebuilding infrastructure by hand takes hours and drifts between engineers. Codifying it makes a full stand-up a 15-minute apply with an audit trail — and forces you to understand every SG rule, every route, every IAM boundary.",
    cicd: [
      "Terraform reviewed via PR with tflint + tfsec in CI; plan posted to the PR as a comment.",
      "Merge to main triggers Jenkins to apply against dev; promotion job applies to staging/prod.",
      "AMI baking pipeline: EC2 → Ansible configure → stop → bake AMI → delete → Launch Template → ASG.",
      "Catalogue service CI: version detection from package.json → npm build → SonarQube + SAST → Nexus publish → downstream CD.",
    ],
    infra: [
      "15 Terraform modules with S3 remote state + DynamoDB locking; cross-module data via SSM Parameter Store — zero hardcoded values.",
      "Custom VPC across 2 AZs: public, private, and database subnets — all module-managed.",
      "13 least-privilege security groups. Service-to-service on exact ports; SSH restricted to a VPN CIDR.",
      "ASGs with 50% CPU target tracking; internal ALB with host-header routing per service; external ALB + Route 53 on stallions.space.",
      "Ansible-pull model — instances pull their own config at boot. No manual SSH, no drift.",
    ],
    tech: [
      "Terraform (15 modules, remote state + locking)",
      "Ansible (pull-based)",
      "Jenkins",
      "AWS EC2 · ALB · ASG · Route 53 · SSM · S3",
      "AlmaLinux",
      "SonarQube · Nexus",
    ],
    challenges: [
      {
        q: "Service discovery across 11 EC2s was brittle.",
        a: "Adopted a Route 53 private hosted zone and generated A records from Terraform outputs — services resolve each other by DNS, not IP.",
      },
      {
        q: "Configuration drift after manual hotfixes.",
        a: "Switched to ansible-pull at boot and applied an IAM boundary policy that blocked out-of-band console changes. Enforced tfsec in CI as a hard gate.",
      },
      {
        q: "One VPC module, two very different environments (dev vs prod).",
        a: "Wrote the VPC as a dual-mode module — same code path, different variable set. Region-agnostic, input-validated, reusable across every future project.",
      },
    ],
    lessons: [
      "Modules over monoliths. One root, many small versioned modules — never copy-paste HCL.",
      "State is production data. Remote backend + locking from day one.",
      "If you can't Terraform it, you don't understand it. The console hides too much.",
    ],
    arch: {
      nodes: [
        { id: "tf", label: "Terraform (15 modules)", x: 18, y: 50, group: "pipeline", role: "Root + child modules. Remote state on S3, locked via DynamoDB." },
        { id: "vpc", label: "VPC · 2 AZs", x: 38, y: 50, group: "edge", role: "Public / private / database subnets. All SG rules least-privilege." },
        { id: "web", label: "External ALB", x: 52, y: 22, group: "edge", role: "Public entry on stallions.space with ACM TLS." },
        { id: "int", label: "Internal ALB", x: 52, y: 50, group: "edge", role: "Host-header routing between 11 microservices." },
        { id: "asg", label: "ASGs (per service)", x: 52, y: 78, group: "compute", role: "50% CPU target tracking. AMIs baked via Ansible before rollout." },
        { id: "r53", label: "Route 53 (private)", x: 74, y: 22, group: "edge", role: "catalog.roboshop.internal, cart.roboshop.internal, ..." },
        { id: "mongo", label: "MongoDB", x: 74, y: 50, group: "data", role: "Catalog + User data — DB subnet, DB-only SG." },
        { id: "redis", label: "Redis · MySQL · MQ", x: 74, y: 78, group: "data", role: "Session, relational, and messaging tiers — each isolated." },
      ],
      edges: [
        { from: "tf", to: "vpc" },
        { from: "vpc", to: "web" },
        { from: "vpc", to: "int" },
        { from: "vpc", to: "asg" },
        { from: "web", to: "int" },
        { from: "int", to: "asg" },
        { from: "asg", to: "r53" },
        { from: "asg", to: "mongo" },
        { from: "asg", to: "redis" },
      ],
    },
  },
];

export const JOURNEY = [
  {
    year: "Phase 1",
    title: "Learn infrastructure the hard way",
    body: "RoboShop on EC2 + ALB. 15 Terraform modules, ASGs, security groups, ansible-pull. No shortcuts — provisioned every subnet, wrote every SG rule.",
  },
  {
    year: "Phase 2",
    title: "Build reusable, modular IaC",
    body: "Terraform VPC module — dual testing/prod mode, region-agnostic, input-validated. Consumed by every downstream project instead of copy-pasted.",
  },
  {
    year: "Phase 3",
    title: "Move to container orchestration",
    body: "Kubernetes lab from first principles — every resource type, every concept, hands-on manifests. Pods → Deployments → Services → Ingress → RBAC → NetworkPolicy.",
  },
  {
    year: "Phase 4",
    title: "Production-style Kubernetes on EKS",
    body: "Retail Store on AWS EKS. Helm umbrella charts, IRSA with a scoped IAM policy, HPA at 70% CPU, StatefulSets with EBS dynamic provisioning, full observability.",
  },
  {
    year: "Phase 5",
    title: "Automate everything",
    body: "Jenkins shared library — one pipeline definition, three Groovy functions, every microservice in every language. Deploy process changes in one place.",
  },
  {
    year: "2026",
    title: "CKA certified",
    body: "Passed the Certified Kubernetes Administrator exam. Bootstrapping, upgrades, RBAC, etcd backup/restore, and troubleshooting from first principles.",
  },
];

export const SKILLS: { group: string; items: string[] }[] = [
  { group: "Cloud (AWS)", items: ["EKS", "EC2", "VPC", "IAM / IRSA", "ALB / ASG", "EBS / EFS", "DynamoDB", "Route 53", "SSM", "S3"] },
  { group: "Containers & Orchestration", items: ["Kubernetes", "Docker", "Helm (umbrella)", "IRSA", "StatefulSets", "HPA", "EBS CSI"] },
  { group: "Infra as Code", items: ["Terraform (modular)", "Remote state + locking", "SSM integration", "Dual-mode VPC"] },
  { group: "Config Management", items: ["Ansible", "ansible-pull", "Roles", "Zero push model"] },
  { group: "CI/CD", items: ["Jenkins Shared Libraries", "Multi-language version detection", "Nexus", "SonarQube"] },
  { group: "Observability", items: ["Prometheus", "kube-prometheus-stack", "Grafana", "ServiceMonitors", "PromQL"] },
  { group: "OS & Scripting", items: ["Linux", "AlmaLinux", "Ubuntu", "Bash"] },
  { group: "Languages", items: ["Java", "Go", "Node.js", "Python (reading/debugging)", "HCL", "YAML"] },
];

export type Cert = {
  id: string;
  name: string;
  issuer: string;
  year: string;
  featured?: boolean;
  status?: "certified" | "in-progress";
  demonstrates: string[];
  link?: string;
};

export const CERTIFICATIONS: Cert[] = [
  {
    id: "cka",
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "The Linux Foundation · CNCF",
    year: "2025",
    featured: true,
    status: "certified",
    link: "https://www.credly.com/org/the-linux-foundation/badge/certified-kubernetes-administrator-cka",
    demonstrates: [
      "Bootstrapping and upgrading production Kubernetes clusters with kubeadm.",
      "Managing workloads: Deployments, DaemonSets, StatefulSets, Jobs, and rolling updates.",
      "Configuring cluster networking: Services, Ingress, and NetworkPolicy for zero-trust posture.",
      "Persistent storage: PVs, PVCs, StorageClasses, and CSI drivers.",
      "Security: RBAC, ServiceAccounts, admission control, TLS bootstrapping.",
      "etcd operations: backup, restore, and cluster recovery under time pressure.",
      "Troubleshooting a broken cluster from first principles — control plane, kubelet, CNI.",
    ],
  },
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect — Associate (In Progress)",
    issuer: "Amazon Web Services",
    year: "2025",
    status: "in-progress",
    demonstrates: [
      "Designing multi-AZ, fault-tolerant architectures on AWS.",
      "Applying the Well-Architected Framework pillars to real workloads.",
      "IAM boundary design, VPC networking, and cost-aware service selection.",
    ],
  },
];

export const PIPELINE_STEPS = [
  { id: "git", label: "Git Push", detail: "Developer pushes to main branch." },
  { id: "jenkins", label: "Jenkins", detail: "Webhook triggers the shared-library pipeline." },
  { id: "build", label: "Build", detail: "detectVersion() reads pom.xml / main.go / package.json." },
  { id: "docker", label: "Docker", detail: "Multi-stage image build tagged with git SHA." },
  { id: "registry", label: "Registry", detail: "Image pushed to DockerHub / ECR." },
  { id: "terraform", label: "Terraform", detail: "Infra drift check + apply if needed." },
  { id: "k8s", label: "Kubernetes", detail: "helm upgrade with env-specific values." },
  { id: "obs", label: "Monitoring", detail: "Prometheus + Grafana confirm SLOs." },
];

export const DIFFERENTIATORS: { title: string; body: string }[] = [
  {
    title: "On IRSA",
    body: "I did not copy-paste a blog post. I enabled the OIDC provider, wrote the trust policy with the service-account condition, scoped the IAM policy to a specific table ARN, annotated the ServiceAccount, and verified it by exec-ing into the pod and checking env | grep AWS. I know it works because I know why it works.",
  },
  {
    title: "On the VPC module",
    body: "I wrote a module that other modules consume. Input validation, dual deployment modes, region-agnostic. When I call it from RoboShop and again from a new project, I don't copy-paste HCL — I reference the same tested module.",
  },
  {
    title: "On the Jenkins shared library",
    body: "I did not write a Jenkinsfile per service. I wrote three reusable Groovy functions that handle version detection for Maven, Go, and Node — then one pipeline definition that every service calls. When the deployment process changes, I change it once.",
  },
  {
    title: "On health probes",
    body: "I did not add them because a tutorial said to. I added them, measured the deploy time, watched it drop from 12 minutes to 1.5 minutes, and understood why. The startup probe is what made the difference — Kubernetes was killing pods before they finished connecting to databases.",
  },
];

export type StatusColumn = { heading: string; tone: "ready" | "learning" | "next"; items: string[] };

export const HONEST_STATUS: StatusColumn[] = [
  {
    heading: "Production-ready",
    tone: "ready",
    items: [
      "Certified Kubernetes Administrator (CKA)",
      "Multi-env VM infrastructure — 15 Terraform modules, full AWS stack",
      "Reusable Terraform VPC module — dual mode, region-agnostic, validated",
      "EKS production deployment — Helm umbrella, 10 subcharts, multi-env values",
      "IRSA — full OIDC chain, scoped IAM, zero static credentials",
      "Jenkins shared library — multi-language, multi-service, single codebase",
      "StatefulSets + EBS dynamic provisioning — MySQL and PostgreSQL",
      "HPA + health probes — 12 min → 1.5 min deployment time",
      "Prometheus + Grafana — ServiceMonitors, custom dashboards",
    ],
  },
  {
    heading: "Actively learning",
    tone: "learning",
    items: [
      "Linux internals — cgroups, namespaces, process model, OOM killer",
      "Networking — TCP, DNS resolution chain, k8s packet path through CNI",
      "PromQL + Alertmanager — from dashboards to real SLOs and alert rules",
    ],
  },
  {
    heading: "Next builds",
    tone: "next",
    items: [
      "External Secrets Operator — replace plaintext passwords with ESO + IRSA",
      "NetworkPolicies — pod-level security mirroring existing SG rules",
      "Argo CD — pull-based deployment replacing Jenkins CD",
      "Terraform CI — tflint + checkov + GitHub Actions on every PR",
      "Trivy image scanning in the Jenkins pipeline",
    ],
  },
];
