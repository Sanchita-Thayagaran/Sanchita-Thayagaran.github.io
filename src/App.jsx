import { useState, useEffect, useRef } from "react";

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

// ── Data — every word is intentional ──────────────────────────────────────
const experience = [
  {
    role: "Senior Software Engineer",
    subtitle: "Site Reliability & Production Support — Financial Systems",
    company: "Morgan Stanley via Accolite Digital",
    location: "Bangalore, India",
    period: "Jun 2022 – Aug 2024",
    color: "cyan",
    tag: "Full-time · 2 yrs 3 mos",
    bullets: [
      "Owned 24/7 reliability for Morgan Stanley's global derivatives data pipelines — sustained 99.9% SLA across high-volume equity and fixed-income workflows using Splunk, Grafana, and AWS CloudWatch.",
      "Cut mean time to recovery by 30% on P1/P2 incidents through systematic Linux diagnostics (top, ps, grep, log tailing) and multi-table Oracle SQL root cause analysis — zero SLA breach during tenure.",
      "Eliminated 40+ error-prone manual checks by engineering Autosys-scheduled Python and Bash automation, freeing the team from reactive toil and reducing incident response time by 30%.",
      "Partnered with infra and dev teams across quarterly and annual rebalance cycles — validated Jenkins deployments, executed post-release health checks, and authored runbooks that became team-wide standard operating procedure.",
      "Prevented downstream financial reconciliation failures by surfacing complex data discrepancies before they reached reporting — directly protecting data integrity across global trading workflows.",
    ],
  },
  {
    role: "Software Developer Engineer",
    subtitle: "Backend Engineering Intern",
    company: "Accolite Digital",
    location: "Bangalore, India",
    period: "Feb 2022 – Jun 2022",
    color: "fuchsia",
    tag: "Internship · 5 mos",
    bullets: [
      "Shipped JWT-secured Spring Boot microservices with Docker containerization, increasing referral processing throughput by 50% — work converted directly to full-time hire.",
      "Rewrote PostgreSQL analytics queries using CTEs and targeted indexing, achieving a 40% performance improvement on datasets exceeding millions of rows.",
      "Reduced average defect resolution time by ~33% by integrating AWS CloudWatch observability into development workflows and systematically triaging issues through JIRA.",
    ],
  },
  {
    role: "Data Science Intern",
    subtitle: "ML Engineering & Fraud Analytics",
    company: "Tata Consultancy Services (TCS)",
    location: "Coimbatore, India",
    period: "Jun 2021 – Aug 2021",
    color: "violet",
    tag: "Internship · 3 mos",
    bullets: [
      "Engineered a fraud detection pipeline over 3M+ financial transactions — final Random Forest model achieved 96.2% AUC, outperforming baseline by a significant margin.",
      "Designed class imbalance handling frameworks that reduced false negatives by 22%, directly improving the precision of anomaly detection in production-scale financial data.",
    ],
  },
];

const projects = [
  {
    title: "Apollo Healthcare Management System",
    subtitle: "End-to-end production-grade healthcare platform",
    stack: ["React", "Django", "PostgreSQL", "AWS SNS", "Google OAuth"],
    impact: "Real-time notifications · Concurrent booking · Secure auth",
    blurb:
      "Built a full-stack appointment scheduling system handling concurrent user requests with zero data inconsistency. Implemented structured logging for production-style observability, AWS SNS for reliable async notifications, and Google OAuth for secure authentication — engineered with production reliability principles at its core.",
  },
  {
    title: "Financial Fraud Detection Pipeline",
    subtitle: "ML system over 3M+ real transaction records",
    stack: ["Python", "Pandas", "Scikit-learn", "Random Forest", "SMOTE"],
    impact: "96.2% AUC · 22% fewer false negatives · 3M+ records",
    blurb:
      "Designed and benchmarked multiple ML classifiers on a large-scale imbalanced financial dataset. Engineered class-balancing strategies and feature pipelines that pushed model AUC to 96.2% — directly applicable to fraud, anomaly detection, and risk scoring systems in production fintech environments.",
  },
  {
    title: "Industry 4.0 Healthcare Research Intelligence",
    subtitle: "NLP-driven literature analysis · IEEE-adjacent research",
    stack: ["Python", "LDA", "KeyBERT", "Scikit-learn", "Pandas"],
    impact: "100+ papers analyzed · High coherence scores · Published insights",
    blurb:
      "Applied LDA topic modeling and KeyBERT keyword extraction to 100+ healthcare research papers, surfacing AI diagnostics and blockchain adoption trends in Healthcare 4.0. Achieved high coherence scores enabling interpretable, strategy-grade topic clusters — demonstrating that I can turn unstructured data into actionable intelligence.",
  },
  {
    title: "5-Stage Pipelined CPU & Cache Simulator",
    subtitle: "Systems architecture · Graduate coursework (COMPSCI 535)",
    stack: ["C++", "Pipeline Design", "Hazard Detection", "Cache Simulation"],
    impact: "Hazard detection · CPI analysis · Cache miss optimization",
    blurb:
      "Designed and implemented a full 5-stage pipelined processor with hazard detection logic and a unified direct-mapped L1 cache (write-through, no-write-allocate). Analyzed CPI, stall cycles, and cache miss rates — the kind of low-level systems thinking that directly informs how I reason about performance bottlenecks in production infrastructure.",
  },
  {
    title: "AI-Powered Mobility Educational Application",
    subtitle: "IEEE Publication · Undergrad Capstone · Apr 2022",
    stack: [".NET Framework", "MySQL", "Naive Bayes", "Decision Trees", "HTML/CSS/JS"],
    impact: "92% match accuracy · 70% less manual work · IEEE published",
    badge: "Publication",
    blurb:
      "Built a student-facing social platform that surfaces relevant academic and non-academic events using a hybrid Naive Bayes + Decision Tree profile-matching engine — achieving 92% event-student match accuracy and cutting manual curation effort by 70%. Research was accepted and presented at an IEEE Conference.",
  },
  {
    title: "E-Pass Generation System",
    subtitle: "COVID-19 travel authorization portal · Oct 2020",
    stack: ["HTML", "CSS", "JavaScript", "Java", "MySQL", "XAMPP"],
    impact: "End-to-end portal · Auto-generated passes · Live during pandemic",
    blurb:
      "Designed and shipped a full-stack e-pass portal during the COVID-19 lockdown to automate safe-travel authorization. Built with a Java + MySQL backend and vanilla JS frontend — a practical, deployed solution for a real civic problem, built entirely during undergraduate studies.",
  },
];

const skillGroups = [
  {
    label: "Languages",
    color: "cyan",
    items: ["Python", "Java", "C++", "JavaScript", "SQL", "Bash/Shell"],
  },
  {
    label: "Cloud & Infrastructure",
    color: "fuchsia",
    items: ["AWS EC2", "AWS S3", "AWS CloudWatch", "AWS SNS", "IAM", "Linux"],
  },
  {
    label: "Observability & SRE",
    color: "violet",
    items: ["Splunk", "Grafana", "ELK Stack", "PagerDuty", "Autosys", "Jenkins"],
  },
  {
    label: "Frameworks & Databases",
    color: "cyan",
    items: ["React", "Django", "Spring Boot", "Angular", "PostgreSQL", "Oracle SQL"],
  },
  {
    label: "ML & Data",
    color: "fuchsia",
    items: ["Scikit-learn", "Pandas", "NLP", "LDA", "KeyBERT", "Random Forest"],
  },
  {
    label: "Tooling",
    color: "violet",
    items: ["Docker", "Git", "JIRA", "ServiceNow", "Tableau", "QlikView"],
  },
];

const orbitCards = ["SRE", "DevOps", "Backend", "Infrastructure", "Automation", "Observability", "Software" , "Systems" ];

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
              SRE · Backend · Infrastructure · DevOps
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
                  const u = new SpeechSynthesisUtterance("Sahn chee ta  Tha yah guh run");
                  u.rate = 0.85;
                  u.pitch = 1.05;
                  window.speechSynthesis.cancel();
                  window.speechSynthesis.speak(u);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/50 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300 cursor-pointer"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                <span className="text-white/30 italic mr-0.5">say:</span> Sahn-chee-ta · Tha-yah-guh-run
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
                ["2+", "Years in production SRE & backend engineering"],
                ["MSCS", "Graduate CS — UMass Amherst, May 2026"],
                ["3", "Industries: Finance · Healthcare · Research"],
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
            {/* Center card */}
            <div className="absolute z-10 rounded-[2rem] border border-white/15 bg-black/60 px-8 py-8 text-center shadow-2xl shadow-fuchsia-500/20 backdrop-blur-2xl">
              <div className="text-xs uppercase tracking-[0.35em] text-white/50">Currently</div>
              <div className="mt-2 text-xl font-bold leading-snug">MSCS @ UMass<br/>Amherst</div>
              <div className="mt-2 text-sm text-white/50">Expected May 2026</div>
              <div className="mt-3 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">Open to Roles</div>
            </div>
            {/* Orbit cards — radius 210px, offset angle so cards sit cleanly between top/bottom */}
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
                In production financial environments, I was the person who rewrote the alerts, automated the toil, and made sure the team had runbooks that actually worked at 3am. I bring that same ownership mentality to everything I build — from production pipelines to research projects to full-stack applications.
              </p>
              <p className="mt-3 leading-7 text-white/60">
                Currently deepening my systems and ML foundations at UMass Amherst while actively targeting SRE, backend, infrastructure, and DevOps engineering roles.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                ["Production-First Thinking", "I've been paged on P1 incidents in global financial systems. I know what it means when systems go down — and exactly how to bring them back up."],
                ["Automation Over Toil", "I've eliminated dozens of manual operational checks through scripted automation. My default is: if a human has to do it twice, it should be a script."],
                ["Full-Stack Depth", "From Oracle SQL root cause analysis to React frontends to ML pipelines — I operate across the stack without losing engineering rigor."],
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
                  note: "Top-10 CS program · Expected May 2026",
                  period: "Sep 2024 – May 2026",
                  courses: ["Computer Networks", "Information Retrieval", "Systems Defense", "Software Engineering", "Optimization", "Data Visualization"],
                  color: "cyan",
                },
                {
                  degree: "B.E. Computer Science",
                  school: "Sri Krishna College of Engineering & Technology",
                  note: "Anna University · First Class",
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

        {/* ── Contact ── */}
        <FadeUp>
          <section
            id="contact"
            className="mt-12 mb-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-fuchsia-500/10 via-white/5 to-cyan-500/10 p-8 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-white/50">Contact</div>
                <h2 className="mt-2 text-3xl font-bold">If you need systems that don't fall over — let's talk.</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
                  Actively seeking SRE, backend, infrastructure, and DevOps engineering roles. Available for full-time positions starting May 2026 — or sooner for co-ops and internships. Based in Amherst, MA. Open to relocation.
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