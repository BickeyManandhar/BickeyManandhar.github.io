// All site copy lives here. Edit this file to update the portfolio; components only render it.

export const profile = {
  name: "Bickey Manandhar",
  handle: "bickey.manandhar",
  role: "Software Engineer",
  company: "JPMorgan Chase",
  location: "Columbus, OH",
  since: "Nov 2023",
  email: "manandharbickey@gmail.com",
  linkedin: "https://www.linkedin.com/in/bickey-manandhar",
  github: "https://github.com/BickeyManandhar",
  photo: "/photo.webp",
};

export const hero = {
  eyebrow: ["● system online", "us-east-1 · us-east-2"],
  headline: "I build systems that",
  highlight: "keep running.",
  lede: [
    "I'm ",
    { b: profile.name },
    ", a software engineer at ",
    { b: profile.company },
    " designing event-driven Spring Boot microservices on AWS, with Kafka streaming between them and two regions behind them.",
  ] as (string | { b: string })[],
};

// Real figures only. Each one comes from the experience below.
export const stats = [
  { value: "21", label: "microservices on the platform" },
  { value: "2", label: "AWS regions, active failover" },
  { value: "6", label: "production wins shipped" },
  { value: profile.since, label: "building at JPMorgan Chase" },
];

export const about = {
  title: "From Nepal to New York to Columbus.",
  paragraphs: [
    "I grew up in Nepal, where I studied science with computer science in high school. I came to the US for Computer Engineering at Gannon University, then moved to New York, earning an AS at LaGuardia Community College and a BA in Computer Science at CUNY Queens College.",
    "Today I'm a full-stack engineer at JPMorgan Chase with a strong backend focus. I design and build Java and Spring Boot microservices on a platform of 21 services running across two AWS regions, and I'm comfortable taking a feature all the way to the frontend with React.",
    "I also own the layers underneath the code. I work hands-on with AWS (ECS, Lambda, Aurora, DynamoDB, ElastiCache, load balancers), define infrastructure as code with Terraform, ship through CI/CD pipelines, and build event streaming and data pipelines with Kafka, Flink and Snowflake. I care about the parts that make systems trustworthy: caching, failover, disaster recovery, data retention, and clean contracts between services.",
    "I'm currently completing an MS in Information Systems at Trine University.",
  ],
  facts: [
    ["role", "Software Engineer"],
    ["company", "JPMorgan Chase"],
    ["region", "Columbus, OH"],
    ["uptime", "since Nov 2023"],
    ["focus", "Full-stack · backend-heavy"],
    ["layers", "Backend · Cloud · Infra"],
    ["status", "open to conversations"],
  ] as [string, string][],
};

export type Win = { impact: string; proof?: string; how: string };
export type Release = {
  tag: string;
  when?: string;
  live?: boolean;
  title: string;
  org: string;
  wins?: Win[];
  stack?: string[];
};

export const releases: Release[] = [
  {
    tag: "release/jpmc",
    when: "Nov 2023 → present",
    live: true,
    title: "Software Engineer",
    org: "JPMorgan Chase · Columbus, OH",
    wins: [
      {
        impact: "Reduced database load on high-traffic APIs",
        proof: "confirmed with before-and-after load tests",
        how: "by taking ElastiCache Redis caching from proof of concept to production, caching DTOs instead of JPA entities, and adding a fail-open error handler so a cache outage never fails a request.",
      },
      {
        impact: "Kept the platform available through a regional outage",
        proof: "with failover that needs no manual steps",
        how: "by building Lambda-based failover across us-east-1 and us-east-2 using Route 53 weighted routing, health monitoring, and region-aware logic tied to Aurora Global Database.",
      },
      {
        impact: "Opened platform data to analytics and downstream teams",
        proof: "with every event traceable as delivered or failed",
        how: "by building an event-driven publication pipeline: Avro-typed Kafka events, Flink jobs that land source, trusted and error tables in an S3/Glue data lake, and an hourly load into Snowflake.",
      },
      {
        impact: "Kept production databases lean and within retention policy",
        proof: "with deletions reported automatically",
        how: "by building scheduled Lambda jobs that purge expired Aurora PostgreSQL data safely across foreign-key relationships and publish deleted row counts through SNS.",
      },
      {
        impact: "Replaced manual partner file exchanges with an automated, secure flow",
        how: "by building a Java Lambda on Apache MINA SSHD that integrates with the firm's managed file transfer service.",
      },
      {
        impact: "Restored event processing during a production incident",
        how: "by tracing serialization failures to an Avro schema re-registration issue in Schema Registry and correcting it.",
      },
    ],
    stack: [
      "Java",
      "Spring Boot",
      "AWS ECS",
      "Aurora PostgreSQL",
      "DynamoDB",
      "Kafka",
      "Flink",
      "Snowflake",
      "ElastiCache",
      "Lambda",
      "Route 53",
      "Terraform",
      "Spinnaker",
    ],
  },
  { tag: "build/msis", when: "in progress", live: true, title: "MS, Information Systems", org: "Trine University" },
  { tag: "build/ba", when: "completed", title: "BA, Computer Science", org: "CUNY Queens College · New York" },
  { tag: "build/as", when: "completed", title: "AS, Computer Science", org: "LaGuardia Community College · New York" },
  {
    tag: "canary/gannon",
    when: "1 semester, then rerouted",
    title: "Computer Engineering",
    org: "Gannon University · Erie, Pennsylvania. My first semester of college in the US, before transferring to LaGuardia.",
  },
  {
    tag: "init",
    title: "Hello, world",
    org: "Nepal · Higher secondary in Science, physical group with Computer Science",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Services", items: ["Java", "Spring Boot", "REST APIs", "Microservices"] },
  { group: "Streaming", items: ["Kafka", "Avro", "Schema Registry"] },
  { group: "Data", items: ["Aurora PostgreSQL", "DynamoDB", "ElastiCache (Redis)", "ElastiCache (Valkey)"] },
  { group: "Data pipelines", items: ["Apache Flink", "Amazon S3", "AWS Glue", "Amazon Athena", "Snowflake"] },
  { group: "Networking", items: ["ALB", "NLB", "Route 53"] },
  { group: "Cloud & delivery", items: ["AWS ECS", "Lambda", "Multi-region DR", "Terraform", "Jenkins", "Spinnaker"] },
  { group: "Frontend", items: ["React", "TypeScript", "PWA"] },
];

export type Project = {
  status: string;
  kind: string;
  title: string;
  body: string;
  stack: string[];
  arch: [string, string, string];
  archNote?: string;
  link?: string;
};

export const projects: Project[] = [
  {
    status: "mvp shipped",
    kind: "personal",
    title: "Receipt-scanning expense tracker",
    body: "Snap a receipt on your phone and it becomes a categorized expense. An installable PWA with a Spring Boot API behind it.",
    stack: ["React", "PWA", "Spring Boot"],
    arch: ["React PWA", "Spring Boot", "receipts db"],
    archNote: "scan",
  },
  {
    status: "running",
    kind: "personal",
    title: "Serverless monitors",
    body: "Small AWS Lambda functions that watch things I care about on a schedule and notify me when something changes.",
    stack: ["AWS Lambda", "Serverless"],
    arch: ["schedule", "Lambda", "alert"],
  },
  {
    status: "you are here",
    kind: "this site",
    title: "This portfolio",
    body: "A React and TypeScript single-page site built with Vite. A GitHub Actions workflow builds and deploys it to GitHub Pages on every push, with Cloudflare handling DNS. No backend, no database.",
    stack: ["React", "TypeScript", "Vite", "GitHub Actions", "Cloudflare DNS"],
    arch: ["git push", "Actions build", "GitHub Pages"],
    link: "https://github.com/BickeyManandhar/BickeyManandhar.github.io",
  },
];

export const education = [
  { degree: "MS, Information Systems", school: "Trine University", status: "in progress" },
  { degree: "BA, Computer Science", school: "CUNY Queens College", status: "completed" },
  { degree: "AS, Computer Science", school: "LaGuardia Community College", status: "completed" },
];

export const contact = {
  pitch:
    "I'm happy to talk about backend engineering, distributed systems, or a role where reliability matters. Reach me at any of these endpoints.",
  endpoints: [
    { method: "EMAIL", label: profile.email, copy: profile.email },
    { method: "GET", label: "linkedin.com/in/bickey-manandhar", href: profile.linkedin, copy: profile.linkedin },
    { method: "GET", label: "github.com/BickeyManandhar", href: profile.github, copy: profile.github },
  ] as { method: string; label: string; href?: string; copy: string }[],
};

export const sections = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];
