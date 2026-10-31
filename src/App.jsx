import { useState, useEffect, useRef } from "react";
import heroPhoto from "./assets/photoprofile.PNG";

// ── Intersection Observer hook ─────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Fade-up wrapper ────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Tenure since a start month (inclusive), e.g. "3 mos" or "1 yr 2 mos" ───
function tenureSince(year, month) {
  const now = new Date();
  const total = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month) + 1;
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  const parts = [];
  if (yrs) parts.push(`${yrs} yr${yrs > 1 ? "s" : ""}`);
  if (mos) parts.push(`${mos} mo${mos > 1 ? "s" : ""}`);
  return parts.join(" ");
}

// ── Data  -  every word is intentional ──────────────────────────────────────
const experience = [
  {
    role: "Software Engineer & Developer Fellow",
    subtitle: "Data Transformation & Financial Reporting Automation",
    company: "Greenpoint Global",
    location: "Rye, NY",
    period: "Aug 2026 – Present",
    color: "violet",
    tag: `Full-time · ${tenureSince(2026, 8)}`,
    bullets: [
      "Lead a 4-member Mapping & Automation team, translating business requirements into technical deliverables, coordinating task ownership and code/review workflows, and driving data-mapping and financial-report automation initiatives with cross-functional stakeholders.",
      "Engineer configuration-driven data transformation and ETL workflows using Python, SQL, Excel, and structured mapping rules to standardize heterogeneous financial data across loans, deposits, investments, and general-ledger records for downstream reporting systems.",
      "Migrated and validated client financial records across 6 data domains with zero transformation errors, implementing reusable mapping logic and end-to-end Contract-to-GL and Contract-to-Balance-Sheet reconciliation with traceable validation and exception reporting.",
      "Develop the Call Report Automation & Mapping Framework for NCUA regulatory reporting, integrating dynamic mapping and standardized data-ingestion workflows to support varying client file structures and reduce reliance on manual, client-specific transformations.",
    ],
  },
  {
    role: "Student Systems Engineer",
    subtitle: "Full-Stack Engineering & IT Infrastructure",
    company: "UMass Amherst – CSCF",
    location: "Amherst, MA",
    period: "Aug 2025 – May 2026",
    color: "cyan",
    tag: "Part-time · 10 mos",
    bullets: [
      "Built a production full-stack billing platform for UMass research groups  -  Next.js frontend with Azure Entra ID SSO via NextAuth, Django REST Framework backend with JWT auth, PostgreSQL on a remote server, and a proxy API architecture that keeps backend services secure from direct client access.",
      "Engineered the complete multi-role billing workflow end-to-end: Admin, Finance Admin, Grant Admin, and PI  -  covering FTE data ingestion, bill generation, multi-stage review and approval, HR account reallocation, and financial data export. Actively deployed and serving UMass research groups.",
      "Executed Request Tracker v5-to-v6 migration with zero data loss, ensuring continuity of department ticketing and service management operations across the CS department.",
      "Provided Linux/Unix server support including system troubleshooting, server configuration, and infrastructure maintenance for CSCF computing environments supporting the CS department.",
      "Built agentic development workflows using AI coding agents in agent mode, applying spec-driven development and prompt engineering to scaffold the proxy API architecture and multi-role permission logic; validated all AI-generated output for correctness and security before shipping to production.",
      "Delivered Windows and macOS end-user IT support  -  diagnosing hardware and software issues, assisting students and faculty with system configurations and account management.",
    ],
  },
  {
    role: "Site Reliability Engineer",
    subtitle: "Reference Data Infrastructure  -  Equity & Derivatives",
    company: "Morgan Stanley via Accolite Digital",
    location: "Bangalore, India",
    period: "Jun 2022 – Aug 2024",
    color: "fuchsia",
    tag: "Full-time · 2 yrs 3 mos",
    bullets: [
      "Owned 24/7 reliability for Morgan Stanley's global derivatives data pipelines  -  sustained 99.9%+ SLA across high-volume equity and fixed-income workflows using Splunk, Grafana, Prometheus, and AWS CloudWatch.",
      "Cut mean time to recovery by 30% (90 → 63 min) on P1/P2 incidents through systematic Linux diagnostics (top, ps, grep, lsof) and multi-table Oracle SQL root cause analysis  -  converted every finding into a runbook that cut repeat P2 incidents by 20%.",
      "Recovered 15+ engineer-hours of weekly overhead by building 40+ production-grade Python and Bash automation tools, shifting the team from reactive firefighting to proactive reliability engineering.",
      "Protected 100% data accuracy across quarterly FTSE and MSI index rebalances by coordinating Bloomberg and Refinitiv vendor feed validation across equity and fixed-income derivative reference data pipelines.",
      "Designed, built, and operated Python and Java microservices on AWS (Lambda, EKS, EC2, S3, RDS, IAM) with RESTful APIs, load balancer configuration, Docker deployments via Jenkins and GitHub Actions CI/CD, and Terraform-compatible Infrastructure as Code with GitOps practices and secrets management.",
      "Built and orchestrated production ETL data pipelines using Apache Airflow, scheduling and monitoring ingestion and transformation workflows for Bloomberg and Refinitiv financial data with automated data quality checks and SQL-driven validation.",
      "Built observability infrastructure from scratch using Grafana, Prometheus, Splunk, AppDynamics, and CloudWatch; defined SLOs and error budgets across owned services and drove root cause analysis through blameless post-mortems.",
      "Administered Autosys job scheduling and supported MS SQL Server databases across Unix, Linux, and Windows environments, applying least-privilege IAM policies and secure VPC networking for mission-critical distributed systems.",
      "Authored 10+ ITIL-aligned runbooks, SOP documents, and knowledge base articles standardizing incident response, change management, and vendor escalation procedures across the reference data team.",
    ],
  },
  {
    role: "Software Developer Engineer",
    subtitle: "Backend Engineering Intern",
    company: "Accolite Digital",
    location: "Bangalore, India",
    period: "Feb 2022 – Jun 2022",
    color: "violet",
    tag: "Internship · 5 mos",
    bullets: [
      "Shipped JWT-secured Spring Boot microservices with Docker containerization, increasing referral processing throughput by 50%  -  work converted directly to full-time hire.",
      "Rewrote PostgreSQL analytics queries using CTEs and targeted indexing, achieving a 40% performance improvement on datasets exceeding millions of rows.",
      "Built RESTful APIs in Python (Django) and Java (Spring Boot) with PostgreSQL and MySQL on AWS; delivered unit-tested Docker containerized microservices via CI/CD pipelines in an Agile development environment.",
      "Reduced average defect resolution time by ~33% by integrating AWS CloudWatch observability into development workflows and systematically triaging issues through JIRA.",
    ],
  },
  {
    role: "Data Science Intern",
    subtitle: "ML Engineering & Fraud Analytics",
    company: "Tata Consultancy Services (TCS)",
    location: "Coimbatore, India",
    period: "Jun 2021 – Aug 2021",
    color: "cyan",
    tag: "Internship · 3 mos",
    bullets: [
      "Engineered a fraud detection pipeline over 3M+ financial transactions  -  final Random Forest model achieved 96.2% AUC, outperforming baseline by a significant margin.",
      "Designed class imbalance handling frameworks using stratified k-fold validation and cost-sensitive learning that reduced false negatives by 22%, improving anomaly detection precision in production-scale financial data.",
      "Built the end-to-end Python data pipeline using XGBoost, Random Forest, and SMOTE class balancing, with SQL-driven validation and automated reporting.",
    ],
  },
];

const projects = [
  {
    title: "CSCF Billing System",
    subtitle: "Production · UMass Research Group Billing Platform",
    stack: ["Next.js", "NextAuth", "Azure Entra ID", "Django REST", "PostgreSQL", "JWT", "Ant Design"],
    impact: "Actively deployed · Multi-role workflow · Azure SSO",
    badge: "Production",
    blurb:
      "Production billing platform built for UMass CSCF, actively serving UMass research groups. Azure Entra ID SSO via NextAuth, a proxy API architecture preventing direct client-to-backend access, and a complete multi-role workflow  -  Admins generate bills, Finance Admins manage HR account data, Grant Admins allocate funds, and PIs approve or reject final bills. Covers the full lifecycle from raw campus payment data ingestion through FTE calculation, draft bill creation, multi-stage approval, and financial data export.",
  },
  {
    title: "SafeRx",
    subtitle: "GenAI Medication Safety System · Microsoft Agents League Hackathon 2026",
    stack: ["FastAPI", "Azure AI Foundry", "GPT-4o", "React", "Vite", "Tailwind", "openFDA", "WHO Data"],
    impact: "6-step reasoning chain · Hard safety escalation · 93+ tests",
    badge: "Hackathon",
    blurb:
      "Built a GenAI medication-safety system using Azure AI Foundry's GPT-4o with a six-step deterministic reasoning chain and hard safety-escalation rules that override model output when a query requires resolution outside the LLM. FastAPI backend and React/Vite/Tailwind frontend backed by live openFDA and WHO data, with 93+ automated tests. Submitted to the Microsoft Agents League Hackathon 2026 (Creative Apps track).",
  },
  {
    title: "Apollo Healthcare Management System",
    subtitle: "End-to-end production-grade healthcare platform",
    stack: ["React", "Django REST", "PostgreSQL", "AWS Lambda", "AWS SNS", "Google OAuth", "CI/CD"],
    impact: "Real-time notifications · Concurrent booking · Secure auth",
    blurb:
      "Built a full-stack appointment scheduling system handling concurrent user requests with zero data inconsistency. Implemented structured logging for production-style observability, AWS SNS for reliable async notifications, and Google OAuth for secure authentication  -  engineered with production reliability principles at its core. PostgreSQL row-level locking guards concurrent bookings, AWS Lambda/SNS drives asynchronous event-driven processing, and complete CI/CD pipelines were built from scratch.",
  },
  {
    title: "Financial Fraud Detection Pipeline",
    subtitle: "ML system over 3M+ real transaction records",
    stack: ["Python", "Pandas", "Scikit-learn", "Random Forest", "SMOTE"],
    impact: "96.2% AUC · 22% fewer false negatives · 3M+ records",
    blurb:
      "Designed and benchmarked multiple ML classifiers on a large-scale imbalanced financial dataset. Engineered class-balancing strategies and feature pipelines that pushed model AUC to 96.2%  -  directly applicable to fraud, anomaly detection, and risk scoring systems in production fintech environments.",
  },
  {
    title: "Industry 4.0 Healthcare Research Intelligence",
    subtitle: "NLP-driven literature analysis · IEEE Publication",
    stack: ["Python", "LDA", "KeyBERT", "Scikit-learn", "Pandas"],
    impact: "500+ papers analyzed · Coherence 0.43 · Published insights",
    blurb:
      "Applied LDA topic modeling and KeyBERT keyword extraction to 500+ unstructured healthcare research papers, surfacing AI diagnostics and blockchain adoption trends in Healthcare 4.0. Achieved topic coherence scores up to 0.43 enabling interpretable, strategy-grade topic clusters  -  demonstrating that I can turn unstructured data into actionable intelligence. Identified 16 distinct latent topics across four healthcare sub-domains (cardiology, oncology, orthopedics, health records), including robotic surgery trends.",
  },
  {
    title: "5-Stage Pipelined CPU & Cache Simulator",
    subtitle: "Systems architecture · Graduate coursework (COMPSCI 535)",
    stack: ["C++", "Pipeline Design", "Hazard Detection", "Cache Simulation"],
    impact: "3.76x speedup · Hazard detection · Cache simulation",
    blurb:
      "Designed and implemented a full 5-stage pipelined processor with hazard detection logic and a unified direct-mapped L1 cache (write-through, no-write-allocate). Analyzed CPI, stall cycles, and cache miss rates  -  the kind of low-level systems thinking that directly informs how I reason about performance bottlenecks in production infrastructure. Added branch handling, then identified and resolved a critical pipeline and cache stall bug, achieving a 3.76x speedup over the single-cycle baseline.",
  },
  {
    title: "AI-Powered Educational Platform",
    subtitle: "IEEE Publication · Adaptive Learning & Intelligent Matching · Apr 2022",
    stack: [".NET Framework", "MySQL", "Naive Bayes", "Decision Trees", "HTML/CSS/JS"],
    impact: "92% match accuracy · 70% less manual work · IEEE published",
    badge: "Publication",
    blurb:
      "Built a student-facing social platform that surfaces relevant academic and non-academic events using a hybrid Naive Bayes + Decision Tree profile-matching engine  -  achieving 92% event-student match accuracy and cutting manual curation effort by 70%. Research was accepted and presented at an IEEE Conference.",
  },
  {
    title: "E-Pass Generation System",
    subtitle: "COVID-19 travel authorization portal · Oct 2020",
    stack: ["HTML", "CSS", "JavaScript", "Java", "MySQL", "XAMPP"],
    impact: "End-to-end portal · Auto-generated passes · Live during pandemic",
    blurb:
      "Designed and shipped a full-stack e-pass portal during the COVID-19 lockdown to automate safe-travel authorization. Built with a Java + MySQL backend and vanilla JS frontend  -  a practical, deployed solution for a real civic problem, built entirely during undergraduate studies.",
  },
];

const skillGroups = [
  {
    label: "Languages",
    color: "cyan",
    items: ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL", "Bash/Shell"],
  },
  {
    label: "Cloud & Infrastructure",
    color: "fuchsia",
    items: ["AWS EC2", "AWS S3", "AWS CloudWatch", "AWS SNS", "AWS Lambda", "AWS EKS", "AWS RDS", "AWS IAM", "AWS VPC", "Docker", "Kubernetes", "Linux", "Linux (RHEL)", "Terraform (IaC)", "GitOps", "Microservices", "Load Balancing"],
  },
  {
    label: "Observability & SRE",
    color: "violet",
    items: ["Splunk", "Grafana", "Prometheus", "ELK Stack", "PagerDuty", "Autosys", "AppDynamics", "OpenTelemetry", "Distributed Tracing", "CloudWatch"],
  },
  {
    label: "Frameworks & Databases",
    color: "cyan",
    items: ["React", "Next.js", "Django", "Django REST", "FastAPI", "Spring Boot", "Node.js", "PostgreSQL", "Oracle SQL", "MySQL", "MongoDB", "MS SQL Server"],
  },
  {
    label: "ML & Data",
    color: "fuchsia",
    items: ["Scikit-learn", "Pandas", "NumPy", "LDA", "KeyBERT", "Random Forest", "LIME/SHAP", "XGBoost", "SMOTE", "Stratified K-Fold CV", "Feature Engineering"],
  },
  {
    label: "Security & Tooling",
    color: "violet",
    items: ["JWT", "Azure Entra ID", "OAuth 2.0", "Jenkins", "GitHub Actions", "Git", "JIRA", "Figma", "RBAC", "Least-Privilege IAM", "Secrets Management", "Confluence"],
  },
  {
    label: "SRE Practices",
    color: "cyan",
    items: ["SLI/SLO Design", "Error Budgets", "Incident Response", "Root Cause Analysis", "Blameless Post-Mortems", "On-Call Operations", "Capacity Planning"],
  },
  {
    label: "Data Engineering & Reporting",
    color: "fuchsia",
    items: ["ETL/ELT Pipelines", "Apache Airflow", "Apache Kafka", "SQL Analytics", "Data Mapping", "Power BI", "Excel"],
  },
  {
    label: "AI-Assisted Development",
    color: "violet",
    items: ["AI Coding Agents", "Cursor", "Copilot", "Agentic Workflows", "Spec-Driven Development", "Prompt Engineering", "AI Output Validation"],
  },
];

const orbitCards = ["SRE", "Backend", "Infrastructure", "Automation", "Observability", "Systems", "Data", "IT"];

const colorMap = {
  cyan:    { dot: "#22d3ee", badge: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200" },
  fuchsia: { dot: "#e879f9", badge: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200" },
  violet:  { dot: "#a78bfa", badge: "border-violet-400/30 bg-violet-400/10 text-violet-200" },
};

// ── Component ──────────────────────────────────────────────────────────────
export default function SanchitaPortfolio() {
  const [activeExp, setActiveExp] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const [emailToast, setEmailToast] = useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("sanchitathaya@gmail.com").catch(() => {});
    setEmailToast(true);
    setTimeout(() => setEmailToast(false), 3000);
  };

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  const heroStyle = (delay) => ({
    opacity: heroReady ? 1 : 0,
    transform: heroReady ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  });

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white selection:bg-fuchsia-500/30">

      {/* ── Background ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
        <div className="absolute right-0 top-1/4 h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse" style={{ animationDuration: "8s", animationDelay: "2s" }} />
        <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-violet-500/20 blur-3xl animate-pulse" style={{ animationDuration: "7s", animationDelay: "1s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_35%),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:100%_100%,42px_42px,42px_42px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-12">

        {/* ── Nav ── */}
        <nav
          style={heroStyle(0)}
          className="mb-10 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl"
        >
          <div className="text-sm font-medium uppercase tracking-[0.25em] text-white/80">SANCHITA T.</div>
          <div className="hidden gap-6 text-sm text-white/70 md:flex">
            {["about", "experience", "projects", "skills", "contact"].map((s) => (
              <a key={s} href={`#${s}`} className="capitalize transition hover:text-white">{s}</a>
            ))}
          </div>
          <a
            href="https://www.linkedin.com/in/sanchitathayagaran/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium text-cyan-200 transition hover:bg-cyan-400/20"
          >
            Open to Work
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </a>
        </nav>

        {/* ── Hero ── */}
        <section className="grid min-h-[78vh] items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div style={heroStyle(100)} className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-cyan-200">
              SRE · Software Eng · Infra · Systems · Data
            </div>

            <h1 style={heroStyle(200)} className="max-w-5xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl pb-2 overflow-visible">
              Sanchita
              <span className="relative mx-2 inline-block bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent pb-2">
                Thayagaran
              </span>
            </h1>

            <div style={heroStyle(280)} className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1.5 text-xs font-medium text-fuchsia-300">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                she / her
              </span>
              <button
                onClick={() => {
                  const u = new SpeechSynthesisUtterance("Sun chee ta  Tha yah guh run");
                  u.rate = 0.85;
                  u.pitch = 1.05;
                  window.speechSynthesis.cancel();
                  window.speechSynthesis.speak(u);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/50 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300 cursor-pointer"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                <span className="text-white/30 italic mr-0.5">say:</span> Sun-chee-ta · Tha-yah-guh-run
              </button>
            </div>

            <div style={heroStyle(450)} className="mt-8 flex flex-wrap gap-4">
              <a href="#projects" className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10 hover:scale-[1.03]">
                See My Work
              </a>
              <a href="#contact" className="rounded-2xl border border-fuchsia-400/30 bg-fuchsia-400/10 px-6 py-3 text-sm font-semibold text-fuchsia-200 backdrop-blur-md transition hover:bg-fuchsia-400/20 hover:scale-[1.03]">
                Get In Touch
              </a>
            </div>

            <div style={heroStyle(550)} className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["3+", "Years professional experience across SRE, backend & systems engineering"],
                ["MSCS", "Graduate CS  -  UMass Amherst, May 2026"],
                ["4", "Industries: Finance · IT · Healthcare · Research"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-cyan-400/30">
                  <div className="text-3xl font-bold text-white">{value}</div>
                  <div className="mt-1 text-xs text-white/55 leading-5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Orbit visual */}
          <div style={heroStyle(400)} className="relative mx-auto flex h-[38rem] w-full max-w-xl items-center justify-center">
            {/* Outer decorative ring */}
            <div className="absolute h-[26rem] w-[26rem] rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl" />
            {/* Spinning dashed orbit track */}
            <div className="absolute h-[22rem] w-[22rem] rounded-full border border-dashed border-cyan-300/20" style={{ animation: "spin 25s linear infinite" }} />
            {/* Inner glow ring */}
            <div className="absolute h-[14rem] w-[14rem] rounded-full border border-cyan-300/20 bg-cyan-300/5 blur-sm" />
            {/* Center photo */}
            <div className="absolute z-10 flex flex-col items-center gap-3">
              <div className="rounded-full p-[3px]" style={{ background: "linear-gradient(135deg, #22d3ee, #e879f9, #a78bfa)" }}>
                <div className="rounded-full p-[2px] bg-black">
                  <img
                    src={heroPhoto}
                    alt="Sanchita Thayagaran"
                    className="h-52 w-52 rounded-full object-cover object-top shadow-2xl shadow-fuchsia-500/30"
                  />
                </div>
              </div>
              <div className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">Open to Roles</div>
            </div>
            {/* Orbit cards  -  radius 210px, offset angle so cards sit cleanly between top/bottom */}
            {orbitCards.map((item, index) => {
              const angle = (index / orbitCards.length) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(angle) * 210;
              const y = Math.sin(angle) * 210;
              return (
                <div
                  key={item}
                  className="absolute rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-xl transition hover:border-cyan-300/40 hover:scale-105"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="mt-24">
          <FadeUp className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
              <div className="text-sm uppercase tracking-[0.25em] text-cyan-200">About</div>
              <h2 className="mt-3 text-3xl font-bold leading-tight">I don't just monitor systems.<br/>I own their reliability.</h2>
              <p className="mt-4 leading-7 text-white/70">
                In production financial environments, I was the person who rewrote the alerts, automated the toil, and made sure the team had runbooks that actually worked at 3am. I bring that same ownership mentality to everything I build  -  from production pipelines to research projects to full-stack applications.
              </p>
              <p className="mt-3 leading-7 text-white/60">
                Now a Software Engineer & Developer Fellow at Greenpoint Global, leading a Mapping & Automation team, after completing my M.S. in Computer Science at UMass Amherst. Actively targeting Software Engineering, SRE, Infrastructure, Systems, IT, and Data roles.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                ["Production-First Thinking", "I've been paged on P1 incidents in global financial systems. I know what it means when systems go down  -  and exactly how to bring them back up."],
                ["Automation Over Toil", "I've eliminated dozens of manual operational checks through scripted automation. My default is: if a human has to do it twice, it should be a script."],
                ["Full-Stack Depth", "From Oracle SQL root cause analysis to React frontends to ML pipelines  -  I operate across the stack without losing engineering rigor."],
                ["Why Hire Me", "2+ years of SRE in finance + MSCS at a top-10 CS program + real shipped projects. I'm not entry-level. I'm ready to contribute from day one."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-fuchsia-400/20">
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">{text}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="mt-24">
          <FadeUp>
            <div className="mb-10">
              <div className="text-sm uppercase tracking-[0.25em] text-violet-200">Experience</div>
              <h2 className="mt-2 text-4xl font-bold">Where I've delivered</h2>
            </div>
          </FadeUp>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Tab list */}
            <FadeUp delay={100} className="flex flex-col gap-3">
              {experience.map((exp, i) => {
                const c = colorMap[exp.color];
                const isActive = activeExp === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveExp(i)}
                    className="w-full rounded-2xl border px-5 py-4 text-left backdrop-blur-xl transition-all duration-300 cursor-pointer"
                    style={{
                      borderColor: isActive ? c.dot + "55" : "rgba(255,255,255,0.08)",
                      background: isActive ? c.dot + "15" : "rgba(255,255,255,0.03)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-2.5 w-2.5 flex-shrink-0 rounded-full transition-all duration-300"
                        style={{ background: isActive ? c.dot : "#ffffff30", boxShadow: isActive ? `0 0 10px ${c.dot}` : "none" }}
                      />
                      <div>
                        <div className="text-sm font-semibold text-white/90 leading-tight">{exp.company.split(" via ")[0]}</div>
                        <div className="text-xs text-white/40 mt-0.5">{exp.tag}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </FadeUp>

            {/* Detail panel */}
            <FadeUp delay={150}>
              {experience.map((exp, i) => {
                const c = colorMap[exp.color];
                if (i !== activeExp) return null;
                return (
                  <div
                    key={i}
                    className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
                    style={{ borderColor: c.dot + "33" }}
                  >
                    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-widest mb-4 ${c.badge}`}>
                      {exp.period}
                    </span>
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    <p className="text-sm mt-1 font-medium" style={{ color: c.dot }}>{exp.subtitle}</p>
                    <p className="text-sm text-white/45 mt-1">{exp.company} · {exp.location}</p>
                    <ul className="mt-7 space-y-4">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-6 text-white/70">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: c.dot }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </FadeUp>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="mt-24">
          <FadeUp>
            <div className="mb-8">
              <div className="text-sm uppercase tracking-[0.25em] text-fuchsia-200">Projects</div>
              <h2 className="mt-2 text-4xl font-bold">Things I've built and why they matter</h2>
            </div>
          </FadeUp>

          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project, i) => (
              <FadeUp key={project.title} delay={i * 80}>
                <div className="group relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/40">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-fuchsia-500/10 opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/50">
                        0{i + 1}
                      </span>
                      <div className="flex gap-2">
                        {project.badge && (
                          <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs text-violet-300 font-medium">
                            {project.badge}
                          </span>
                        )}
                        <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-xs text-fuchsia-300">
                          {project.impact}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold leading-snug">{project.title}</h3>
                    <p className="mt-1 text-sm text-cyan-300">{project.subtitle}</p>
                    <p className="mt-4 text-sm leading-7 text-white/65">{project.blurb}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65 transition hover:border-cyan-300/40">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="mt-24">
          <FadeUp>
            <div className="mb-8">
              <div className="text-sm uppercase tracking-[0.25em] text-cyan-200">Skills</div>
              <h2 className="mt-2 text-4xl font-bold">Tools I've used under pressure</h2>
            </div>
          </FadeUp>

          <FadeUp delay={100} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => {
              const c = colorMap[group.color];
              return (
                <div key={group.label} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20">
                  <div className="text-xs uppercase tracking-[0.2em] mb-4 font-medium" style={{ color: c.dot }}>
                    {group.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:scale-[1.05] hover:text-white cursor-default"
                        style={{ "--hover-border": c.dot }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </FadeUp>
        </section>

        {/* ── Education ── */}
        <FadeUp className="mt-12">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.25em] text-violet-200 mb-6">Education</div>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  degree: "M.S. Computer Science",
                  school: "University of Massachusetts, Amherst",
                  note: "Top-10 CS program · Graduated May 2026",
                  period: "Sep 2024 – May 2026",
                  courses: ["Computer Networks", "Information Retrieval", "Systems Defense", "Software Engineering", "Optimization", "Data Visualization"],
                  color: "cyan",
                },
                {
                  degree: "B.E. Computer Science",
                  school: "Anna University",
                  note: "Coimbatore, Tamil Nadu · First Class",
                  period: "Aug 2018 – May 2022",
                  courses: ["Data Structures & Algorithms", "OOP", "DBMS", "Artificial Intelligence", "Cloud App Dev", "Data Mining"],
                  color: "fuchsia",
                },
              ].map((edu) => {
                const c = colorMap[edu.color];
                return (
                  <div key={edu.school} className="rounded-[1.5rem] border p-6" style={{ borderColor: c.dot + "25", background: c.dot + "08" }}>
                    <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: c.dot }}>{edu.period}</div>
                    <div className="text-xl font-bold text-white">{edu.degree}</div>
                    <div className="text-sm text-white/50 mt-0.5 mb-1">{edu.school}</div>
                    <div className="text-xs text-white/35 mb-4">{edu.note}</div>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course) => (
                        <span key={course} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">{course}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>

        {/* ── Certifications ── */}
        <FadeUp className="mt-12">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="text-sm uppercase tracking-[0.25em] text-cyan-200 mb-6">Certifications &amp; Achievements</div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { name: "McKinsey.org Forward Program", issuer: "McKinsey.org", date: "Sept 2026", color: "cyan" },
                { name: "Google IT Support", issuer: "Coursera · Google", date: "Sept 2020", color: "fuchsia" },
                { name: "Python for Data Science", issuer: "NPTEL", date: "Aug 2019", color: "violet" },
              ].map((cert) => {
                const c = colorMap[cert.color];
                return (
                  <div key={cert.name} className="rounded-[1.5rem] border p-5" style={{ borderColor: c.dot + "25", background: c.dot + "08" }}>
                    <div className="text-xs uppercase tracking-widest mb-1.5" style={{ color: c.dot }}>{cert.date}</div>
                    <div className="text-base font-bold text-white">{cert.name}</div>
                    <div className="text-sm text-white/50 mt-0.5">{cert.issuer}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>

        {/* ── Contact ── */}
        <FadeUp>
          <section
            id="contact"
            className="mt-12 mb-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-fuchsia-500/10 via-white/5 to-cyan-500/10 p-8 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-white/50">Contact</div>
                <h2 className="mt-2 text-3xl font-bold">If you need systems that don't fall over  -  let's talk.</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
                  Actively seeking Software Engineering, SRE, Infrastructure, Systems, IT, and Data roles. Available for full-time positions. Based in Amherst, MA. Open to relocation anywhere in the USA.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-w-[180px]">
                <a
                  href="mailto:sanchitathaya@gmail.com"
                  onClick={handleEmailClick}
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black text-center transition hover:bg-white/90 hover:scale-[1.02]"
                >
                  Email Me
                </a>
                <a
                  href="https://www.linkedin.com/in/sanchitathayagaran/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 text-center transition hover:bg-cyan-400/20 hover:scale-[1.02]"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Sanchita-Thayagaran"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white text-center transition hover:bg-white/10 hover:scale-[1.02]"
                >
                  GitHub
                </a>
              </div>
            </div>
          </section>
        </FadeUp>

      </main>

      {/* ── Email toast ── */}
      <div
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "50%",
          transform: emailToast ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(20px)",
          opacity: emailToast ? 1 : 0,
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: emailToast ? "auto" : "none",
          zIndex: 999,
        }}
        className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-2xl shadow-2xl shadow-black/50"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20 border border-cyan-400/30 flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Copied to clipboard</div>
          <div className="text-xs text-white/50 mt-0.5">sanchitathaya@gmail.com</div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}