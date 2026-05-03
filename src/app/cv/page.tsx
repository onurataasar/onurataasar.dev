import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV - Onur Ata Asar",
  description:
    "Frontend Web Developer - Computer Science Engineer. Experience, education, and background.",
};

const experiences = [
  {
    role: "Frontend Developer",
    company: "Ledbim",
    period: "12/2022 – Present",
    location: "Antalya, Türkiye",
    bullets: [
      "Designed and implemented scalable, reusable React component libraries leveraged across multiple internal tools and customer-facing applications.",
      "Built, optimized, and maintained SSR pages using Next.js, significantly improving SEO, accessibility, and initial page load performance.",
      "Integrated and managed complex RESTful API responses, handling data normalization, error states, and frontend state management.",
      "Worked closely with backend engineers and designers throughout Agile sprints to deliver features efficiently and with high quality.",
      "Applied frontend performance optimization techniques including code splitting, memoization strategies, and optimized image loading.",
      "Led and contributed to frontend code reviews, mentoring team members and helping establish best practices and consistent coding standards.",
      "Implemented and maintained automated testing strategies using Playwright and Jest to ensure application reliability and prevent regressions.",
      "Collaborated on DevOps workflows by contributing to CI/CD pipelines in Azure DevOps, supporting build, test, and deployment processes.",
    ],
  },
  {
    role: "Intern",
    company: "Ledbim",
    period: "08/2022 – 11/2022",
    location: "Antalya, Türkiye",
    bullets: [
      'Designed and implemented a production ready web application "Beagle" for tracking service cars in hotels.',
      "Integrated REST APIs using Axios and managed global state with Redux.",
      "Gained hands-on experience with component architecture, routing, and reusable hooks.",
      "Worked with UI libraries such as Ant Design and Material UI.",
    ],
  },
];

const education = {
  institution: "Akdeniz Üniversitesi",
  degree: "Computer Science Engineering (English)",
  period: "09/2016 – 06/2022",
  location: "Antalya, Turkey",
};

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Redux",
  "Tailwind CSS",
  "REST API",
  "GraphQL",
  "Playwright",
  "Jest",
  "Azure DevOps",
  "Git",
  "Figma",
];

const languages = [
  { name: "Turkish", level: "Native" },
  { name: "English", level: "B2 – Upper Intermediate" },
  { name: "German", level: "A1 – Beginner" },
];

export default function CVPage() {
  return (
    <div
      style={{
        background: "#f4f3ee",
        minHeight: "100vh",
        padding: "64px 32px",
      }}
    >
      <style>{`
        .cv-dl-btn:hover { background: #ff5b1f !important; border-color: #ff5b1f !important; }
      `}</style>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          borderBottom: "1px solid #0a0a0a",
          paddingBottom: 16,
          marginBottom: 48,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "#ff5b1f",
          }}
        >
          03 / CV
        </span>
        <h1
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            margin: 0,
            color: "#0a0a0a",
          }}
        >
          ÖZGEÇMİŞ .
        </h1>
      </div>

      {/* Download button */}
      <div style={{ marginBottom: 64 }}>
        <a
          href="/Onur-Ata-Asar-CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.08em",
            color: "#f4f3ee",
            background: "#0a0a0a",
            border: "1px solid #0a0a0a",
            padding: "10px 20px",
            textDecoration: "none",
            transition: "background 0.15s, color 0.15s",
          }}
          className="cv-dl-btn"
        >
          CV İNDİR ↓
        </a>
      </div>

      {/* Experience section */}
      <section style={{ marginBottom: 64 }}>
        <div
          style={{
            borderTop: "1px solid #0a0a0a",
            paddingTop: 24,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "#ff5b1f",
            }}
          >
            DENEYIM
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {experiences.map((exp) => (
            <div
              key={exp.period}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr 180px",
                gap: "0 32px",
                padding: "32px 0",
                borderBottom: "1px solid rgba(10,10,10,0.15)",
              }}
            >
              {/* Period */}
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: 12,
                    color: "rgba(10,10,10,0.5)",
                    letterSpacing: "0.04em",
                    display: "block",
                    paddingTop: 4,
                  }}
                >
                  {exp.period}
                </span>
              </div>

              {/* Role + bullets */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#0a0a0a",
                    margin: "0 0 16px 0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {exp.role}
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {exp.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        fontFamily: "var(--font-inter), sans-serif",
                        fontSize: 14,
                        color: "rgba(10,10,10,0.65)",
                        lineHeight: 1.6,
                      }}
                    >
                      <span style={{ color: "#ff5b1f", flexShrink: 0 }}>—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company + location */}
              <div style={{ textAlign: "right" }}>
                <span
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#0a0a0a",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  {exp.company}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: 11,
                    color: "rgba(10,10,10,0.45)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {exp.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education section */}
      <section style={{ marginBottom: 64 }}>
        <div
          style={{
            borderTop: "1px solid #0a0a0a",
            paddingTop: 24,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "#ff5b1f",
            }}
          >
            EĞİTİM
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr",
            gap: "0 32px",
            padding: "32px 0",
            borderBottom: "1px solid rgba(10,10,10,0.15)",
          }}
        >
          {/* Period */}
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 12,
              color: "rgba(10,10,10,0.5)",
              letterSpacing: "0.04em",
              paddingTop: 4,
            }}
          >
            {education.period}
          </span>

          {/* Institution + degree + location */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#0a0a0a",
                margin: "0 0 4px 0",
                letterSpacing: "-0.01em",
              }}
            >
              {education.institution}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 14,
                color: "rgba(10,10,10,0.65)",
                margin: "0 0 4px 0",
              }}
            >
              {education.degree}
            </p>
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11,
                color: "rgba(10,10,10,0.45)",
                letterSpacing: "0.04em",
              }}
            >
              {education.location}
            </span>
          </div>
        </div>
      </section>

      {/* Skills section */}
      <section style={{ marginBottom: 64 }}>
        <div
          style={{
            borderTop: "1px solid #0a0a0a",
            paddingTop: 24,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "#ff5b1f",
            }}
          >
            TEKNİK BECERİLER
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((skill) => (
            <span
              key={skill}
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 12,
                letterSpacing: "0.04em",
                color: "#0a0a0a",
                border: "1px solid #0a0a0a",
                padding: "6px 14px",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Languages section */}
      <section>
        <div
          style={{
            borderTop: "1px solid #0a0a0a",
            paddingTop: 24,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "#ff5b1f",
            }}
          >
            DİLLER
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 0, border: "1px solid #0a0a0a" }}>
          {languages.map((lang, index) => (
            <div
              key={lang.name}
              style={{
                padding: "20px 32px",
                borderRight: index < languages.length - 1 ? "1px solid #0a0a0a" : "none",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#0a0a0a",
                  margin: "0 0 4px 0",
                  letterSpacing: "-0.01em",
                }}
              >
                {lang.name}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 11,
                  color: "rgba(10,10,10,0.5)",
                  margin: 0,
                  letterSpacing: "0.04em",
                }}
              >
                {lang.level}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
