export default function App() {
  const projects = [
    {
      title: "Apollo Healthcare System",
      description:
        "Full-stack healthcare platform with appointment scheduling and AWS SNS notifications.",
      stack: ["React", "Django", "PostgreSQL", "AWS"],
    },
    {
      title: "Credit Card Fraud Detection",
      description:
        "Machine learning pipeline to detect fraudulent transactions using large-scale datasets.",
      stack: ["Python", "Scikit-learn", "Pandas", "ML"],
    },
    {
      title: "Industry 4.0 Healthcare Research",
      description:
        "Topic modeling analysis of healthcare research using NLP techniques.",
      stack: ["Python", "NLP", "Topic Modeling"],
    },
    {
      title: "CPU Pipeline Simulator",
      description:
        "Simulated a 5-stage pipelined processor to analyze instruction hazards and performance.",
      stack: ["C++", "Computer Architecture"],
    },
  ];

  const skills = [
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "React",
    "Angular",
    "Django",
    "AWS",
    "Linux",
    "Grafana",
    "Splunk",
    "ELK",
    "Git",
    "Jenkins",
  ];

  return (
    <div style={styles.page}>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <div style={styles.container}>
        {/* NAVBAR */}
        <nav style={styles.nav}>
          <div style={styles.logo}>SANCHITA.OS</div>
          <div style={styles.navLinks}>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
          </div>
        </nav>

        {/* HERO */}
        <section style={styles.hero}>
          <h1 style={styles.title}>
            Sanchita Thayagaran
          </h1>

          <h2 style={styles.subtitle}>
            Software Engineer • Site Reliability Engineer • DevOps
          </h2>

          <p style={styles.description}>
            MS Computer Science student at UMass Amherst with 2+ years of
            industry experience building reliable systems, scalable software,
            and infrastructure automation.
          </p>

          <div style={styles.buttons}>
            <a href="#projects" style={styles.primaryButton}>
              View Projects
            </a>
            <a
              href="https://github.com/Sanchita-Thayagaran"
              target="_blank"
              style={styles.secondaryButton}
            >
              GitHub
            </a>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" style={styles.section}>
          <h2 style={styles.sectionTitle}>Projects</h2>

          <div style={styles.grid}>
            {projects.map((project) => (
              <div style={styles.card} key={project.title}>
                <h3>{project.title}</h3>
                <p style={styles.cardText}>{project.description}</p>

                <div style={styles.stack}>
                  {project.stack.map((tech) => (
                    <span style={styles.tag} key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills</h2>

          <div style={styles.skills}>
            {skills.map((skill) => (
              <span key={skill} style={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style={styles.footer}>
          © {new Date().getFullYear()} Sanchita Thayagaran
        </footer>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "black",
    color: "white",
    minHeight: "100vh",
    fontFamily: "system-ui",
    position: "relative",
    overflow: "hidden",
  },

  glow1: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "cyan",
    filter: "blur(200px)",
    opacity: 0.3,
    top: "-100px",
    left: "-100px",
  },

  glow2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "magenta",
    filter: "blur(200px)",
    opacity: 0.3,
    bottom: "-100px",
    right: "-100px",
  },

  container: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "40px",
    position: "relative",
    zIndex: 2,
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "60px",
  },

  logo: {
    fontWeight: "bold",
    letterSpacing: "3px",
  },

  navLinks: {
    display: "flex",
    gap: "20px",
  },

  hero: {
    marginBottom: "80px",
  },

  title: {
    fontSize: "60px",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "20px",
    color: "#aaa",
  },

  description: {
    marginTop: "20px",
    maxWidth: "600px",
    lineHeight: "1.6",
  },

  buttons: {
    marginTop: "30px",
    display: "flex",
    gap: "15px",
  },

  primaryButton: {
    padding: "12px 20px",
    background: "white",
    color: "black",
    textDecoration: "none",
    borderRadius: "10px",
  },

  secondaryButton: {
    padding: "12px 20px",
    border: "1px solid white",
    borderRadius: "10px",
    color: "white",
    textDecoration: "none",
  },

  section: {
    marginTop: "80px",
  },

  sectionTitle: {
    fontSize: "32px",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
    gap: "20px",
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "15px",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  cardText: {
    marginTop: "10px",
    color: "#ccc",
  },

  stack: {
    marginTop: "15px",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  tag: {
    background: "rgba(255,255,255,0.1)",
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "12px",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  skillTag: {
    border: "1px solid white",
    padding: "8px 14px",
    borderRadius: "20px",
  },

  footer: {
    marginTop: "80px",
    opacity: 0.6,
  },
};